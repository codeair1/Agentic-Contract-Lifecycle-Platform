# Backend Implementation Guide

## Overview

This document provides the complete backend architecture for the CLIA platform. The backend must be implemented separately and deployed to Google Cloud.

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Google Cloud Firestore
- **Storage**: Google Cloud Storage
- **Events**: Google Cloud Pub/Sub
- **AI**: Google Gemini (Vertex AI / AI Studio)
- **OCR**: Google Document AI
- **Auth**: Firebase Admin SDK
- **Deployment**: Google Cloud Run

## Project Structure

```
backend/
├── api/
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── contracts.ts
│   │   ├── agents.ts
│   │   ├── compliance.ts
│   │   └── dashboard.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── rbac.ts
│   │   └── errorHandler.ts
│   └── validators/
│       └── schemas.ts
├── agents/
│   ├── ClauseAgent.ts
│   ├── RiskAgent.ts
│   ├── ObligationAgent.ts
│   ├── ComplianceAgent.ts
│   ├── NegotiationAgent.ts
│   └── BaseAgent.ts
├── ai/
│   ├── gemini.ts
│   ├── documentAI.ts
│   └── embeddings.ts
├── events/
│   ├── publishers/
│   │   └── contractEvents.ts
│   └── subscribers/
│       ├── processContract.ts
│       └── notifyCompletion.ts
├── models/
│   ├── Contract.ts
│   ├── Clause.ts
│   ├── Risk.ts
│   ├── Obligation.ts
│   └── AuditLog.ts
├── compliance/
│   ├── piiDetector.ts
│   ├── regulationChecker.ts
│   └── explainability.ts
├── config/
│   ├── firebase.ts
│   ├── gemini.ts
│   └── storage.ts
├── utils/
│   ├── logger.ts
│   └── errors.ts
├── server.ts
├── package.json
└── tsconfig.json
```

## Core Files

### 1. server.ts

```typescript
import express from 'express';
import cors from 'cors';
import { initializeApp } from 'firebase-admin/app';
import authRoutes from './api/routes/auth';
import contractRoutes from './api/routes/contracts';
import agentRoutes from './api/routes/agents';
import complianceRoutes from './api/routes/compliance';
import dashboardRoutes from './api/routes/dashboard';
import { errorHandler } from './api/middleware/errorHandler';

// Initialize Firebase Admin
initializeApp();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`CLIA Backend running on port ${PORT}`);
});
```

### 2. agents/ClauseAgent.ts

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BaseAgent } from './BaseAgent';

export class ClauseAgent extends BaseAgent {
  private model: any;

