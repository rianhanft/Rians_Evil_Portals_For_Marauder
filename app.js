const REPO = "rianhanft/Rians_Evil_Portals_For_Marauder";
const API_URL = `https://api.github.com/repos/${REPO}/git/trees/main?recursive=1`;

const portalCountNode = document.getElementById("portalCount");
const categoryCountNode = document.getElementById("categoryCount");
const categoryGridNode = document.getElementById("categoryGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortOrder = document.getElementById("sortOrder");
const quickPreview = document.getElementById("quickPreview");
const finderStatus = document.getElementById("finderStatus");
const categoryTemplate = document.getElementById("categoryTemplate");
const filterButtons = document.querySelectorAll(".filter-btn");
const randomPortalBtn = document.getElementById("randomPortalBtn");

let entries = [];
let currentFilter = "all";
let selectedCategory = null;
let indexLoaded = false;

const isPortalEntry = (item) =>
  item.type === "blob" &&
  item.path.toLowerCase().endsWith(".html") &&
  item.path.split("/").pop().toLowerCase() !== "index.html";

const formatPortalName = (fileName) =>
  fileName.replace(/\.html$/i, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const getCategoryName = (path) => path.split("/")[0] || "Root";
const buildPortalUrl = (path) =>
  `https://github.com/${REPO}/blob/main/${path.split("/").map(encodeURIComponent).join("/")}`;
const buildCategoryUrl = (category) =>
  `https://github.com/${REPO}/tree/main/${encodeURIComponent(category)}`;

function getGroups() {
  const query = searchInput.value.trim().toLowerCase();
  const groups = new Map();
  entries.forEach((entry) => {
    const category = getCategoryName(entry.path);
    const name = category.toLowerCase();
    const file = entry.path.split("/").pop().toLowerCase();
    const matchesFilter = currentFilter === "all" ||
      (currentFilter === "airport" && /airport|airline/.test(name)) ||
      (currentFilter !== "airport" && name.includes(currentFilter));
    if (!matchesFilter || (categoryFilter.value && category !== categoryFilter.value) ||
        (query && !name.includes(query) && !file.includes(query))) return;
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category).push(entry);
  });
  return [...groups.entries()].sort(([a, aItems], [b, bItems]) => {
    if (sortOrder.value === "count") return bItems.length - aItems.length || a.localeCompare(b);
    return sortOrder.value === "desc" ? b.localeCompare(a) : a.localeCompare(b);
  });
}

function setFilter(filter) {
  currentFilter = filter;
  categoryFilter.value = "";
  render();
}

function renderPreview(category, items) {
  quickPreview.replaceChildren();
  const heading = document.createElement("h3");
  heading.id = "quickPreviewHeading";
  heading.textContent = category || "Choose a category";
  const description = document.createElement("p");
  description.textContent = category
    ? `${items.length} ${items.length === 1 ? "portal" : "portals"}${searchInput.value.trim() ? " matching your search" : " in this category"}.`
    : "Select Preview to see its portals here.";
  quickPreview.append(heading, description);
  if (!category) return;

  const list = document.createElement("ul");
  list.className = "portal-list";
  items.slice().sort((a, b) => a.path.localeCompare(b.path)).slice(0, 6).forEach((item) => {
    const li = document.createElement("li");
    li.className = "portal-item";
    const link = document.createElement("a");
    link.href = buildPortalUrl(item.path);
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = formatPortalName(item.path.split("/").pop());
    li.append(link);
    list.append(li);
  });
  const allLink = document.createElement("a");
  allLink.className = "secondary-btn view-category";
  allLink.href = buildCategoryUrl(category);
  allLink.target = "_blank";
  allLink.rel = "noreferrer";
  allLink.textContent = "View category on GitHub ↗";
  quickPreview.append(list, allLink);
}

function render() {
  filterButtons.forEach((button) => {
    const active = !categoryFilter.value && button.dataset.filter === currentFilter;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (!indexLoaded) return;
  const groups = getGroups();
  categoryGridNode.replaceChildren();
  if (!groups.length) {
    const message = document.createElement("p");
    message.className = "empty-message";
    message.textContent = "No matching portals found. Try a different search or filter.";
    categoryGridNode.append(message);
  }
  groups.forEach(([category, items]) => {
    const card = categoryTemplate.content.firstElementChild.cloneNode(true);
    card.querySelector(".category-icon").textContent = category[0].toUpperCase();
    card.querySelector(".category-name").textContent = category;
    card.querySelector(".category-count").textContent = `${items.length} ${items.length === 1 ? "portal" : "portals"}`;
    const preview = card.querySelector(".preview-btn");
    preview.setAttribute("aria-label", `Preview ${category}`);
    preview.addEventListener("click", () => {
      selectedCategory = category;
      render();
      const updatedCard = [...categoryGridNode.querySelectorAll(".category-card")]
        .find((item) => item.querySelector(".category-name").textContent === category);
      if (updatedCard) updatedCard.querySelector(".preview-btn").focus();
      if (window.matchMedia("(max-width: 760px)").matches) {
        quickPreview.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
    card.classList.toggle("selected", category === selectedCategory);
    categoryGridNode.append(card);
  });
  const selected = groups.find(([category]) => category === selectedCategory);
  renderPreview(selected ? selected[0] : null, selected ? selected[1] : []);
}

async function loadIndex() {
  indexLoaded = false;
  randomPortalBtn.disabled = true;
  categoryGridNode.textContent = "Loading portal index…";
  try {
    const response = await fetch(API_URL, { headers: { Accept: "application/vnd.github+json" } });
    if (!response.ok) throw new Error(`GitHub API failed: ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.tree) || data.truncated) throw new Error("GitHub returned an incomplete portal index");
    entries = data.tree.filter(isPortalEntry);
    const categories = [...new Set(entries.map((entry) => getCategoryName(entry.path)))].sort((a, b) => a.localeCompare(b));
    portalCountNode.textContent = entries.length.toLocaleString();
    categoryCountNode.textContent = categories.length.toLocaleString();
    categoryFilter.replaceChildren(new Option("More filters", ""));
    categories.forEach((category) => categoryFilter.add(new Option(category, category)));
    indexLoaded = true;
    randomPortalBtn.disabled = !entries.length;
    render();
  } catch (error) {
    portalCountNode.textContent = "Unavailable";
    categoryCountNode.textContent = "Unavailable";
    categoryGridNode.replaceChildren();
    const message = document.createElement("p");
    message.textContent = "The portal index could not be loaded.";
    const retry = document.createElement("button");
    retry.type = "button";
    retry.className = "secondary-btn";
    retry.textContent = "Try again";
    retry.addEventListener("click", loadIndex);
    categoryGridNode.append(message, retry);
    console.error(error);
  }
}

filterButtons.forEach((button) => button.addEventListener("click", () => setFilter(button.dataset.filter)));
categoryFilter.addEventListener("change", () => {
  currentFilter = "all";
  render();
});
sortOrder.addEventListener("change", render);
searchInput.addEventListener("input", render);
document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  render();
  document.getElementById("archiveHeading").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.getElementById("categoriesLink").addEventListener("click", () => {
  searchInput.value = "";
  setFilter("all");
});
document.getElementById("discoverLink").addEventListener("click", () => {
  searchInput.value = "";
  setFilter("all");
});
randomPortalBtn.addEventListener("click", () => {
  if (!entries.length) return;
  const randomEntry = entries[Math.floor(Math.random() * entries.length)];
  window.open(buildPortalUrl(randomEntry.path), "_blank", "noopener,noreferrer");
});

loadIndex();
