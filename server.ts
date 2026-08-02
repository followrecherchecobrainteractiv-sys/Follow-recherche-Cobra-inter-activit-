import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      company: 'Follow Recherche Cobra Inter Activité',
      timestamp: new Date().toISOString()
    });
  });

  // Google Search Console verification endpoint
  app.get('/google1c5349841a277fbe.html', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('google-site-verification: google1c5349841a277fbe.html');
  });

  // AI Architect & Proposal Generator Endpoint
  app.post('/api/ai-consultant', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY non configurée dans le serveur.'
        });
      }

      const { prompt, pillars, language = 'fr' } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Projet ou description requis' });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const langInstruction =
        language === 'ar'
          ? 'تحدث باللغة العربية بأسلوب احترافي وفاخر.'
          : language === 'en'
          ? 'Respond in professional, high-tech English.'
          : 'Répondez en français soutenu et hautement professionnel.';

      const systemInstruction = `Tu es l'Architecte IA principal et Conseiller Technique de "Follow Recherche Cobra Inter Activité", une structure créative de premier plan dirigée par Rayan Ouarab et spécialisée dans :
1. Développement de Jeux Vidéo (Game Dev, Cobra Engine, Unreal Engine)
2. Programmation Avancée & IA (Software, AI models, Automation)
3. Production Musicale & Design Sonore (OST, Sound Design, Composition)
4. Films & Cinématiques (CGI, VFX, Trailers 3D)

${langInstruction}

Génère une proposition technique et créative structurée pour le projet du client en format JSON valide avec la structure suivante :
{
  "title": "Titre du Concept",
  "tagline": "Une phrase d'accroche captivante",
  "executiveSummary": "Un résumé exécutif créatif et technologique (3-4 phrases)",
  "pillarsInvolved": ["Pôle 1", "Pôle 2"],
  "technicalArchitecture": ["Stack / Outil 1", "Stack / Outil 2", "Stack / Outil 3"],
  "creativeHighlights": ["Point fort créatif 1", "Point fort 2", "Point fort 3"],
  "musicSoundConcept": "Description du mood sonore et musical recommandé",
  "estimatedTimeline": "Délai estimé (ex: 4 à 8 semaines)",
  "recommendedPhasePlan": [
    {"phase": "Phase 1: Pré-production & Prototype IA", "duration": "2 semaines", "details": "détails"},
    {"phase": "Phase 2: Production Graphique, Audio & Code", "duration": "4 semaines", "details": "détails"},
    {"phase": "Phase 3: Post-production, VFX & Polissage", "duration": "2 semaines", "details": "détails"}
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Description du projet client : "${prompt}". Pôles d'intérêt : ${pillars ? pillars.join(', ') : 'Tous'}.`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.7
        }
      });

      const responseText = response.text || '{}';
      const parsedData = JSON.parse(responseText);

      return res.json({
        success: true,
        data: parsedData
      });

    } catch (error: any) {
      console.error('Error generating AI proposal:', error);
      return res.status(500).json({
        error: 'Erreur lors de la génération de la proposition IA',
        details: error?.message || 'Erreur inconnue'
      });
    }
  });

  // Vite middleware in development mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server "Follow Recherche Cobra Inter Activité" running on http://localhost:${PORT}`);
  });
}

startServer();