  constructor() {
    super('ClauseAgent');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async analyze(contractText: string) {
    const prompt = `
      You are a legal AI assistant specializing in contract clause extraction.
      
      Analyze the following contract and extract all clauses with these details:
      - Clause Type (e.g., Payment, Termination, Liability, Confidentiality)
      - Content (exact text of the clause)
      - Confidence score (0-100)
      - Risk level (Low, Medium, High)
      
      Contract Text:
      ${contractText}
      
      Return ONLY a valid JSON array of clauses with no additional text:
      [
        {
          "type": "string",
          "content": "string",
          "confidence": number,
          "riskLevel": "Low" | "Medium" | "High"
        }
      ]
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Failed to extract clauses from Gemini response');
    }
    
    const clauses = JSON.parse(jsonMatch[0]);
    
    // Log audit entry
    await this.logAudit({
      agent: this.name,
      action: 'clause_extraction',
      input: { textLength: contractText.length },
      output: { clauseCount: clauses.length },
      timestamp: new Date(),
    });

    return clauses;
  }
}
```

### 3. agents/RiskAgent.ts

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BaseAgent } from './BaseAgent';

export class RiskAgent extends BaseAgent {
  private model: any;

  constructor() {
    super('RiskAgent');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async analyze(clauses: any[]) {
    const prompt = `
      You are a risk analysis AI expert for contract review.
      
      Analyze the following contract clauses and identify risks:
      
      Clauses:
      ${JSON.stringify(clauses, null, 2)}
      
      For each risk, provide:
      - Category (Financial, Legal, Operational, Reputational)
      - Description
      - Severity (Low, Medium, High)
      - Recommendation
      - Impact score (1-10)
      
      Also provide an overall risk score (0-100) with explanation.
      
      Return ONLY valid JSON:
      {
        "overallScore": number,
        "explanation": "string",
        "risks": [
          {
            "category": "string",
            "description": "string",
            "severity": "Low" | "Medium" | "High",
            "recommendation": "string",
            "impact": number
          }
        ]
      }
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to extract risks from Gemini response');
    }
    
    const riskAnalysis = JSON.parse(jsonMatch[0]);
    
    await this.logAudit({
      agent: this.name,
      action: 'risk_analysis',
      input: { clauseCount: clauses.length },
      output: { riskScore: riskAnalysis.overallScore },
      timestamp: new Date(),
    });

    return riskAnalysis;
  }
}
```

### 4. ai/gemini.ts

```typescript
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateStructuredContent(
  prompt: string,
  modelName: string = 'gemini-pro'
) {
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.2,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 8192,
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateEmbedding(text: string) {
  const model = genAI.getGenerativeModel({ model: 'embedding-001' });
  const result = await model.embedContent(text);
  return result.embedding;
}
```

### 5. events/publishers/contractEvents.ts

```typescript
import { PubSub } from '@google-cloud/pubsub';

const pubsub = new PubSub();
const topicName = 'contract-upload';

export async function publishContractUpload(contractId: string, fileUrl: string) {
  const dataBuffer = Buffer.from(
    JSON.stringify({
      contractId,
      fileUrl,
      timestamp: new Date().toISOString(),
    })
  );

  try {
    const messageId = await pubsub.topic(topicName).publish(dataBuffer);
    console.log(`Contract upload event published: ${messageId}`);
    return messageId;
  } catch (error) {
    console.error('Error publishing contract upload event:', error);
    throw error;
  }
}

export async function publishAnalysisComplete(contractId: string, results: any) {
  const dataBuffer = Buffer.from(
    JSON.stringify({
      contractId,
      results,
      timestamp: new Date().toISOString(),
    })
  );

  const messageId = await pubsub.topic('analysis-complete').publish(dataBuffer);
  return messageId;
}
```

### 6. api/routes/contracts.ts

```typescript
import express from 'express';
import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/rbac';
import { ClauseAgent } from '../../agents/ClauseAgent';
import { RiskAgent } from '../../agents/RiskAgent';
import { publishContractUpload } from '../../events/publishers/contractEvents';

const router = express.Router();
const storage = new Storage();
const upload = multer({ dest: '/tmp' });

// Upload contract
router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Cloud Storage
    const bucket = storage.bucket(process.env.GCS_BUCKET!);
    const blob = bucket.file(`contracts/${Date.now()}_${file.originalname}`);
    
    await blob.save(file.buffer);
    const fileUrl = `gs://${process.env.GCS_BUCKET}/${blob.name}`;

    // Create contract document in Firestore
    const contractRef = await db.collection('contracts').add({
      name: file.originalname,
      fileUrl,
      uploadedBy: req.user.uid,
      uploadDate: new Date(),
      status: 'processing',
    });

    // Publish event for asynchronous processing
    await publishContractUpload(contractRef.id, fileUrl);

    res.json({
      success: true,
      contractId: contractRef.id,
      message: 'Contract uploaded successfully',
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get contract by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const contractDoc = await db.collection('contracts').doc(req.params.id).get();
    
    if (!contractDoc.exists) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    res.json({
      success: true,
      data: { id: contractDoc.id, ...contractDoc.data() },
    });
  } catch (error) {
    console.error('Get contract error:', error);
    res.status(500).json({ error: 'Failed to fetch contract' });
  }
});

export default router;
```

### 7. compliance/piiDetector.ts

```typescript
import { DlpServiceClient } from '@google-cloud/dlp';

const dlp = new DlpServiceClient();

export async function detectPII(text: string) {
  const request = {
    parent: `projects/${process.env.GOOGLE_CLOUD_PROJECT}`,
    inspectConfig: {
      infoTypes: [
        { name: 'EMAIL_ADDRESS' },
        { name: 'PHONE_NUMBER' },
        { name: 'US_SOCIAL_SECURITY_NUMBER' },
        { name: 'CREDIT_CARD_NUMBER' },
        { name: 'STREET_ADDRESS' },
      ],
      minLikelihood: 'LIKELY',
    },
    item: { value: text },
  };

  const [response] = await dlp.inspectContent(request);
  return response.result?.findings || [];
}

export async function redactPII(text: string) {
  const request = {
    parent: `projects/${process.env.GOOGLE_CLOUD_PROJECT}`,
    deidentifyConfig: {
      infoTypeTransformations: {
        transformations: [{
          primitiveTransformation: {
            replaceWithInfoTypeConfig: {},
          },
        }],
      },
    },
    inspectConfig: {
      infoTypes: [
        { name: 'EMAIL_ADDRESS' },
        { name: 'PHONE_NUMBER' },
        { name: 'US_SOCIAL_SECURITY_NUMBER' },
      ],
    },
    item: { value: text },
  };

  const [response] = await dlp.deidentifyContent(request);
  return response.item?.value || text;
}
```

## Environment Variables

```env
# Server
PORT=3000
NODE_ENV=production

# Google Cloud
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
GCS_BUCKET=clia-contracts

# Firebase Admin
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com

# Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# Document AI
DOCUMENT_AI_PROCESSOR_ID=your-processor-id
DOCUMENT_AI_LOCATION=us

# Pub/Sub
PUBSUB_TOPIC_CONTRACT_UPLOAD=contract-upload
PUBSUB_TOPIC_ANALYSIS_COMPLETE=analysis-complete
PUBSUB_SUBSCRIPTION_PROCESSOR=contract-processor

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRATION=24h
```

## Deployment

### Cloud Run Deployment

```bash
# Build and deploy
gcloud run deploy clia-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --memory 2Gi \
  --cpu 2 \
  --timeout 300 \
  --concurrency 80 \
  --min-instances 1 \
  --max-instances 10 \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_CLOUD_PROJECT=your-project-id
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Contracts
    match /contracts/{contractId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
                     (request.auth.token.role == 'admin' || 
                      resource.data.uploadedBy == request.auth.uid);
      allow delete: if request.auth != null && 
                     request.auth.token.role == 'admin';
    }
    
    // Audit Logs
    match /auditLogs/{logId} {
      allow read: if request.auth != null && 
                   request.auth.token.role in ['admin', 'auditor'];
      allow write: if false; // Only system can write
    }
  }
}
```

## Testing

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run with coverage
npm run test:coverage

# Integration tests
npm run test:integration
```

## API Documentation

Full API documentation available at `/api/docs` (Swagger/OpenAPI)

## Monitoring

- **Logs**: Cloud Logging
- **Metrics**: Cloud Monitoring
- **Traces**: Cloud Trace
- **Errors**: Error Reporting

## Support

For backend implementation support, refer to Google Cloud documentation:
- [Cloud Run](https://cloud.google.com/run/docs)
- [Firestore](https://cloud.google.com/firestore/docs)
- [Vertex AI](https://cloud.google.com/vertex-ai/docs)
- [Document AI](https://cloud.google.com/document-ai/docs)
