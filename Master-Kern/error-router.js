document.addEventListener("DOMContentLoaded", () => {

  const links = document.querySelectorAll("a");

  links.forEach(link => {
    link.addEventListener("click", async (ev) => {
      ev.preventDefault();

      const url = link.getAttribute("href");

      // MASTER-KERN: CACHE
      const CACHE = {
        load: 0,
        max: 360,
        add(x) {
          this.load += x;
          if (this.load > this.max) this.load = this.max;
        },
        status() {
          if (this.load < 120) return "STABIL";
          if (this.load < 360) return "HOCH";
          return "VOLL";
        }
      };

      // MASTER-KERN: ERROR-ROUTER
      const ERROR_ROUTER = (path, reason) => {
        const target = "./error.root.html?path=" + encodeURIComponent(path)
                      + "&reason=" + encodeURIComponent(reason)
                      + "&cache=" + CACHE.status();
        window.location.href = target;
      };

      try {
        const res = await fetch(url);

        // Cache wächst bei jedem Zugriff
        CACHE.add(42);

        if (!res.ok) {
          ERROR_ROUTER(url, "fetch-failed");
        } else {
          window.location.href = url;
        }

      } catch (e) {
        ERROR_ROUTER(url, "exception");
      }
    });
  });

});
