const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  themeIcon.textContent = theme === "dark" ? "Light" : "Dark";
}

setTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const projectRows = Array.from(document.querySelectorAll(".project-row"));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    projectRows.forEach((row) => {
      const categories = row.dataset.category.split(" ");
      row.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});

const canvas = document.querySelector("#hero-field");
const context = canvas?.getContext("2d");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const pointer = { x: 0.5, y: 0.5 };
let nodes = [];
let animationFrame = 0;

function cssVar(name) {
  return getComputedStyle(root).getPropertyValue(name).trim();
}

function resizeCanvas() {
  if (!canvas || !context) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * ratio);
  canvas.height = Math.floor(rect.height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  createNodes(rect.width, rect.height);
}

function createNodes(width, height) {
  const labels = ["MCP", "A股", "Agents", "Notes", "GitHub", "Tools", "CSS", "CLI", "Web"];
  const count = Math.max(22, Math.min(42, Math.floor(width / 34)));
  nodes = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.24,
    vy: (Math.random() - 0.5) * 0.24,
    radius: 2 + Math.random() * 3,
    label: labels[index % labels.length],
    labelEvery: index % 5 === 0
  }));
}

function draw() {
  if (!canvas || !context) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const ink = cssVar("--ink");
  const accent = cssVar("--accent");
  const warm = cssVar("--warm");
  const rule = cssVar("--rule");

  context.clearRect(0, 0, width, height);
  context.strokeStyle = rule;
  context.lineWidth = 1;

  nodes.forEach((node, index) => {
    for (let next = index + 1; next < nodes.length; next += 1) {
      const other = nodes[next];
      const dx = node.x - other.x;
      const dy = node.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 150) {
        context.globalAlpha = (1 - distance / 150) * 0.34;
        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo(other.x, other.y);
        context.stroke();
      }
    }
  });

  nodes.forEach((node, index) => {
    const pullX = (pointer.x - 0.5) * (index % 3) * 0.18;
    const pullY = (pointer.y - 0.5) * (index % 4) * 0.18;

    if (!reducedMotion) {
      node.x += node.vx + pullX;
      node.y += node.vy + pullY;
    }

    if (node.x < -20) node.x = width + 20;
    if (node.x > width + 20) node.x = -20;
    if (node.y < -20) node.y = height + 20;
    if (node.y > height + 20) node.y = -20;

    context.globalAlpha = 0.9;
    context.fillStyle = index % 4 === 0 ? warm : accent;
    context.beginPath();
    context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    context.fill();

    if (node.labelEvery && width > 700) {
      context.globalAlpha = 0.42;
      context.fillStyle = ink;
      context.font = "12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      context.fillText(node.label, node.x + 10, node.y - 8);
    }
  });

  context.globalAlpha = 1;
  animationFrame = window.requestAnimationFrame(draw);
}

if (canvas && context) {
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX / window.innerWidth;
    pointer.y = event.clientY / window.innerHeight;
  });

  resizeCanvas();
  draw();

  window.addEventListener("beforeunload", () => {
    window.cancelAnimationFrame(animationFrame);
  });
}
