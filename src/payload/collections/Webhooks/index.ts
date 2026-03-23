import type { CollectionConfig } from "payload";
import { admin } from "@/payload/access";

export const Webhooks: CollectionConfig = {
  slug: "webhooks",
  admin: {
    useAsTitle: "name",
    group: "System",
    description: "Configure webhook endpoints for external integrations"
  },
  access: {
    read: admin,
    create: admin,
    update: admin,
    delete: admin
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description:
          "Name for this webhook (e.g., 'Zoho CRM Sync', 'Slack Notifications')"
      }
    },
    {
      name: "url",
      type: "text",
      required: true,
      admin: {
        description: "Webhook endpoint URL"
      }
    },
    {
      name: "events",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        { label: "Form Response Created", value: "form-response.created" },
      ],
      admin: {
        description: "Events that will trigger this webhook"
      }
    },
    {
      name: "headers",
      type: "array",
      admin: {
        description: "Custom HTTP headers to include with webhook requests"
      },
      fields: [
        {
          name: "key",
          type: "text",
          required: true
        },
        {
          name: "value",
          type: "text",
          required: true
        }
      ]
    },
    {
      name: "secret",
      type: "text",
      admin: {
        description:
          "Secret key for HMAC-SHA256 signature verification (sent as X-Webhook-Signature header)"
      }
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Enable or disable this webhook"
      }
    },
    {
      name: "retryCount",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 10,
      admin: {
        description: "Number of retry attempts on failure"
      }
    },
    {
      type: "row",
      fields: [
        {
          name: "lastTriggered",
          type: "date",
          admin: {
            readOnly: true,
            description: "Last time this webhook was triggered"
          }
        },
        {
          name: "lastStatus",
          type: "number",
          admin: {
            readOnly: true,
            description: "HTTP status code of last delivery"
          }
        },
        {
          name: "lastError",
          type: "text",
          admin: {
            readOnly: true,
            description: "Error message from last failed delivery"
          }
        }
      ]
    }
  ]
};

export default Webhooks;
