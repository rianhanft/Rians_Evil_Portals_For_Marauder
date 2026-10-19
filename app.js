const GITHUB_REPO = "rianhanft/Rians_Evil_Portals_For_Marauder";
const treeUrl = `https://api.github.com/repos/${GITHUB_REPO}/git/trees/main?recursive=1`;

const statsNode = document.getElementById("stats");
const categoriesNode = document.getElementById("categories");
const searchInput = document.getElementById("searchInput");
const randomPortalBtn = document.getElementById("randomPortalBtn");
const categoryTemplate = document.getElementById("categoryTemplate");

const formatPortalName = (fileName) =>
  fileName
    .replace(/\.html$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const renderStats = (totalCategories, totalPortals) => {
  statsNode.innerHTML = `
    <div class="stat">
      <span class="stat-label">Categories</span>
      <span class="stat-value">${totalCategories}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Portal files</span>
      <span class="stat-value">${totalPortals}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Source repo</span>
      <span class="stat-value">GitHub</span>
    </div>
  `;
};

const buildPortalUrl = (path) => `https://github.com/${GITHUB_REPO}/blob/main/${encodeURIComponent(path)}`;

const buildRawUrl = (path) => `https://raw.githubusercontent.com/${GITHUB_REPO}/main/${path}`;

const getCategoryLabel = (path) => {
  const folder = path.split("/")[0];
  return folder || "Root";
};

const renderCategories = (entries) => {
  const groups = new Map();

  entries.forEach((entry) => {
    const category = getCategoryLabel(entry.path);
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category).push(entry);
  });

  const sortedGroups = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));

  if (!sortedGroups.length) {
    categoriesNode.innerHTML = '<div class="empty-state">No portal files matched your search.</div>';
    return;
  }

  categoriesNode.innerHTML = "";

  sortedGroups.forEach(([category, items]) => {
    const card = categoryTemplate.content.firstElementChild.cloneNode(true);
    const title = card.querySelector(".category-title");
    const chip = card.querySelector(".chip");
    const list = card.querySelector(".portal-list");

    title.textContent = category;
    chip.textContent = String(items.length);

    const visibleItems = items
      .slice()
      .sort((a, b) => a.path.localeCompare(b.path))
      .slice(0, 8);

    visibleItems.forEach((item) => {
      const li = document.createElement("li");
      li.className = "portal-item";

      const fileName = item.path.split("/").pop();
      const itemName = formatPortalName(fileName);
      const link = document.createElement("a");
      link.href = buildPortalUrl(item.path);
      link.target = "_blank";
      link.rel = "noreferrer";
      link.innerHTML = `
        <span class="portal-name">${itemName}</span>
        <span class="portal-meta">Open</span>
      `;
      li.appendChild(link);
      list.appendChild(li);
    });

    if (items.length > visibleItems.length) {
      const li = document.createElement("li");
      li.className = "portal-item";
      const more = document.createElement("a");
      more.href = `https://github.com/${GITHUB_REPO}/tree/main/${encodeURIComponent(category)}`;
      more.target = "_blank";
      more.rel = "noreferrer";
      more.innerHTML = `
        <span class="portal-name">View all ${items.length} entries</span>
        <span class="portal-meta">Repo</span>
      `;
      li.appendChild(more);
      list.appendChild(li);
    }

    categoriesNode.appendChild(card);
  });
};

const filterEntries = (entries, query = "") => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return entries;

  return entries.filter((entry) => {
    const folder = entry.path.split("/")[0].toLowerCase();
    const file = entry.path.split("/").pop().toLowerCase();
    return folder.includes(normalized) || file.includes(normalized);
  });
};

const loadPortalIndex = async () => {
  try {
    const response = await fetch(treeUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "GitHubPages-PortalArchive",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status}`);
    }

    const data = await response.json();
    const htmlEntries = (data.tree || []).filter(
      (item) => item.type === "blob" && item.path.toLowerCase().endsWith(".html")
    );

    const allCategories = new Set(htmlEntries.map((entry) => getCategoryLabel(entry.path)));
    renderStats(allCategories.size, htmlEntries.length);
    renderCategories(filterEntries(htmlEntries, searchInput.value));
  } catch (error) {
    statsNode.innerHTML = `
      <div class="stat">
        <span class="stat-label">Status</span>
        <span class="stat-value">Error</span>
      </div>
    `;
    categoriesNode.innerHTML = `
      <div class="empty-state">
        Unable to load the repository index. Please refresh or check the GitHub API response.
      </div>
    `;
    console.error(error);
  }
};

searchInput.addEventListener("input", async () => {
  try {
    const response = await fetch(treeUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "GitHubPages-PortalArchive",
      },
    });
    const data = await response.json();
    const htmlEntries = (data.tree || []).filter(
      (item) => item.type === "blob" && item.path.toLowerCase().endsWith(".html")
    );
    renderCategories(filterEntries(htmlEntries, searchInput.value));
  } catch (error) {
    console.error(error);
  }
});

randomPortalBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(treeUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "GitHubPages-PortalArchive",
      },
    });

    if (!response.ok) throw new Error("Unable to load random portal");

    const data = await response.json();
    const htmlEntries = (data.tree || []).filter(
      (item) => item.type === "blob" && item.path.toLowerCase().endsWith(".html")
    );

    if (!htmlEntries.length) return;
    const random = htmlEntries[Math.floor(Math.random() * htmlEntries.length)];
    window.open(buildPortalUrl(random.path), "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error(error);
  }
});

loadPortalIndex();
