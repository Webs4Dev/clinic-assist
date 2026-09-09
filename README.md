# Patient Journey Agent

An AI-powered **patient intake, triage, and appointment management system** built using **React, Vite, and n8n**.

The Patient Journey Agent automates the process of receiving a patient's initial request, understanding their concern, checking available patient and clinic information, assessing urgency, and routing the patient through the appropriate healthcare workflow.

Depending on the AI's assessment, the system can either route the patient toward **doctor and appointment scheduling** or trigger an **emergency response workflow** for urgent cases.

---

## Overview

Traditional patient intake often requires manual collection of information, preliminary assessment, appointment coordination, and communication between patients and clinic staff.

The **Patient Journey Agent** brings these steps together into a single automated workflow.

A patient submits their information through a React-based frontend. The request is sent to an **n8n webhook**, where the Patient Journey Agent processes the information using AI.

The workflow can:

- Retrieve relevant patient history
- Search the clinic knowledge base
- Analyze the patient's concern
- Assess urgency
- Detect potential emergencies
- Determine the appropriate medical specialty
- Route the patient to a suitable doctor
- Generate appointment slots
- Communicate with the patient
- Generate a brief for the doctor
- Alert the clinic in emergency situations
- Log the patient record

---

# System Architecture

```text
                         ┌──────────────────┐
                         │     Patient      │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ React Frontend   │
                         │   Patient Intake │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   n8n Webhook    │
                         └────────┬─────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │ Patient Journey Agent    │
                    │                          │
                    │ • Patient History Lookup │
                    │ • Clinic KB Lookup       │
                    │ • AI Triage              │
                    │ • Urgency Assessment     │
                    │ • Emergency Detection    │
                    │ • Specialty Selection    │
                    └────────────┬─────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
              Emergency?                 Non-Emergency
                    │                         │
                    ▼                         ▼
        ┌─────────────────────┐     ┌──────────────────────┐
        │ Emergency Response  │     │ Doctor & Appointment │
        │                     │     │ Routing              │
        │ • Clinic Alert      │     │ • Specialty Selection│
        │ • Patient Logging   │     │ • Doctor Routing     │
        └──────────┬──────────┘     │ • Slot Generation    │
                   │                └──────────┬───────────┘
                   │                           │
                   │                           ▼
                   │                ┌──────────────────────┐
                   │                │ Patient Communication│
                   │                │ + Doctor Brief       │
                   │                └──────────┬───────────┘
                   │                           │
                   └─────────────┬─────────────┘
                                 │
                                 ▼
                         ┌──────────────────┐
                         │ Patient Record   │
                         │      Log         │
                         └──────────────────┘
```

### Architecture Flow

The system consists of the following major stages:

**1. Patient Intake**

The patient enters their basic information and describes their concern through the React frontend.

**2. Request Processing**

The frontend sends the submitted information to an n8n webhook, which starts the Patient Journey Agent workflow.

**3. Context Retrieval**

The workflow can look up:

- Existing patient history
- Relevant information from the clinic knowledge base

This provides additional context for the AI assessment and routing process.

**4. AI Triage**

The AI analyzes the patient's concern and performs:

- Triage
- Urgency assessment
- Emergency detection
- Specialty selection

**5. Decision Routing**

Based on the AI assessment, the workflow follows one of two paths:

- **Emergency:** The clinic is alerted and the patient record is logged.
- **Non-Emergency:** The patient is routed to an appropriate specialty and doctor, appointment slots are generated, patient communication is handled, and a doctor brief is prepared.

Both paths ultimately lead to **patient record logging**.

---

# Key Features

## Patient Intake

The frontend provides a simple patient intake form that collects:

- **Name**
- **Phone number**
- **Email**
- **Patient concern / message**

This information becomes the initial input to the n8n workflow.

---

## AI-Based Patient Triage

The Patient Journey Agent analyzes the patient's submitted concern and performs an initial AI-powered triage.

The system evaluates the request to determine the appropriate next step in the workflow.

---

## Patient History Lookup

The workflow can retrieve relevant information from existing patient records.

