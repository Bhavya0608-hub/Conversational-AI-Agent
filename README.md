# Conversational AI Agent & SolarVoxAI

> **A unified intelligent voice agent ecosystem for conversational AI and solar power outbound communications**

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
- [Environment Setup](#environment-setup)
- [Project Architecture](#project-architecture)
- [Running the Applications](#running-the-applications)
- [API Integration](#api-integration)
- [Authentication & Security](#authentication--security)
- [Deployment Guide](#deployment-guide)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Resources](#resources)
- [FAQs](#faqs)

---

## 🎯 Project Overview

This repository contains two interconnected AI-powered projects:

### 1. **Conversational AI Agent**
An intelligent virtual assistant built with Next.js, leveraging Retell AI for advanced conversational capabilities and Supabase for secure database management and authentication. Perfect for customer support, information gathering, and interactive user engagement.

### 2. **SolarVoxAI**
A specialized multilingual outbound voice agent designed for solar power installation communications. It combines cutting-edge voice technologies to automate and optimize customer outreach for solar businesses.

Both projects share a common foundation while serving different use cases:
- **Conversational AI Agent**: Inbound/Interactive conversations
- **SolarVoxAI**: Outbound voice campaigns for solar sales

---

## ✨ Key Features

### Conversational AI Agent Features
- ✅ Intelligent conversational capabilities using advanced AI
- ✅ User authentication and authorization with Supabase
- ✅ Intuitive interface built with Next.js and React
- ✅ Support for multiple APIs and integrations
- ✅ Fully responsive design (mobile & desktop)
- ✅ Session management and user persistence
- ✅ Real-time message processing
- ✅ Secure API communication

### SolarVoxAI Features
- ✅ Multilingual voice interaction capabilities
- ✅ Natural text-to-speech powered by ELEVENLABS
- ✅ Accurate speech-to-text via DeepGram
- ✅ Context-aware responses using GPT-4.1
- ✅ Reliable outbound calling via Twilio
- ✅ Customizable call scripts and workflows
- ✅ Call recording and analytics
- ✅ Follow-up automation

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14+ with React.js
- **Styling**: Tailwind CSS / CSS Modules / Styled Components
- **State Management**: React Hooks / Context API
- **Real-time Updates**: WebSockets (optional)

### Backend & Services
- **Conversational AI**: Retell AI API
- **Voice Processing**: 
  - **TTS**: ELEVENLABS API
  - **STT**: DeepGram API
  - **LLM**: OpenAI GPT-4.1
- **Telecommunications**: Twilio
- **Database & Auth**: Supabase (PostgreSQL)

### Infrastructure
- **Hosting**: Vercel (recommended)
- **Runtime**: Node.js v16+
- **Package Manager**: npm or Yarn
- **Version Control**: Git

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed and configured:

### System Requirements
- **Node.js**: v16.0.0 or later
- **npm**: v7.0.0 or later (or Yarn v3+)
- **Git**: Latest version
- **RAM**: Minimum 2GB (4GB recommended)
- **Disk Space**: At least 500MB free

### Required API Keys & Accounts
1. **Retell AI** - Sign up at [retell.ai](https://retell.ai)
2. **Supabase** - Create account at [supabase.com](https://supabase.com)
3. **ELEVENLABS** - Get API key from [elevenlabs.io](https://elevenlabs.io)
4. **DeepGram** - Sign up at [deepgram.com](https://deepgram.com)
5. **OpenAI** - API key from [openai.com](https://openai.com)
6. **Twilio** - Account at [twilio.com](https://twilio.com)

---

## 📥 Installation Guide

### Step 1: Clone the Repository

```bash
# Clone the main repository
git clone https://github.com/Bhavya0608-hub/Conversational-AI-Agent.git

# Navigate to project directory
cd Conversational-AI-Agent
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using Yarn
yarn install

# Verify installation
node --version  # Should be v16+
npm --version   # Should be v7+
```

### Step 3: Install Optional Dependencies (for SolarVoxAI)

```bash
# For voice processing features
npm install twilio deepgram-sdk elevenlabs openai

# For enhanced functionality
npm install axios dotenv cors
```

### Step 4: Verify Installation

```bash
# Check if Next.js is installed correctly
npx next --version

# Check installed dependencies
npm list --depth=0
```

---

## ⚙️ Environment Setup

### Create Environment Configuration File

Create a `.env.local` file in the root directory of your project:

```bash
touch .env.local
```

### Conversational AI Agent - Environment Variables

Add the following variables to your `.env.local`:

```env
# ========== RETELL AI ==========
NEXT_PUBLIC_RETELL_API_KEY=your_retell_api_key_here
RETELL_API_SECRET=your_retell_secret_here

# ========== SUPABASE ==========
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# ========== APPLICATION ==========
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### SolarVoxAI - Additional Environment Variables

```env
# ========== ELEVENLABS (Text-to-Speech) ==========
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_VOICE_ID=your_voice_id_here

# ========== DEEPGRAM (Speech-to-Text) ==========
DEEPGRAM_API_KEY=your_deepgram_api_key_here

# ========== OPENAI (GPT-4.1) ==========
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4

# ========== TWILIO (Telephony) ==========
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx

# ========== SOLAR BUSINESS CONFIG ==========
SOLAR_COMPANY_NAME=Your Solar Company
SOLAR_COMPANY_PHONE=+1xxxxxxxxxx
SOLAR_WEBSITE=https://yoursolarcompany.com
```

### Step-by-Step API Key Acquisition

#### Retell AI
1. Visit [retell.ai](https://retell.ai) and sign up
2. Navigate to Settings → API Keys
3. Copy your API key and secret

#### Supabase
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Navigate to Settings → API
3. Copy `Project URL` and `anon public key`
4. Also copy `Service Role Key` for backend operations

#### ELEVENLABS
1. Sign up at [elevenlabs.io](https://elevenlabs.io)
2. Go to Settings → API Key
3. Copy your API key
4. Select a voice and copy the Voice ID from the Voice Library

#### DeepGram
1. Create account at [deepgram.com](https://deepgram.com)
2. Navigate to API Keys section
3. Create a new API key

#### OpenAI
1. Visit [openai.com](https://openai.com)
2. Go to API Keys → Create new secret key
3. Copy the key immediately (it won't be shown again)

#### Twilio
1. Sign up at [twilio.com](https://twilio.com)
2. Get your Account SID and Auth Token from Console
3. Verify a phone number or get a Twilio phone number
4. Navigate to Phone Numbers to set webhook URLs

---

## 🏗 Project Architecture

### Directory Structure

```
Conversational-AI-Agent/
│
├── 📁 pages/
│   ├── api/
│   │   ├── chat.js              # Retell AI chat endpoint
│   │   ├── voice/
│   │   │   ├── incoming.js       # Incoming Twilio calls
│   │   │   ├── tts.js            # Text-to-speech (ELEVENLABS)
│   │   │   └── stt.js            # Speech-to-text (DeepGram)
│   │   ├── auth/
│   │   │   ├── login.js          # User login
│   │   │   ├── register.js       # User registration
│   │   │   └── logout.js         # User logout
│   │   └── webhook/
│   │       └── twilio.js         # Twilio webhooks
│   ├── _app.js                   # Next.js app configuration
│   ├── _document.js              # Document setup
│   ├── index.js                  # Home page
│   ├── dashboard.js              # User dashboard
│   ├── chat.js                   # Chat interface
│   └── solarvox.js              # SolarVoxAI page
│
├── 📁 components/
│   ├── ChatInterface.js           # Chat UI component
│   ├── VoiceAgent.js             # Voice interaction component
│   ├── SolarVoxDashboard.js      # SolarVoxAI dashboard
│   ├── AuthForm.js               # Login/Register form
│   ├── Navigation.js             # App navigation
│   └── common/
│       ├── Button.js
│       ├── Input.js
│       └── Modal.js
│
├── 📁 lib/
│   ├── supabase.js               # Supabase client
│   ├── retell.js                 # Retell AI integration
│   ├── elevenlabs.js             # ELEVENLABS TTS
│   ├── deepgram.js               # DeepGram STT
│   ├── openai.js                 # GPT-4.1 integration
│   ├── twilio.js                 # Twilio setup
│   └── auth.js                   # Authentication helpers
│
├── 📁 public/
│   ├── images/
│   ├── icons/
│   └── styles/
│
├── 📁 styles/
│   ├── globals.css
│   ├── Home.module.css
│   └── components/
│
├── 📁 utils/
│   ├── validators.js
│   ├── formatters.js
│   └── constants.js
│
├── .env.local                     # Environment variables
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies
├── package-lock.json              # Lock file
└── README.md                      # This file
```

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACE                            │
│  (Next.js Frontend + React Components)                       │
└────────────────┬──────────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
    ┌───▼────┐      ┌─────▼──┐
    │ CHAT   │      │ VOICE  │
    │MODULE  │      │MODULE  │
    └────┬───┘      └────┬───┘
         │               │
    ┌────▼──────────────▼────┐
    │   API LAYER (Node.js)   │
    │  - Next.js Routes       │
    │  - API Endpoints        │
    └────┬──────────────┬─────┘
         │              │
    ┌────▼────┐    ┌────▼─────────┐
    │ RETELL   │    │ VOICE STACK  │
    │ AI       │    │  - ELEVENLABS│
    └─────────┘    │  - DeepGram  │
                   │  - GPT-4.1   │
                   │  - Twilio    │
                   └────┬─────────┘
                        │
                   ┌────▼──────┐
                   │ SUPABASE   │
                   │ PostgreSQL │
                   └───────────┘
```

---

## 🚀 Running the Applications

### Development Mode

#### Start the Development Server

```bash
# Using npm
npm run dev

# Using Yarn
yarn dev
```

The application will start on `http://localhost:3000`

#### Access Different Modules

- **Conversational AI Agent**: http://localhost:3000/
- **SolarVoxAI Dashboard**: http://localhost:3000/solarvox
- **Chat Interface**: http://localhost:3000/chat
- **User Dashboard**: http://localhost:3000/dashboard

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Testing the Applications

```bash
# Run tests (if configured)
npm run test

# Run linting
npm run lint

# Format code
npm run format
```

---

## 🔌 API Integration

### Conversational AI Agent - Retell AI

#### Send a Message

```javascript
// pages/api/chat.js
import axios from 'axios';

export default async function handler(req, res) {
  const { message, conversationId } = req.body;
  
  try {
    const response = await axios.post(
      'https://api.retell.ai/v2/conversations/send_message',
      {
        conversation_id: conversationId,
        text: message,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_RETELL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

#### Frontend Usage

```javascript
// components/ChatInterface.js
const sendMessage = async (message) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
      conversationId: currentConversation.id,
    }),
  });
  
  const data = await response.json();
  setMessages([...messages, data]);
};
```

### SolarVoxAI - Voice Integration

#### Text-to-Speech (ELEVENLABS)

```javascript
// lib/elevenlabs.js
import axios from 'axios';

export async function synthesizeSpeech(text, voiceId) {
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('ELEVENLABS Error:', error);
    throw error;
  }
}
```

#### Speech-to-Text (DeepGram)

```javascript
// lib/deepgram.js
import { Deepgram } from '@deepgram/sdk';

const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);

export async function transcribeAudio(audioBuffer) {
  try {
    const response = await deepgram.transcription.preRecorded(
      {
        buffer: audioBuffer,
        mimetype: 'audio/wav',
      },
      {
        model: 'nova',
        language: 'en',
      }
    );

    return response.results.channels[0].alternatives[0].transcript;
  } catch (error) {
    console.error('DeepGram Error:', error);
    throw error;
  }
}
```

#### Outbound Calls (Twilio)

```javascript
// lib/twilio.js
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function initiateOutboundCall(customerPhone) {
  try {
    const call = await client.calls.create({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/twilio`,
      to: customerPhone,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    return call.sid;
  } catch (error) {
    console.error('Twilio Error:', error);
    throw error;
  }
}
```

#### GPT-4.1 Integration

```javascript
// lib/openai.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateResponse(userInput, context) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a helpful solar energy sales agent. ${context}`,
        },
        {
          role: 'user',
          content: userInput,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw error;
  }
}
```

---

## 🔐 Authentication & Security

### Supabase Authentication Setup

#### Initialize Supabase Client

```javascript
// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default supabase;
```

#### User Registration

```javascript
// pages/api/auth/register.js
import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    res.status(200).json({ user: data.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
```

#### User Login

```javascript
// pages/api/auth/login.js
import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.status(200).json({ session: data.session });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
```

### Security Best Practices

- ✅ Use environment variables for all sensitive data
- ✅ Implement CSRF protection
- ✅ Use HTTPS for all API calls
- ✅ Validate and sanitize user inputs
- ✅ Implement rate limiting
- ✅ Use secure session management
- ✅ Enable CORS only for trusted domains
- ✅ Regularly update dependencies: `npm audit fix`

---

## 📦 Deployment Guide

### Deployment to Vercel (Recommended)

#### Option 1: Via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Add environment variables in project settings
5. Click "Deploy"

#### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy project
vercel

# Deploy to production
vercel --prod
```

### Environment Variables on Vercel

1. Go to Project Settings → Environment Variables
2. Add all variables from your `.env.local`
3. Select which environments they apply to (Production, Preview, Development)
4. Click "Save"

### Alternative Deployment Platforms

#### Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Add environment variables
heroku config:set NEXT_PUBLIC_RETELL_API_KEY=your_key

# Deploy
git push heroku main
```

#### AWS EC2

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Clone repository
git clone https://github.com/Bhavya0608-hub/Conversational-AI-Agent.git

# Install dependencies
cd Conversational-AI-Agent && npm install

# Create .env.local with your variables
nano .env.local

# Build and start
npm run build && npm start
```

### Domain Configuration

1. Buy a domain from a registrar (GoDaddy, Namecheap, etc.)
2. Update DNS records to point to your deployment
3. Configure SSL/HTTPS (Vercel does this automatically)
4. Set the domain in your platform's settings

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Issue 1: Application Won't Start

```
Error: Cannot find module 'next'
```

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

#### Issue 2: API Keys Not Working

**Symptoms:** 401 Unauthorized errors

**Solution:**
```bash
# Verify API keys are correctly set
echo $NEXT_PUBLIC_RETELL_API_KEY

# Check .env.local file exists and has correct values
cat .env.local

# Restart development server
npm run dev
```

#### Issue 3: Database Connection Errors

```
Error: Failed to connect to Supabase
```

**Solution:**
```javascript
// Verify Supabase configuration
import supabase from '@/lib/supabase';

console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Has anon key:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Test connection
const { data, error } = await supabase.auth.getSession();
if (error) console.error('Connection failed:', error);
```

#### Issue 4: Voice Processing Fails

**Problem:** ELEVENLABS/DeepGram API errors

**Solution:**
```bash
# Verify API keys
curl -X GET https://api.elevenlabs.io/v1/voices \
  -H "xi-api-key: $ELEVENLABS_API_KEY"

# Check Twilio configuration
npm test -- twilio

# Ensure audio format is compatible
# DeepGram supports: WAV, FLAC, MP3, etc.
```

#### Issue 5: Deployment Fails

**Solution:**
```bash
# Check build locally first
npm run build

# Verify environment variables are set on platform
npm run build -- --debug

# Check logs
vercel logs
```

### Debug Mode

Enable debug logging:

```javascript
// Enable debug mode
process.env.DEBUG = 'true';

// Or in specific modules
if (process.env.DEBUG) {
  console.log('Debug info:', data);
}
```

### Getting Help

- 📖 Check the [Next.js documentation](https://nextjs.org/docs)
- 🎤 Review [Retell AI documentation](https://retell.ai/docs)
- 🔊 Check [ELEVENLABS API docs](https://docs.elevenlabs.io)
- 🎙️ See [DeepGram documentation](https://deepgram.com/docs/)
- 📞 Refer to [Twilio documentation](https://www.twilio.com/docs/)
- 🗄️ Visit [Supabase docs](https://supabase.io/docs)

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Step 1: Fork the Repository

Click the "Fork" button on GitHub to create your own copy.

### Step 2: Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/Conversational-AI-Agent.git
cd Conversational-AI-Agent
```

### Step 3: Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### Step 4: Make Your Changes

- Write clear, commented code
- Follow existing code style
- Add tests if applicable

### Step 5: Commit Your Changes

```bash
git add .
git commit -m "feat: Add description of your changes"
```

### Step 6: Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### Step 7: Submit a Pull Request

- Go to the original repository on GitHub
- Click "New Pull Request"
- Select your branch and describe your changes

### Code Style Guidelines

- Use ESLint: `npm run lint`
- Format with Prettier: `npm run format`
- Write meaningful commit messages
- Add comments for complex logic
- Keep functions small and focused

---

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Retell AI Documentation](https://retell.ai/docs)
- [Supabase Guide](https://supabase.io/docs)
- [ELEVENLABS API Docs](https://docs.elevenlabs.io)
- [DeepGram Documentation](https://deepgram.com/docs/)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Twilio Documentation](https://www.twilio.com/docs/)

### Tutorial & Guides
- [Next.js Tutorial](https://nextjs.org/learn)
- [Supabase Quick Start](https://supabase.io/docs/guides/getting-started)
- [Twilio Voice Quickstart](https://www.twilio.com/docs/voice/quickstart)

### Community
- [GitHub Issues](https://github.com/Bhavya0608-hub/Conversational-AI-Agent/issues)
- [Discussions](https://github.com/Bhavya0608-hub/Conversational-AI-Agent/discussions)

---

## ❓ FAQs

### Q1: How do I reset my password?

**A:** 
1. Click "Forgot Password" on the login page
2. Enter your email address
3. Check your email for the reset link
4. Click the link and set a new password

### Q2: Can I use this in production?

**A:** Yes! But ensure:
- All API keys are secured
- Environment variables are properly configured
- You have proper error handling
- Rate limiting is implemented
- HTTPS is enabled
- Regular security audits are conducted

### Q3: How do I add a new voice to SolarVoxAI?

**A:**
```javascript
// 1. Get voice ID from ELEVENLABS
// 2. Add to .env.local
ELEVENLABS_VOICE_ID_SPANISH=your_voice_id

// 3. Update your voice configuration
const voices = {
  en: process.env.ELEVENLABS_VOICE_ID,
  es: process.env.ELEVENLABS_VOICE_ID_SPANISH,
};
```

### Q4: How do I customize the chat interface?

**A:** Edit `/components/ChatInterface.js` to modify:
- Colors and styling
- Message formatting
- Input field appearance
- Send button behavior

### Q5: How do I enable call recording with Twilio?

**A:**
```javascript
// In your Twilio call configuration
const call = await client.calls.create({
  record: true,
  recordingChannels: 'mono',
  // ... other settings
});
```

### Q6: What are the rate limits for each API?

- **Retell AI**: Check your plan at retell.ai
- **ELEVENLABS**: Varies by subscription
- **DeepGram**: Variable based on tier
- **Twilio**: Based on your account
- **OpenAI**: See pricing page

### Q7: How do I debug voice issues?

**A:**
```bash
# Test ELEVENLABS
curl -X GET https://api.elevenlabs.io/v1/voices \
  -H "xi-api-key: YOUR_API_KEY"

# Test DeepGram
curl -X POST https://api.deepgram.com/v1/listen \
  -H "Authorization: Token YOUR_API_KEY"

# Check Twilio logs
twilio logs
```

### Q8: Can I host this on my own server?

**A:** Yes, but you'll need:
- Node.js server (AWS EC2, DigitalOcean, etc.)
- PostgreSQL database (or use Supabase)
- SSL certificate
- Domain name
- Proper firewall configuration

### Q9: How do I handle multiple languages?

**A:**
```javascript
// Create language-specific configurations
const languageConfig = {
  en: { voiceId: 'en_voice_id', model: 'gpt-4-en' },
  es: { voiceId: 'es_voice_id', model: 'gpt-4-es' },
  fr: { voiceId: 'fr_voice_id', model: 'gpt-4-fr' },
};
```

### Q10: How do I integrate with CRM systems?

**A:** Use webhooks and APIs:
```javascript
// After successful call/conversation
async function syncWithCRM(contactData) {
  await fetch('YOUR_CRM_WEBHOOK_URL', {
    method: 'POST',
    body: JSON.stringify(contactData),
  });
}
```

---

## 📄 License

This project is open source and available under the MIT License. See LICENSE file for details.

---

## 👤 Author

**Bhavya0608-hub**

- GitHub: [@Bhavya0608-hub](https://github.com/Bhavya0608-hub)
- Project: [Conversational-AI-Agent](https://github.com/Bhavya0608-hub/Conversational-AI-Agent)

---

## 💬 Support & Feedback

Found a bug? Have a feature request? Please [create an issue](https://github.com/Bhavya0608-hub/Conversational-AI-Agent/issues) on GitHub!

---

**Last Updated**: 2026-04-02 21:31:30

**Status**: ✅ Active Development

⭐ **If you found this helpful, please consider giving the repository a star!** ⭐