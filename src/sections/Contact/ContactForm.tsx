import { useState, type FormEvent } from 'react'

import { BodyText } from '@/components/typography/BodyText'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import { contactContent } from '@/data/contact'
import { sendContactMessage } from '@/lib/email'
import { cn } from '@/lib/cn'

type FormValues = {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

type Status = 'idle' | 'loading' | 'success' | 'error'

const initialValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Name is required.'
  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.subject.trim()) errors.subject = 'Subject is required.'
  if (!values.message.trim()) {
    errors.message = 'Message is required.'
  } else if (values.message.trim().length < 12) {
    errors.message = 'Message should be at least 12 characters.'
  }
  return errors
}

/** Validated contact form with EmailJS-ready submission states. */
export function ContactForm({ className }: { className?: string }) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState<string | null>(null)

  const disabled = status === 'loading'

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setFeedback(contactContent.form.errorValidation)
      const order: Array<keyof FormValues> = [
        'name',
        'email',
        'subject',
        'message',
      ]
      const firstInvalid = order.find((key) => nextErrors[key])
      if (firstInvalid) {
        document.getElementById(`contact-${firstInvalid}`)?.focus()
      }
      return
    }

    setStatus('loading')
    setFeedback(null)

    const result = await sendContactMessage({
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    })

    if (!result.ok) {
      setStatus('error')
      setFeedback(result.error || contactContent.form.errorGeneric)
      return
    }

    setStatus('success')
    setFeedback(
      result.mode === 'live'
        ? contactContent.form.successConfigured
        : contactContent.form.successPlaceholder,
    )
    setValues(initialValues)
    setErrors({})
  }

  return (
    <form
      className={cn('space-y-5', className)}
      onSubmit={(event) => {
        void onSubmit(event)
      }}
      noValidate
      aria-busy={status === 'loading'}
    >
      <div>
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          value={values.name}
          disabled={disabled}
          invalid={Boolean(errors.name)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        {errors.name ? (
          <p id="contact-name-error" className="mt-2 text-xs text-accent" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          disabled={disabled}
          invalid={Boolean(errors.email)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        {errors.email ? (
          <p id="contact-email-error" className="mt-2 text-xs text-accent" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="contact-subject">Subject</Label>
        <Input
          id="contact-subject"
          name="subject"
          value={values.subject}
          disabled={disabled}
          invalid={Boolean(errors.subject)}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, subject: event.target.value }))
          }
        />
        {errors.subject ? (
          <p
            id="contact-subject-error"
            className="mt-2 text-xs text-accent"
            role="alert"
          >
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          value={values.message}
          disabled={disabled}
          invalid={Boolean(errors.message)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, message: event.target.value }))
          }
        />
        {errors.message ? (
          <p
            id="contact-message-error"
            className="mt-2 text-xs text-accent"
            role="alert"
          >
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" variant="primary" size="lg" disabled={disabled}>
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </Button>

      {feedback ? (
        <BodyText
          size="sm"
          tone="default"
          className={cn(
            'rounded-[var(--radius-md)] border px-4 py-3',
            status === 'success'
              ? 'border-success/40 bg-success/10 text-success'
              : 'border-accent/40 bg-accent/10 text-accent',
          )}
          role="status"
          aria-live="polite"
        >
          {feedback}
        </BodyText>
      ) : null}
    </form>
  )
}
