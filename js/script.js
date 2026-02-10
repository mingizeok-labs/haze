document.querySelectorAll(".icon-link").forEach(el => {
  const key = el.dataset.link;
  const url = window.ENV[key];

  if (url) {
    el.addEventListener("click", () => {
      window.open(url, "_blank");
    });
  }
});
