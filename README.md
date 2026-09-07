# Patient Journey Agent

An AI-powered patient intake and appointment management system built using **React, Vite, and n8n**.

## Features

- Patient intake form for collecting:
  - Name
  - Phone number
  - Email
  - Patient concern/message
- AI-based patient triage
- Patient history lookup
- Clinic knowledge base lookup
- Urgency assessment
- Emergency detection
- Automatic specialty selection
- Doctor routing
- Appointment slot generation
- Patient email communication
- Doctor brief generation
- Emergency alert to the clinic
- Patient record logging

## Project Structure

```text
patient-journey-agent/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── workflow/
│   └── patient_journey_agent.json
│
└── README.md
```

## How It Works

```text
Patient
   ↓
React Frontend
   ↓
n8n Webhook
   ↓
Patient Journey Agent
   ↓
Patient History + Clinic KB
   ↓
AI Triage
   ↓
Slot & Doctor Routing
   ↓
Emergency Check
   ↓
Patient / Doctor Communication
   ↓
Patient Record Log
```

## Running the Frontend

Go into the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Add your n8n webhook URL to `.env`:

```env
VITE_N8N_WEBHOOK_URL=YOUR_N8N_WEBHOOK_URL
```

For local n8n:

```env
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/patient-intake
```

Start the frontend:

```bash
npm run dev
```

Open the URL provided by Vite, usually:

```text
http://localhost:5173
```

## n8n Workflow

The n8n workflow is located in:

```text
workflow/patient_journey_agent.json
```

To import the workflow:

1. Open n8n.
2. Go to **Workflows**.
3. Select **Import from File**.
4. Select `Patient Journey Agent V2.json`.
5. Import the workflow.
6. Check the required credentials and configuration.

For local n8n:

```text
http://localhost:5678
```

## Emergency Handling

If the AI identifies an emergency, the workflow follows a separate emergency path:

```text
AI Triage
   ↓
Emergency Check
   ↓
Emergency Detected
   ↓
Clinic Emergency Alert
   ↓
Log Patient Record
```

For non-emergency cases, the workflow continues with appointment routing, patient communication, and doctor briefing.

## Tech Stack

- **Frontend:** React, Vite, JavaScript, CSS
- **Automation:** n8n
- **AI:** ChatGPT / OpenAI
- **Database / Storage:** Google Sheets
- **Communication:** Gmail