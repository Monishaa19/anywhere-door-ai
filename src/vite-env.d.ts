/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'vapi-widget': {
      'assistant-id': string;
      'public-key': string;
    };
  }
}

declare global {
  interface Window {
    handleTripPlanning: (tripData: any) => Promise<string>;
  }
}
