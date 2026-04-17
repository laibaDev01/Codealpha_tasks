const photos = [
  {
    id: "n1",
    title: "Misty Forest",
    category: "nature",
    photographer: "Unsplash",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "n2",
    title: "Snowy Peaks",
    category: "nature",
    photographer: "Unsplash",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "n3",
    title: "Ocean Horizon",
    category: "nature",
    photographer: "Unsplash",
    url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "c1",
    title: "Neon Night Drive",
    category: "cars",
    photographer: "Unsplash",
    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "c2",
    title: "Classic Muscle",
    category: "cars",
    photographer: "Unsplash",
    url: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "c3",
    title: "Track Ready",
    category: "cars",
    photographer: "Unsplash",
    url: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "t1",
    title: "City Escape",
    category: "travel",
    photographer: "Unsplash",
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "t2",
    title: "Desert Road",
    category: "travel",
    photographer: "Unsplash",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "t3",
    title: "Old Town Walk",
    category: "travel",
    photographer: "Unsplash",
    url: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?auto=format&fit=crop&w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "n4",
    title: "Golden Meadow",
    category: "nature",
    photographer: "Unsplash",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "c4",
    title: "Rainy Street Reflections",
    category: "cars",
    photographer: "Unsplash",
    url: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "t4",
    title: "Mountain Village",
    category: "travel",
    photographer: "Unsplash",
    url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=70",
  },
];

const els = {
  grid: document.getElementById("galleryGrid"),
  count: document.getElementById("countLabel"),
  filterBtns: Array.from(document.querySelectorAll("[data-filter]")),
  lightbox: document.getElementById("lightbox"),
  lightboxImg: document.getElementById("lightboxImg"),
  lightboxTitle: document.getElementById("lightboxTitle"),
  lightboxMeta: document.getElementById("lightboxMeta"),
  prevBtn: document.querySelector(".lightbox__prev"),
  nextBtn: document.querySelector(".lightbox__next"),
  closeTargets: Array.from(document.querySelectorAll("[data-close]")),
};

let activeFilter = "all";
let filtered = [...photos];
let currentIndex = 0;
let lastNavDir = 0; // -1 prev, +1 next
let isSwitching = false;

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function buildCard(photo, indexInFiltered) {
  const card = document.createElement("article");
  card.className = "card is-entering";
  card.dataset.category = photo.category;
  card.dataset.index = String(indexInFiltered);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.setAttribute("aria-label", `Open ${photo.title}`);

  const img = document.createElement("img");
  img.className = "thumb";
  img.loading = "lazy";
  img.alt = photo.title;
  img.src = photo.thumb;
  img.dataset.full = photo.url;

  const badge = document.createElement("div");
  badge.className = "badge";
  badge.textContent = titleCase(photo.category);

  const cap = document.createElement("div");
  cap.className = "caption";
  cap.innerHTML = `<div class="title">${escapeHtml(photo.title)}</div><div class="sub">Click to view</div>`;

  btn.appendChild(img);
  card.appendChild(btn);
  card.appendChild(badge);
  card.appendChild(cap);

  btn.addEventListener("click", () => openLightbox(indexInFiltered));

  requestAnimationFrame(() => card.classList.add("is-entering--active"));
  return card;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderGallery() {
  els.grid.innerHTML = "";
  filtered.forEach((p, idx) => els.grid.appendChild(buildCard(p, idx)));
  els.count.textContent = `${filtered.length} photo${filtered.length === 1 ? "" : "s"}`;
}

function setActiveFilter(filter) {
  activeFilter = filter;
  els.filterBtns.forEach((b) => b.classList.toggle("is-active", b.dataset.filter === filter));
}

function applyFilter(filter) {
  setActiveFilter(filter);

  const oldCards = Array.from(els.grid.children);
  oldCards.forEach((c) => c.classList.add("is-exiting"));

  window.setTimeout(() => {
    filtered = filter === "all" ? [...photos] : photos.filter((p) => p.category === filter);
    renderGallery();
  }, 180);
}

function openLightbox(index) {
  currentIndex = clampIndex(index);
  els.lightbox.classList.add("is-open");
  els.lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  updateLightbox({ animate: false, dir: 0 });
}

function closeLightbox() {
  els.lightbox.classList.remove("is-open");
  els.lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function clampIndex(i) {
  if (filtered.length === 0) return 0;
  const mod = ((i % filtered.length) + filtered.length) % filtered.length;
  return mod;
}

function updateLightbox({ animate, dir }) {
  const photo = filtered[currentIndex];
  if (!photo) return;

  els.lightboxTitle.textContent = photo.title;
  els.lightboxMeta.textContent = `${titleCase(photo.category)} • ${photo.photographer}`;

  const img = els.lightboxImg;

  if (!animate) {
    img.classList.remove("is-transitioning", "slide-left", "slide-right");
    img.alt = photo.title;
    img.src = photo.url;
    return;
  }

  if (isSwitching) return;
  isSwitching = true;

  img.classList.remove("slide-left", "slide-right");
  img.classList.add("is-transitioning");
  img.classList.add(dir < 0 ? "slide-right" : "slide-left");

  // Swap after fade out begins
  window.setTimeout(() => {
    img.alt = photo.title;
    img.src = photo.url;
  }, 90);

  // Finish transition
  window.setTimeout(() => {
    img.classList.remove("is-transitioning", "slide-left", "slide-right");
    isSwitching = false;
  }, 220);
}

function nav(dir) {
  if (filtered.length <= 1) return;
  lastNavDir = dir;
  currentIndex = clampIndex(currentIndex + dir);
  updateLightbox({ animate: true, dir });
}

// Events
els.filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
});

els.prevBtn.addEventListener("click", () => nav(-1));
els.nextBtn.addEventListener("click", () => nav(1));
els.closeTargets.forEach((t) => t.addEventListener("click", closeLightbox));

document.addEventListener("keydown", (e) => {
  const open = els.lightbox.classList.contains("is-open");
  if (!open) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") nav(-1);
  if (e.key === "ArrowRight") nav(1);
});

// Optional: click on image to go next (smooth)
els.lightboxImg.addEventListener("click", () => nav(1));

// Prevent dragging ghost image inside lightbox
els.lightboxImg.addEventListener("dragstart", (e) => e.preventDefault());

// Preload next/prev for smoother transitions
els.lightboxImg.addEventListener("load", () => {
  if (filtered.length <= 1) return;
  const next = filtered[clampIndex(currentIndex + 1)]?.url;
  const prev = filtered[clampIndex(currentIndex - 1)]?.url;
  [next, prev].filter(Boolean).forEach((src) => {
    const i = new Image();
    i.src = src;
  });
});

// Initial render
renderGallery();

