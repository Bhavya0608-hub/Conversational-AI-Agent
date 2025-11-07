# 🔊 AI Voice Agent with Twilio & ElevenLabs (Inbound + Outbound Calling)

This project enables *real-time voice conversations* over phone calls using:

- *Twilio* → Handles incoming/outgoing phone calls
- *ElevenLabs Conversational AI* → AI Voice Agent that understands and responds live
- *WebSockets* → Streams live audio between Twilio & ElevenLabs

You can:
✅ Receive phone calls and let the AI answer  
✅ Make outbound calls to any phone number  
✅ Have real-time, natural, two-way voice interaction  

---

## 🚀 Features

| Feature | Status | Description |
|--------|--------|-------------|
| Inbound Call Support | ✅ | AI answers incoming calls via Twilio Webhooks |
| Outbound Calls | ✅ | Trigger AI outbound calls via REST API |
| Live Audio Streaming | ✅ | Full-duplex WebSocket audio between Twilio & ElevenLabs |
| Natural Voice AI | ✅ | ElevenLabs Conversational Agent handles speech + logic |
| Self-Hosted / Replit Compatible | ✅ | Runs on any Node.js environment |

---

## 📦 Requirements

| Dependency | Purpose |
|-----------|---------|
| Node.js 18+ | Server runtime |
| Twilio Account & Phone Number | Call routing |
| ElevenLabs Pro or Conversational AI Agent | AI voice + reasoning |
| Replit / VPS / Local machine | Hosting |

---

## 🔐 Environment Configuration

Go to your hosting environment (Replit → *Secrets* tab, or .env locally) and add:
ELEVENLABS_AGENT_ID=your-eleven-labs-agent-id
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number





