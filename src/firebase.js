import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ Importar getAuth correctamente

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyABzipMoGcKLe7uYsiXZUPh_fwarP39Cy8",
  authDomain: "fitme-43ecb.firebaseapp.com",
  projectId: "fitme-43ecb",
  storageBucket: "fitme-43ecb.firebasestorage.app",
  messagingSenderId: "825731879425",
  appId: "1:825731879425:web:61ba772d81a405f5896600",
  measurementId: "G-2XBC26E6J1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
