(function () {
  const progressBar = document.getElementById("reading-progress-bar");
  const article = document.getElementById("article");

  function updateProgress() {
    if (!progressBar || !article) return;
    const start = article.offsetTop;
    const distance = Math.max(1, article.offsetHeight - window.innerHeight);
    const ratio = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
    progressBar.style.width = `${ratio * 100}%`;
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  const toc = document.getElementById("article-toc");
  const tocToggle = document.getElementById("toc-toggle");
  const tocToggleLabel = tocToggle?.querySelector(".toc-toggle-label");
  const tocStoreKey = "harness-article-toc-open-v1";

  function setTocOpen(open, persist = true) {
    if (!toc || !tocToggle) return;
    toc.dataset.open = String(open);
    toc.setAttribute("aria-hidden", String(!open));
    toc.toggleAttribute("inert", !open);
    document.documentElement.classList.toggle("toc-is-open", open);
    tocToggle.setAttribute("aria-expanded", String(open));
    if (tocToggleLabel) tocToggleLabel.textContent = open ? "隐藏目录" : "显示目录";
    if (persist) {
      try { localStorage.setItem(tocStoreKey, String(open)); } catch (_) {}
    }
  }

  try {
    const savedTocState = localStorage.getItem(tocStoreKey);
    if (savedTocState !== null) setTocOpen(savedTocState === "true", false);
    else setTocOpen(window.matchMedia("(min-width: 1601px)").matches, false);
  } catch (_) {}

  tocToggle?.addEventListener("click", () => {
    setTocOpen(tocToggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && tocToggle?.getAttribute("aria-expanded") === "true") {
      setTocOpen(false);
      tocToggle.focus();
    }
  });

  const tocLinks = Array.from(document.querySelectorAll(".toc a"));
  tocLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 820px)").matches) setTocOpen(false);
    });
  });
  const sections = tocLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      tocLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-18% 0px -68%", threshold: [0, 0.15, 0.5] });
    sections.forEach((section) => observer.observe(section));
  }

  document.querySelectorAll("[data-copy-code]").forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.closest("[data-code]")?.querySelector("code")?.textContent || "";
      if (!code) return;
      const previous = button.textContent;
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "已复制";
        button.classList.add("is-copied");
        window.setTimeout(() => {
          button.textContent = previous;
          button.classList.remove("is-copied");
        }, 1600);
      } catch (_) {
        button.textContent = "复制失败";
        window.setTimeout(() => { button.textContent = previous; }, 1600);
      }
    });
  });

  const checklist = Array.from(document.querySelectorAll(".interactive-checklist input"));
  const count = document.getElementById("checklist-count");
  const meter = document.getElementById("checklist-bar");
  const reset = document.getElementById("checklist-reset");
  const storeKey = "harness-article-checklist-v1";

  function renderChecklist() {
    const completed = checklist.filter((item) => item.checked).length;
    if (count) count.textContent = `${completed} / ${checklist.length}`;
    if (meter) meter.style.width = `${checklist.length ? completed / checklist.length * 100 : 0}%`;
    try { localStorage.setItem(storeKey, JSON.stringify(checklist.map((item) => item.checked))); } catch (_) {}
  }

  try {
    const saved = JSON.parse(localStorage.getItem(storeKey) || "[]");
    checklist.forEach((item, index) => { item.checked = Boolean(saved[index]); });
  } catch (_) {}

  checklist.forEach((item) => item.addEventListener("change", renderChecklist));
  reset?.addEventListener("click", () => {
    checklist.forEach((item) => { item.checked = false; });
    renderChecklist();
  });
  renderChecklist();
})();
