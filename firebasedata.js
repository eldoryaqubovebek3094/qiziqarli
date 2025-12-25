// Firebase SDK importlari
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase config (Firebase Console’dan olasan)
const firebaseConfig = {
  //   apiKey: "YOUR_API_KEY",
  //   authDomain: "YOUR_PROJECT.firebaseapp.com",
  //   projectId: "YOUR_PROJECT_ID",
  //   storageBucket: "YOUR_PROJECT.appspot.com",
  //   messagingSenderId: "YOUR_SENDER_ID",
  //   appId: "YOUR_APP_ID"
  apiKey: "AIzaSyBc2hQrNFOgBTVjFmK6PXHTHvTmmeY-RDE",
  authDomain: "kinolar-57498.firebaseapp.com",
  projectId: "kinolar-57498",
  storageBucket: "kinolar-57498.appspot.com",
  messagingSenderId: "440752215048",
  appId: "1:440752215048:web:33f514d74626d025d1adbd",
  measurementId: "G-06T6RPRBMX",
};

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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