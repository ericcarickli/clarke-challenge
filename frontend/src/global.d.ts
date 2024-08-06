// src/global.d.ts or a similar location
declare global {
    interface ImportMetaEnv {
      VITE_API_URL: string;
    }
  
    interface ImportMeta {
      env: ImportMetaEnv;
    }
  }
  
  // If you are using modules, ensure the file is included in tsconfig
  export {};
  