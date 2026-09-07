import { useState } from 'react'

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL

function App() {
  const [form, setForm] = useState({
    patient_name: '',
    patient_phone: '',
    patient_email: '',
    message_text: ''
  })
  const [status, setStatus] = useState('idle')
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResponse(null)

    if (!WEBHOOK_URL || WEBHOOK_URL.includes('PASTE_YOUR')) {
      setError('Add your n8n webhook URL to the .env file first.')
      return
    }

    if (Object.values(form).some((value) => !value.trim())) {
      setError('Please fill in all fields.')
      return
    }

    setStatus('sending')

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          channel: 'whatsapp'
        })
      })

      const text = await res.text()
      let data

      try {
        data = text ? JSON.parse(text) : null
      } catch {
        data = text
      }

      if (!res.ok) {
        throw new Error(
          typeof data === 'object' && data?.message
            ? data.message
            : `Request failed (${res.status})`
        )
      }

      setResponse(data)
      setStatus('success')
    } catch (err) {
      setError(err.message || 'Unable to connect to the clinic.')
      setStatus('error')
    }
  }

  const reset = () => {
    setForm({
      patient_name: '',
      patient_phone: '',
      patient_email: '',
      message_text: ''
    })
    setResponse(null)
    setError('')
    setStatus('idle')
  }

  const getResponseText = () => {
    if (!response) return 'Your request was processed successfully.'
    if (typeof response === 'string') return response
    return (
      response.patient_reply ||
      response.message ||
      response.reply ||
      response.output ||
      'Your request was processed successfully.'
    )
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <div className="logo">S</div>
          <div>
            <h1>Sunrise Clinic</h1>
            <span>Patient Care Portal</span>
          </div>
        </div>
        <div className="secure">
          <span className="dot" />
          Secure connection
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="eyebrow">PATIENT SUPPORT</div>
          <h2>How can we help you today?</h2>
          <p>
            Share your details and message with our clinic. Our patient
            journey assistant will help route your request.
          </p>
        </section>

        <section className="card">
          {status === 'success' ? (
            <div className="success">
              <div className="successIcon">✓</div>
              <div className="eyebrow">MESSAGE RECEIVED</div>
              <h3>Thank you, {form.patient_name}.</h3>
              <p>
                Your request has been sent to Sunrise Clinic. Please check
                your email for the next steps.
              </p>

              <div className="responseBox">
                <div className="responseTitle">Clinic response</div>
                <div>{getResponseText()}</div>
              </div>

              <button className="secondaryButton" onClick={reset}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="formHeader">
                <div>
                  <h3>Patient details</h3>
                  <p>Tell us who you are and what you need help with.</p>
                </div>
                <span className="required">All fields required</span>
              </div>

              <div className="grid">
                <label>
                  <span>Full name</span>
                  <input
                    name="patient_name"
                    value={form.patient_name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                </label>

                <label>
                  <span>Phone number</span>
                  <input
                    name="patient_phone"
                    value={form.patient_phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                  />
                </label>

                <label className="full">
                  <span>Email address</span>
                  <input
                    type="email"
                    name="patient_email"
                    value={form.patient_email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </label>

                <label className="full">
                  <span>How can we help?</span>
                  <textarea
                    name="message_text"
                    value={form.message_text}
                    onChange={handleChange}
                    placeholder="Describe your concern or tell us what you need help with..."
                    rows="6"
                  />
                </label>
              </div>

              {error && (
                <div className="errorBox">
                  <strong>Unable to send</strong>
                  <span>{error}</span>
                </div>
              )}

              <div className="formFooter">
                <div className="privacy">
                  🔒 Your information is sent securely to the clinic.
                </div>
                <button
                  className="submitButton"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send to clinic'}
                  {status !== 'sending' && <span>→</span>}
                </button>
              </div>
            </form>
          )}
        </section>

        <section className="steps">
          <div>
            <b>01</b>
            <h4>Share your concern</h4>
            <p>Give us enough detail so your request can be routed correctly.</p>
          </div>
          <div>
            <b>02</b>
            <h4>Clinic reviews it</h4>
            <p>Your message is processed by the Patient Journey Agent.</p>
          </div>
          <div>
            <b>03</b>
            <h4>Receive next steps</h4>
            <p>Appointment and support information will be sent to your email.</p>
          </div>
        </section>

        <footer>
          <strong>Sunrise Multi Speciality Clinic</strong>
          <span>Plot 12, Sector 18, Noida, Uttar Pradesh</span>
          <span>+91 120 4567890</span>
        </footer>
      </main>
    </div>
  )
}

export default App
