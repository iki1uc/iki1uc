document.addEventListener("DOMContentLoaded", () => {

  const links = document.querySelectorAll("a");

  links.forEach(link => {
    link.addEventListener("click", async (ev) => {
      ev.preventDefault();

      const url = link.getAttribute("href");

      try {
        const res = await fetch(url);

        if (!res.ok) {
          window.location.href = "./error.root.html?path=" + url;
        } else {
          window.location.href = url;
        }

      } catch (e) {
        window.location.href = "./error.root.html?path=" + url;
      }
    });
  });

});
