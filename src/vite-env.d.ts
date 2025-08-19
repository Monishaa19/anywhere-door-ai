/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'vapi-widget': {
      'assistant-id': string;
      'public-key': string;
      mode?: string;
      theme?: string;
      'base-bg-color'?: string;
      'accent-color'?: string;
      'cta-button-color'?: string;
      'cta-button-text-color'?: string;
      'border-radius'?: string;
      size?: string;
      position?: string;
      title?: string;
      'start-button-text'?: string;
      'end-button-text'?: string;
      'cta-subtitle'?: string;
      'chat-first-message'?: string;
      'chat-placeholder'?: string;
      'voice-show-transcript'?: string;
      'consent-required'?: string;
      'consent-title'?: string;
      'consent-content'?: string;
      'consent-storage-key'?: string;
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
