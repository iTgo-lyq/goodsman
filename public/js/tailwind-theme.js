const arcoTheme = () => document.body.getAttribute("arco-theme");

let systemTheme = "light";
const updateSystemTheme = (v = systemTheme) => {
  systemTheme = typeof v !== "boolean" ? v : v ? "dark" : "light";
  !["light", "dark"].includes(arcoTheme())
    ? document.documentElement.setAttribute("tw-theme", systemTheme)
    : document.documentElement.setAttribute("tw-theme", arcoTheme());
};

const mq = window.matchMedia("(prefers-color-scheme: dark)");
updateSystemTheme(mq.matches);
mq.onchange = (e) => updateSystemTheme(e.matches);

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(
    (mutation) =>
      mutation.type === "attributes" &&
      mutation.attributeName === "arco-theme" &&
      updateSystemTheme()
  );
});

observer.observe(document.body, { attributes: true });
