document.addEventListener("DOMContentLoaded", async () => {

  try {
    const res = await fetch("./Master-Kern/system-check.item");

    if (!res.ok) {
      window.location.href = "./error.root.html?path=system-check.item";
      return;
    }

    const text = await res.text();

    // Minimaler RAW-Parser
    const status = {
      pipeline3: text.includes("drift.ok"),
      pipeline6: text.includes("fuse.ok"),
      root: text.includes("root.state: wait"),
      result: text.includes("real-bildend")
    };

    // Fehlererkennung
    if (!status.pipeline3 || !status.pipeline6 || !status.root) {
      window.location.href = "./error.root.html?path=system-check.item";
      return;
    }

    // ROOT ist real-bildend
    console.log("SYSTEM-CHECK: OK");

  } catch (e) {
    window.location.href = "./error.root.html?path=system-check.item";
  }

});
