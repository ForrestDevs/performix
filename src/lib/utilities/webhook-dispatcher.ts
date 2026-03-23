import { WEBHOOKS_SLUG } from "@/payload/collections/constants";
import crypto from "node:crypto";
import type { Payload } from "payload";

interface WebhookPayload {
  event: string;
  timestamp: string;
  data: Record<string, unknown>;
}

/**
 * Dispatch webhooks for a given event.
 * Non-blocking -- fires and logs errors, does not throw.
 */
export async function dispatchWebhooks(
  payload: Payload,
  event: string,
  data: Record<string, unknown>
): Promise<void> {
  try {
    const webhooks = await payload.find({
      collection: WEBHOOKS_SLUG,
      where: {
        isActive: { equals: true },
        events: { contains: event }
      },
      limit: 50
    });

    if (!webhooks.docs.length) return;

    const webhookPayload: WebhookPayload = {
      event,
      timestamp: new Date().toISOString(),
      data
    };

    const body = JSON.stringify(webhookPayload);

    const deliveries = webhooks.docs.map(async (webhook) => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "X-Webhook-Event": event
      };

      // Add custom headers
      if (webhook.headers && Array.isArray(webhook.headers)) {
        for (const header of webhook.headers) {
          if (header.key && header.value) {
            headers[header.key] = header.value;
          }
        }
      }

      // Add HMAC signature if secret is configured
      if (webhook.secret) {
        const signature = crypto
          .createHmac("sha256", webhook.secret)
          .update(body)
          .digest("hex");
        headers["X-Webhook-Signature"] = `sha256=${signature}`;
      }

      let lastStatus = 0;
      let lastError: string | null = null;
      const maxRetries = webhook.retryCount || 3;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const response = await fetch(webhook.url, {
            method: "POST",
            headers,
            body,
            signal: AbortSignal.timeout(10000) // 10s timeout
          });

          lastStatus = response.status;

          if (response.ok) {
            lastError = null;
            break;
          }

          lastError = `HTTP ${response.status}: ${response.statusText}`;
        } catch (err) {
          lastError = err instanceof Error ? err.message : "Unknown error";
          lastStatus = 0;
        }

        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
        }
      }

      // Update webhook with delivery status
      try {
        await payload.update({
          collection: "webhooks" as any,
          id: webhook.id,
          data: {
            lastTriggered: new Date().toISOString(),
            lastStatus,
            lastError: lastError || ""
          }
        });
      } catch (updateErr) {
        payload.logger.error(
          `Failed to update webhook status for ${webhook.name}: ${updateErr}`
        );
      }

      if (lastError) {
        payload.logger.error(
          `Webhook delivery failed for ${webhook.name} (${event}): ${lastError}`
        );
      } else {
        payload.logger.info(
          `Webhook delivered to ${webhook.name} (${event}): ${lastStatus}`
        );
      }
    });

    // Fire all webhook deliveries in parallel, don't await in the main flow
    Promise.allSettled(deliveries).catch((err) => {
      payload.logger.error(`Webhook dispatch error: ${err}`);
    });
  } catch (err) {
    payload.logger.error(`Failed to dispatch webhooks for ${event}: ${err}`);
  }
}
