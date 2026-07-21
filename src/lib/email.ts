export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactSendResult =
  | { ok: true; mode: 'live' }
  | { ok: true; mode: 'placeholder' }
  | { ok: false; error: string }

function getEmailJsConfig() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? ''
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? ''
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? ''

  const configured = Boolean(serviceId && templateId && publicKey)
  return { serviceId, templateId, publicKey, configured }
}

export function isEmailJsConfigured(): boolean {
  return getEmailJsConfig().configured
}

/**
 * Sends contact form data through EmailJS when env keys are present.
 * EmailJS is dynamically imported to keep it out of the initial bundle.
 */
export async function sendContactMessage(
  payload: ContactPayload,
): Promise<ContactSendResult> {
  const { serviceId, templateId, publicKey, configured } = getEmailJsConfig()

  if (!configured) {
    await new Promise((resolve) => window.setTimeout(resolve, 700))
    return { ok: true, mode: 'placeholder' }
  }

  try {
    const emailjs = (await import('@emailjs/browser')).default
    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: payload.name,
        from_email: payload.email,
        subject: payload.subject,
        message: payload.message,
      },
      { publicKey },
    )
    return { ok: true, mode: 'live' }
  } catch {
    return {
      ok: false,
      error: 'Email service failed to send the message.',
    }
  }
}
