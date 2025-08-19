/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'vapi-widget': {
      'assistant-id': string;
      'public-key': string;
    };
  }
}
