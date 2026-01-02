import { db } from '../firebase.config';
import { collection, getDocs, doc, setDoc, writeBatch } from 'firebase/firestore';
import { defaultSlides } from '../data/defaultSlides';
import { SlideData } from '../types';

const COLLECTION_NAME = 'slides';

// Helper to check if Firebase env vars are set roughly
const isFirebaseConfigured = () => {
  // Safely check env existence
  const env = (import.meta as any)?.env || {};
  return !!env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_API_KEY !== "YOUR_API_KEY";
};

export const fetchSlides = async (): Promise<SlideData[]> => {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase not configured. Using local default data.");
    return defaultSlides;
  }

  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    if (querySnapshot.empty) {
      console.log("No slides found in DB. Auto-repairing with defaults...");
      await resetSlidesToDefault();
      return defaultSlides;
    }
    
    const slides = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SlideData));
    // Sort by ID assuming ID is numeric-ish strings '1', '2'
    return slides.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  } catch (error) {
    console.error("Error fetching slides:", error);
    // Fallback if permission denied or network error
    return defaultSlides;
  }
};

export const saveSlide = async (slide: SlideData) => {
   if (!isFirebaseConfigured()) return;
   await setDoc(doc(db, COLLECTION_NAME, slide.id), slide);
};

export const resetSlidesToDefault = async () => {
  if (!isFirebaseConfigured()) return;
  
  const batch = writeBatch(db);
  defaultSlides.forEach(slide => {
    const slideRef = doc(db, COLLECTION_NAME, slide.id);
    batch.set(slideRef, slide);
  });
  await batch.commit();
};