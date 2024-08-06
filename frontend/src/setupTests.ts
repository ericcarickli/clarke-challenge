import '@testing-library/jest-dom';

(globalThis as any).importMeta = {
    env: {
      VITE_API_URL: 'http://localhost:3000',
    },
};