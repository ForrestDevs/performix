import React from 'react'

interface VerificationEmailProps {
  name: string
  verificationUrl: string
}

export function VerificationEmailTemplate({ name, verificationUrl }: VerificationEmailProps) {
  const firstName = name.split(' ')[0] || 'Player'

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
          padding: '40px 32px',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <h1
            style={{
              color: '#ffffff',
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0',
              fontFamily: 'Space Grotesk, Arial, sans-serif',
            }}
          >
            Performix
          </h1>
        </div>
        <h2
          style={{
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: 'bold',
            margin: '0',
          }}
        >
          Welcome to Performix, {firstName}! 🏒
        </h2>
        <p
          style={{
            color: '#e0f2fe',
            fontSize: '16px',
            margin: '12px 0 0',
            lineHeight: '1.5',
          }}
        >
          You&apos;re one step away from accessing elite hockey mentorship
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#0891B2',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <span
              style={{
                color: '#ffffff',
                fontSize: '40px',
              }}
            >
              ✓
            </span>
          </div>

          <h3
            style={{
              color: '#1f2937',
              fontSize: '22px',
              fontWeight: 'bold',
              margin: '0 0 16px',
              lineHeight: '1.3',
            }}
          >
            Verify Your Email Address
          </h3>

          <p
            style={{
              color: '#6b7280',
              fontSize: '16px',
              lineHeight: '1.6',
              margin: '0 0 32px',
            }}
          >
            Click the button below to verify your email address and complete your Performix account
            setup. This link will expire in 24 hours.
          </p>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <a
            href={verificationUrl}
            style={{
              display: 'inline-block',
              backgroundColor: '#0891B2',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 'bold',
              padding: '16px 32px',
              textDecoration: 'none',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Verify My Email Address
          </a>
        </div>

        {/* Alternative Link */}
        <div
          style={{
            backgroundColor: '#f9fafb',
            padding: '24px',
            borderRadius: '8px',
            marginBottom: '32px',
          }}
        >
          <p
            style={{
              color: '#6b7280',
              fontSize: '14px',
              margin: '0 0 12px',
              lineHeight: '1.5',
            }}
          >
            If the button doesn&apos;t work, copy and paste this link into your browser:
          </p>
          <p
            style={{
              color: '#0891B2',
              fontSize: '14px',
              margin: '0',
              wordBreak: 'break-all',
              lineHeight: '1.5',
            }}
          >
            {verificationUrl}
          </p>
        </div>

        {/* What's Next */}
        <div
          style={{
            borderLeft: '4px solid #0891B2',
            paddingLeft: '20px',
            marginBottom: '32px',
          }}
        >
          <h4
            style={{
              color: '#1f2937',
              fontSize: '18px',
              fontWeight: 'bold',
              margin: '0 0 16px',
            }}
          >
            What happens next?
          </h4>
          <ul
            style={{
              color: '#6b7280',
              fontSize: '14px',
              lineHeight: '1.6',
              margin: '0',
              paddingLeft: '20px',
            }}
          >
            <li style={{ marginBottom: '8px' }}>Access your personalized dashboard</li>
            <li style={{ marginBottom: '8px' }}>Complete your hockey profile</li>
            <li style={{ marginBottom: '8px' }}>Browse and connect with elite mentors</li>
            <li>Start your journey to D1 hockey</li>
          </ul>
        </div>

        {/* Security Notice */}
        <div
          style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <p
            style={{
              color: '#92400e',
              fontSize: '14px',
              margin: '0',
              lineHeight: '1.5',
            }}
          >
            <strong>Security Notice:</strong> If you didn&apos;t create a Performix account, please
            ignore this email or contact our support team.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: '#f9fafb',
          padding: '32px',
          textAlign: 'center',
          borderTop: '1px solid #e5e7eb',
        }}
      >
        <p
          style={{
            color: '#6b7280',
            fontSize: '14px',
            margin: '0 0 12px',
            lineHeight: '1.5',
          }}
        >
          © 2024 Performix. All rights reserved.
        </p>
        <p
          style={{
            color: '#9ca3af',
            fontSize: '12px',
            margin: '0',
            lineHeight: '1.5',
          }}
        >
          Elite Hockey Mentorship Platform
        </p>
        <div style={{ marginTop: '16px' }}>
          <a
            href="mailto:support@performix.com"
            style={{
              color: '#0891B2',
              fontSize: '12px',
              textDecoration: 'none',
            }}
          >
            support@performix.com
          </a>
        </div>
      </div>
    </div>
  )
}

