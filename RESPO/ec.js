// EC: ERROR_CHECK · RESPO-MASTER

document.addEventListener("DOMContentLoaded", async () => {

  const params = new URLSearchParams(window.location.search);
  const err = params.get("error");

  const output = document.createElement("div");
  output.style.color = "#f00";
  output.style.fontFamily = "monospace";
  output.style.padding = "20px";

  if (!err) {
    output.innerText = "EC: Keine Fehler gemeldet.";
    document.body.appendChild(output);
    return;
  }

  // Fehlertext anzeigen
  output.innerText = `EC: Fehler erkannt → ${err}`;
  document.body.appendChild(output);

  // Fehler an RESPO-CUBE senden
  try {
    sessionStorage.setItem("RESPO_ERROR", err);
  } catch {}

  // Fehler an ERROR-ROUTER weiterleiten
  setTimeout(() => {
    window.location.href = "../error-router.item?src=ec&code=" + err;
  }, 1500);

});
