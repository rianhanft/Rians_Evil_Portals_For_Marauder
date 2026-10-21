const REPO = "rianhanft/Rians_Evil_Portals_For_Marauder";
const API_URL = `https://api.github.com/repos/${REPO}/git/trees/main?recursive=1`;

const portalCountNode = document.getElementById("portalCount");
const categoryCountNode = document.getElementById("categoryCount");
const categoryGridNode = document.getElementById("categoryGrid");
const searchInput = document.getElementById("searchInput");
const randomPortalBtn = document.getElementById("randomPortalBtn");
const categoryTemplate = document.getElementById("categoryTemplate");

const isPortalEntry = (item) => {
  if (item.type !== "blob") return false;
  if (!item.path.toLowerCase().endsWith(".html")) return false;
  return item.path.split("/").pop().toLowerCase() !== "index.html";
};

const formatPortalName = (fileName) =>
  fileName
    .replace(/\.html$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const buildPortalUrl = (path) => `https://github.com/${REPO}/blob/main/${encodeURIComponent(path)}`;

const getCategoryName = (itemPath) => {
  const category = itemPath.split("/")[0];
  return category || "Root";
};

const renderStats = (categoryCount, portalCount) => {
  portalCountNode.textContent = portalCount.toLocaleString();
  categoryCountNode.textContent = categoryCount.toLocaleString();
};

const renderCategories = (entries) => {
  const groups = new Map();

  entries.forEach((entry) => {
    const category = getCategoryName(entry.path);
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category).push(entry);
  });

  const sortedGroups = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));

  categoryGridNode.innerHTML = "";

  if (!sortedGroups.length) {
    categoryGridNode.innerHTML = '<div class="category-card"><p style="margin:0;color:var(--muted);">No matching portals found.</p></div>';
    return;
  }

  sortedGroups.forEach(([category, items]) => {
    const card = categoryTemplate.content.firstElementChild.cloneNode(true);
    const nameNode = card.querySelector(".category-name");
    const countNode = card.querySelector(".category-count");
    const listNode = card.querySelector(".portal-list");

    nameNode.textContent = category;
    countNode.textContent = String(items.length);

    const visibleItems = items
      .slice()
      .sort((a, b) => a.path.localeCompare(b.path))
      .slice(0, 6);

    visibleItems.forEach((item) => {
      const fileName = item.path.split("/").pop();
      const li = document.createElement("li");
      li.className = "portal-item";

      const link = document.createElement("a");
      link.href = buildPortalUrl(item.path);
      link.target = "_blank";
      link.rel = "noreferrer";
      link.innerHTML = `
        <span class="portal-name">${formatPortalName(fileName)}</span>
        <span class="portal-meta">Open</span>
      `;

      li.appendChild(link);
      listNode.appendChild(li);
    });

    if (items.length > visibleItems.length) {
      const li = document.createElement("li");
      li.className = "portal-item";

      const link = document.createElement("a");
      link.href = `https://github.com/${REPO}/tree/main/${encodeURIComponent(category)}`;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.innerHTML = `
        <span class="portal-name">View all ${items.length}</span>
        <span class="portal-meta">Repo</span>
      `;

      li.appendChild(link);
      listNode.appendChild(li);
    }

    categoryGridNode.appendChild(card);
  });
};

const filterEntries = (entries, query = "") => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return entries;

  return entries.filter((entry) => {
    const category = getCategoryName(entry.path).toLowerCase();
    const fileName = entry.path.split("/").pop().toLowerCase();
    return category.includes(normalized) || fileName.includes(normalized);
  });
};

async function loadIndex() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "RiansEvilPortalsSite",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API failed: ${response.status}`);
    }

    const data = await response.json();
    const htmlEntries = (data.tree || []).filter(isPortalEntry);

    const uniqueCategories = new Set(htmlEntries.map((entry) => getCategoryName(entry.path)));
    renderStats(uniqueCategories.size, htmlEntries.length);
    renderCategories(filterEntries(htmlEntries, searchInput.value));
  } catch (error) {
    portalCountNode.textContent = "Unavailable";
    categoryCountNode.textContent = "Unavailable";
    categoryGridNode.innerHTML = '<div class="category-card"><p style="margin:0;color:var(--muted);">The portal index could not be loaded. Refresh and try again.</p></div>';
    console.error(error);
  }
}

searchInput.addEventListener("input", async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "RiansEvilPortalsSite",
      },
    });
    const data = await response.json();
    const htmlEntries = (data.tree || []).filter(isPortalEntry);
    renderCategories(filterEntries(htmlEntries, searchInput.value));
  } catch (error) {
    console.error(error);
  }
});

randomPortalBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "RiansEvilPortalsSite",
      },
    });
    const data = await response.json();
    const htmlEntries = (data.tree || []).filter(isPortalEntry);

    if (!htmlEntries.length) return;

    const randomEntry = htmlEntries[Math.floor(Math.random() * htmlEntries.length)];
    window.open(buildPortalUrl(randomEntry.path), "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error(error);
  }
});

loadIndex();
