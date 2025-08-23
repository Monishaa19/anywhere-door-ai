import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);

// Call this from the VAPI flow (if VAPI supports calling a JS function) like:
// window.submitDoraData({ answers: [...], meta: {...} })
(window as any).submitDoraData = async (rawData: any) => {
  try {
    console.log('submitDoraData received:', rawData);

    // Normalizer: adapt this to your Dora answer shape
    const normalize = (data: any) => {
      // Example: if Dora returns answers array [{question, answer}, ...]
      if (Array.isArray(data?.answers)) {
        const map = Object.fromEntries(data.answers.map((a: any) => [a.questionKey || a.question || a.label || `q${Math.random()}`, a.answer]));
        return {
          timestamp: new Date().toISOString(),
          source: 'dora-widget',
          raw: data,
          mapped: map
        };
      }

      // If Dora returns a form-like object already
      if (data?.form) {
        return {
          timestamp: new Date().toISOString(),
          source: 'dora-widget',
          raw: data,
          mapped: data.form
        };
      }

      // fallback: send raw payload
      return {
        timestamp: new Date().toISOString(),
        source: 'dora-widget',
        raw: data
      };
    };

    const payload = normalize(rawData);

    const endpoint = 'https://thenameismonisha.app.n8n.cloud/webhook-test/190ece94-13f5-4a98-a50a-c97ccd4459da'; // <-- REPLACE with your URL
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error('Failed to POST Dora data:', res.status, await res.text());
    } else {
      console.log('Dora data posted successfully');
    }
  } catch (err) {
    console.error('submitDoraData error', err);
  }
};

// Also accept messages via window.postMessage from the widget (some widgets use postMessage)
window.addEventListener('message', (ev) => {
  try {
    // Optionally restrict by origin:
    // if (ev.origin !== 'https://unpkg.com' && ev.origin !== YOUR_WIDGET_ORIGIN) return;

    const data = ev.data;
    if (!data) return;

    // Inspect incoming messages in console to discover the exact event shape:
    console.debug('window message received:', data);

    // Heuristics: common event shapes
    if (data?.type === 'vapi.conversation.finished' || data?.event === 'conversation.complete' || data?.event === 'vapi.conversation.complete') {
      (window as any).submitDoraData(data.payload ?? data);
      return;
    }

    // If the message contains answers or form content, forward it
    if (data?.answers || data?.form || data?.responses) {
      (window as any).submitDoraData(data);
    }
  } catch (e) {
    console.error(e);
  }
});
