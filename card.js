function categorizeDevice(ua = "") {
  ua = ua.toLowerCase();
  const isTablet =
    /ipad|tablet|xoom|playbook|silk|kindle|tab/i.test(ua) ||
    (ua.includes("android") && !ua.includes("mobile"));
  const isMobile =
    /mobile|iphone|ipod|android|blackberry|iemobile|windows phone|opera mini|mobi/i.test(ua) && !isTablet;
  if (isTablet) return "tablet";
  if (isMobile) return "mobile";
  return "desktop";
}

function deviceLabel(key) {
  return key === "mobile" ? "Mobil" : key === "tablet" ? "Planshet" : "Kompyuter";
}

function loadStore() {
  try {
    const raw = localStorage.getItem("visitor_store");
    return raw ? JSON.parse(raw) : { visitors: {}, counts: { mobile: 0, tablet: 0, desktop: 0 }, days: {} };
  } catch {
    return { visitors: {}, counts: { mobile: 0, tablet: 0, desktop: 0 }, days: {} };
  }
}
function saveStore(store) {
  localStorage.setItem("visitor_store", JSON.stringify(store));
}

function getVisitorId() {
  let id = localStorage.getItem("visitor_id");
  if (!id) {
    id = "v-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("visitor_id", id);
  }
  return id;
}

function todayStr() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

(function main() {
  const store = loadStore();
  const vid = getVisitorId();
  const device = categorizeDevice(navigator.userAgent);
  const today = todayStr();

  if (!store.visitors[vid]) {
    store.visitors[vid] = { device, firstSeen: Date.now(), lastSeen: Date.now() };
    store.counts[device] = (store.counts[device] || 0) + 1;
  } else {
    store.visitors[vid].lastSeen = Date.now();
  }

  if (!store.days[today]) {
    store.days[today] = { unique: 0, visited: {} };
  }
  if (!store.days[today].visited[vid]) {
    store.days[today].visited[vid] = true;
    store.days[today].unique += 1;
  }

  saveStore(store);

  const $ = (id) => document.getElementById(id);
  $("deviceName").textContent = deviceLabel(device);
  $("todayStr").textContent = today;
  $("mobileCount").textContent = store.counts.mobile || 0;
  $("tabletCount").textContent = store.counts.tablet || 0;
  $("desktopCount").textContent = store.counts.desktop || 0;
  $("totalCount").textContent = (store.counts.mobile || 0) + (store.counts.tablet || 0) + (store.counts.desktop || 0);
  $("globalUnique").textContent = Object.keys(store.visitors).length;
  $("todayUnique").textContent = store.days[today]?.unique || 0;
})();