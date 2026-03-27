# Case Study: AI-Powered Slack Data Assistant

## Overview

During a hackathon, we explored a different way for teams to access data: asking questions in plain English inside Slack and getting answers back without opening dashboards or routing everything through an analyst. The idea was simple, but the bigger opportunity was reducing friction around quick, everyday data questions.

---

## Problem

Stakeholders usually got answers in one of two ways:
- Through dashboards like Power BI
- By working with a data analyst

Both worked, but they added friction for ad-hoc questions.

That meant people had to:
- Navigate multiple dashboards
- Know where specific metrics lived
- Or wait on analyst support

Even simple questions like:
- "How many carriers used QuickPay last month?"
- "How many carriers signed up for LoadPay?"

could still take multiple steps to answer.

---

## Approach

I focused on shaping both the problem definition and the system design.

That included:
- Defining the core problem around data access friction
- Helping design the end-to-end flow from user to agent to database to response
- Developing guardrails and query logic for how the AI agent should interact with our data
- Thinking through ambiguity, data nuance, and edge cases

The goal was to give stakeholders fast, reliable answers without leaving their workflow.

---

## System Design

**Core Flow**

1. User asks a question in Slack
2. Slack bot receives the message
3. AI agent interprets the request
4. Agent generates a structured query
5. Query runs against Snowflake
6. Results are returned in Slack

**Data & Systems**

- **Interface:** Slack bot
- **AI Layer:** LLM-powered agents
- **Database:** Snowflake
- **POC Scope:** Roughly 2 months of payments, carriers, and invoice data

---

## Designing for Accuracy

One of the biggest challenges was that the data had a lot of nuance.

To improve reliability, we designed the agent with structured guidance, including:
- Metric definitions
- Instructions on which fields to use
- Known edge cases in the data
- Query logic for specific use cases

This worked like a lightweight semantic layer and helped the model generate more accurate queries.

---

## Guardrails & Constraints

We did not want the agent freely generating SQL without context.

We explored guardrails like:
- Limiting which tables could be accessed
- Defining approved query logic patterns
- Providing explicit instructions for common queries
- Scrubbing PII from responses
- Returning confidence indicators with results

---

## Handling Ambiguity

Not every question is clean.

We designed logic for when questions were:
- Too vague
- Too complex
- Missing context

In those cases, the system could:
- Ask for clarification
- Or route the user to a subject matter expert

---

## Agent Design

We explored using multiple specialized agents, each focused on a domain:
- Carrier data
- Factoring
- Broker activity
- Payments

Each agent would:
- Have domain-specific context
- Follow tailored query logic
- Reduce errors from overly general prompts

---

## Output Design

We considered a few response formats:
- Direct answers for simple metrics
- Short summaries
- Lightweight visualizations when useful

The goal was to keep responses clear, fast, and actionable.

---

## What We Built

Within the hackathon timeframe, we were able to:
- Prototype a front-end UI for the experience
- Spin up a Slack bot that could receive messages
- Begin setting up AI agents with defined roles, constraints, and logic

The full query-to-response loop was still in progress, but the concept was far enough along to show how the experience could work in practice.

---

## Example Use Cases

We focused on simple, high-frequency questions like:
- "How many carriers used QuickPay last month?"
- "How many carriers signed up for LoadPay?"

These helped validate the core experience before taking on more complex queries.

---

## What Success Looks Like

Success was not just about accuracy. It was also about experience.

We defined success as:
- Fast, reliable answers
- Less dependency on analysts for simple requests
- Stakeholders staying inside their existing workflow in Slack

---

## Limitations

As a proof of concept, there were still open challenges:
- Query accuracy for complex logic
- Consistent metric definitions
- Handling joins across multiple tables
- Permissions and data access control

---

## Reflection

This project shifted how I think about data work.

Instead of only building dashboards or answering questions, there is also an opportunity to improve how people access and interact with data in the first place.

It also made me more interested in:
- AI-powered data tools
- Internal platforms
- Reducing friction between teams and data

---

## Outcome

Hackathon prototype that mapped out a practical way to bring conversational data access into Slack using Snowflake and LLM-based agents.

More than a one-off demo, it helped clarify what a production version would need: stronger metric definitions, tighter guardrails, and a cleaner path to fast answers inside the tools teams already use.
