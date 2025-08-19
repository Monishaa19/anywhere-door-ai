/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'vapi-widget': {
      'assistant-id': string;
      'public-key': string;
      style?: React.CSSProperties;
    };
  }
}

// Extend Window interface for VAPI events
declare global {
  interface Window {
    addEventListener(type: 'vapi-message', listener: (event: CustomEvent) => void): void;
    removeEventListener(type: 'vapi-message', listener: (event: CustomEvent) => void): void;
  }
}
