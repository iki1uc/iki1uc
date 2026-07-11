document.addEventListener("DOMContentLoaded", async () => {

  const md = `
# SEEu – ROOT-SCAN
Orbit: ok
Identity: ok
LAGE: aktiv
System: ok
`;

  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "SEEu.md";
  a.click();
});
