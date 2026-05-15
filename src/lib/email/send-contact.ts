import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const TO_ADDRESS = "azarnuzy@gmail.com";
const FROM_ADDRESS = "Azar Portfolio <onboarding@resend.dev>";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.email("Please provide a valid email").max(200),
  message: z.string().trim().min(10, "Message is too short").max(500),
});

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildNotificationHtml(name: string, email: string, message: string) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  return `
    <div style="font-family:Inter,system-ui,sans-serif;color:#111;line-height:1.6">
      <h2 style="margin:0 0 12px">New message from your portfolio</h2>
      <p style="margin:0 0 4px"><strong>Name:</strong> ${safeName}</p>
      <p style="margin:0 0 4px"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
      <p style="white-space:pre-wrap">${safeMessage}</p>
    </div>
  `;
}

function buildAutoReplyHtml(name: string) {
  const safeName = escapeHtml(name);
  return `
    <div style="font-family:Inter,system-ui,sans-serif;color:#111;line-height:1.6">
      <p>Hi ${safeName},</p>
      <p>Thanks for reaching out! I've received your message and will get back to you within 24 hours.</p>
      <p>In the meantime, feel free to check out my latest work at <a href="https://github.com/azarnuzy">github.com/azarnuzy</a>.</p>
      <p>— Azar</p>
    </div>
  `;
}

export const $sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: z.infer<typeof contactSchema>) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("Email service is not configured. Please try again later.");
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const notification = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: data.email,
      subject: `Portfolio contact — ${data.name}`,
      html: buildNotificationHtml(data.name, data.email, data.message),
    });

    if (notification.error) {
      throw new Error(notification.error.message || "Failed to send message");
    }

    // Auto-reply is best-effort. The Resend sandbox sender can only deliver to
    // verified addresses, so failure here shouldn't block the main flow.
    try {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: data.email,
        subject: "Thanks for reaching out — Azar",
        html: buildAutoReplyHtml(data.name),
      });
    } catch {
      // swallow — notification already delivered
    }

    return { ok: true };
  });
