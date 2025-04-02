declare module 'mapbox-gl' {
  export interface MapboxOptions {
    accessToken?: string;
    minZoom?: number;
    maxZoom?: number;
    style?: any;
    container?: any;
    hash?: boolean | string;
    interactive?: boolean;
    bearingSnap?: number;
    pitchWithRotate?: boolean;
    clickTolerance?: number;
    attributionControl?: boolean;
    customAttribution?: string | string[];
    logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    failIfMajorPerformanceCaveat?: boolean;
    preserveDrawingBuffer?: boolean;
    antialias?: boolean;
    refreshExpiredTiles?: boolean;
    maxBounds?: any;
    scrollZoom?: boolean | Object;
    boxZoom?: boolean;
    dragRotate?: boolean;
    dragPan?: boolean | Object;
    keyboard?: boolean;
    doubleClickZoom?: boolean;
    touchZoomRotate?: boolean | Object;
    trackResize?: boolean;
    center?: [number, number];
    zoom?: number;
    bearing?: number;
    pitch?: number;
    bounds?: any;
    fitBoundsOptions?: Object;
    renderWorldCopies?: boolean;
    maxTileCacheSize?: number;
    transformRequest?: Function;
    localIdeographFontFamily?: string;
    collectResourceTiming?: boolean;
    fadeDuration?: number;
    crossSourceCollisions?: boolean;
  }
}

// Define import.meta.env for Vite environment variables
interface ImportMetaEnv {
  VITE_MAPBOX_ACCESS_TOKEN: string;
  VITE_API_URL: string;
  VITE_FIREBASE_API_KEY: string;
  VITE_FIREBASE_AUTH_DOMAIN: string;
  VITE_FIREBASE_PROJECT_ID: string;
  VITE_FIREBASE_STORAGE_BUCKET: string;
  VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  VITE_FIREBASE_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 