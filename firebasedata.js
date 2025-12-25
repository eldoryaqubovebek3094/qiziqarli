// Firebase SDK importlari
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase config (Firebase Console’dan olasan)
const firebaseConfig = {
apiKey: "AIzaSyBPIA4kBZrGssQsrNwXX4M5Zoo84lgcVak",
  authDomain: "portfolio-eweb.firebaseapp.com",
  projectId: "portfolio-eweb",
  storageBucket: "portfolio-eweb.firebasestorage.app",
  messagingSenderId: "382513632096",
  appId: "1:382513632096:web:6f450213708826996f4405"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

  // Test yozish
  await setDoc(doc(db, "test", "hello"), { msg: "Salom Eldor!" });
  console.log("Firestorega yozildi!");



// Qurilma aniqlash
function categorizeDevice(ua = "") {
  ua = ua.toLowerCase();
  const isTablet = /ipad|tablet|tab/i.test(ua) || (ua.includes("android") && !ua.includes("mobile"));
  const isMobile = /mobile|iphone|ipod|android|iemobile|windows phone|opera mini/i.test(ua) && !isTablet;
  if (isTablet) return "tablet";
  if (isMobile) return "mobile";
  return "desktop";
}

async function trackVisitor() {
  const device = categorizeDevice(navigator.userAgent);
  const statsRef = doc(db, "stats", "visitors");

  const snap = await getDoc(statsRef);
  if (!snap.exists()) {
    await setDoc(statsRef, { mobile: 0, tablet: 0, desktop: 0, total: 0 });
  }

  await updateDoc(statsRef, {
    [device]: increment(1),
    total: increment(1)
  });
}

async function renderStats() {
  const statsRef = doc(db, "stats", "visitors");
  const snap = await getDoc(statsRef);
  if (snap.exists()) {
    const data = snap.data();
    document.getElementById("mobileCount").textContent = data.mobile;
    document.getElementById("tabletCount").textContent = data.tablet;
    document.getElementById("desktopCount").textContent = data.desktop;
    document.getElementById("totalCount").textContent = data.total;
  }
}

// Ishga tushirish
trackVisitor().then(renderStats);