// Function to render the template to HTML string
export function renderVerificationEmail({ name, verificationUrl }: VerificationEmailProps): string {
  // Simple React-to-HTML conversion for server-side rendering
  // In a production app, you'd use a proper React renderer like ReactDOMServer

  const firstName = name.split(' ')[0] || 'Player'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Performix Account</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6;">
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0891B2 0%, #0E7490 100%); padding: 40px 32px; text-align: center;">
            <div style="margin-bottom: 24px;">
                <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0; font-family: 'Space Grotesk', Arial, sans-serif;">
                    Performix
                </h1>
            </div>
            <h2 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0;">
                Welcome to Performix, ${firstName}! 🏒
            </h2>
            <p style="color: #e0f2fe; font-size: 16px; margin: 12px 0 0; line-height: 1.5;">
                You're one step away from accessing elite hockey mentorship
            </p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 32px;">
            <div style="text-align: center; margin-bottom: 32px;">
                <div style="width: 80px; height: 80px; background-color: #0891B2; border-radius: 50%; display: inline-block; text-align: center; line-height: 80px; margin: 0 auto 24px;">
                    <span style="color: #ffffff; font-size: 40px;">✓</span>
                </div>
                
                <h3 style="color: #1f2937; font-size: 22px; font-weight: bold; margin: 0 0 16px; line-height: 1.3;">
                    Verify Your Email Address
                </h3>
                
                <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 32px;">
                    Click the button below to verify your email address and complete your Performix account setup. 
                    This link will expire in 24 hours.
                </p>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin-bottom: 32px;">
                <a href="${verificationUrl}" style="display: inline-block; background-color: #0891B2; color: #ffffff; font-size: 16px; font-weight: bold; padding: 16px 32px; text-decoration: none; border-radius: 8px; border: none;">
                    Verify My Email Address
                </a>
            </div>

            <!-- Alternative Link -->
            <div style="background-color: #f9fafb; padding: 24px; border-radius: 8px; margin-bottom: 32px;">
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 12px; line-height: 1.5;">
                    If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="color: #0891B2; font-size: 14px; margin: 0; word-break: break-all; line-height: 1.5;">
                    ${verificationUrl}
                </p>
            </div>

            <!-- What's Next -->
            <div style="border-left: 4px solid #0891B2; padding-left: 20px; margin-bottom: 32px;">
                <h4 style="color: #1f2937; font-size: 18px; font-weight: bold; margin: 0 0 16px;">
                    What happens next?
                </h4>
                <ul style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">Access your personalized dashboard</li>
                    <li style="margin-bottom: 8px;">Complete your hockey profile</li>
                    <li style="margin-bottom: 8px;">Browse and connect with elite mentors</li>
                    <li>Start your journey to D1 hockey</li>
                </ul>
            </div>

            <!-- Security Notice -->
            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.5;">
                    <strong>Security Notice:</strong> If you didn't create a Performix account, 
                    please ignore this email or contact our support team.
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 32px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 12px; line-height: 1.5;">
                © 2025 Performix. All rights reserved.
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.5;">
                Elite Hockey Mentorship Platform
            </p>
            <div style="margin-top: 16px;">
                <a href="mailto:support@performix.com" style="color: #0891B2; font-size: 12px; text-decoration: none;">
                    mateo@performix.ca
                </a>
            </div>
        </div>
    </div>
</body>
</html>
  `
}