This allows the AI workflow to consider previously logged patient information when processing a new request.

---

## Clinic Knowledge Base Lookup

The workflow can query the clinic's knowledge base to provide additional context during the patient assessment and routing process.

---

## Urgency Assessment

The AI evaluates the patient's concern and determines the urgency of the case.

This assessment is used to decide whether the patient should follow the normal appointment workflow or the emergency workflow.

---

## Emergency Detection

The system includes an emergency detection step.

When an emergency is detected, the workflow prioritizes:

- Alerting the clinic
- Logging the patient record

This allows potentially urgent cases to be separated from the normal appointment-routing workflow.

---

## Automatic Specialty Selection

For non-emergency cases, the AI determines the appropriate medical specialty based on the patient's concern.

---

## Doctor Routing

After selecting the relevant specialty, the workflow routes the patient toward an appropriate doctor.

---

## Appointment Slot Generation

The system generates appointment slots that can be presented as part of the patient scheduling process.

---

## Patient Communication

The workflow can automatically communicate with the patient through email regarding the outcome of the workflow and appointment-related information.

---

## Doctor Brief Generation

Before the patient's appointment, the system can generate a concise brief containing relevant information about the patient's request and assessment.

This provides the doctor with useful context before interacting with the patient.

---

## Emergency Alert

When an emergency is detected, the workflow can send an alert to the clinic so that the case can receive immediate attention.

---

## Patient Record Logging

Patient information and workflow results are logged for record-keeping and future reference.

---

# Project Structure

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

### Frontend

The `frontend` directory contains the React + Vite application responsible for collecting patient information and sending it to the n8n workflow.

### Workflow

The `workflow` directory contains the exported n8n workflow that implements the Patient Journey Agent.

---

# How It Works

The complete workflow begins when a patient submits their information through the frontend.

The React application sends the patient's details to the configured **n8n webhook**. n8n then processes the request through the Patient Journey Agent.

The agent retrieves relevant patient history and clinic knowledge, performs AI-based triage, assesses urgency, checks for emergency conditions, and determines the appropriate specialty.

From there, the workflow automatically routes the patient either through the **emergency response path** or the **doctor and appointment management path**.

The final workflow output is recorded in the patient record system.

---

# Running the Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install the required dependencies:

```bash
npm install
```

Create or configure the `.env` file:

```env
VITE_N8N_WEBHOOK_URL=YOUR_N8N_WEBHOOK_URL
```

For a local n8n instance:

```env
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/patient-intake
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL, usually:

```text
http://localhost:5173
```

Open the URL in your browser to access the patient intake interface.

---

# Setting Up n8n

The n8n workflow is located in:

```text
workflow/patient_journey_agent.json
```

To import the workflow:

1. Open n8n.
2. Go to **Workflows**.
3. Select **Import from File**.
4. Select the workflow JSON file.
5. Import the workflow.
6. Configure the required credentials and services.
7. Verify the webhook configuration.
8. Activate the workflow if required.

For a local n8n instance:

```text
http://localhost:5678
```

The frontend should point to the corresponding n8n webhook URL through:

```env
VITE_N8N_WEBHOOK_URL
```

---

# Tech Stack

| Component | Technology |
|---|---|
| Frontend | React |
| Build Tool | Vite |
| Automation | n8n |
| AI | ChatGPT / OpenAI |
| Database / Storage | Google Sheets |
| Communication | Gmail |
| Language | JavaScript |

---

# Project Goals

The primary goal of the Patient Journey Agent is to demonstrate how **AI agents and workflow automation can be used to streamline patient intake and appointment management**.

The system combines:

- AI-powered decision making
- Workflow automation
- Patient information retrieval
- Knowledge-base lookup
- Appointment routing
- Automated communication
- Emergency workflow handling
- Record management

into a single automated patient journey.

---

# Disclaimer

This project is intended as a **demonstration and educational system** for AI-powered healthcare workflow automation.

AI-generated triage or urgency assessments should not be considered a substitute for evaluation by a qualified healthcare professional or emergency medical services.
