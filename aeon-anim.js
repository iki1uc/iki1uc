// aeon-anim.js
export function animateAEON() {
    const box = document.getElementById("aeon-box");

    let pulse = 0;
    setInterval(() => {
        pulse++;
        box.style.boxShadow = `0 0 ${pulse % 20}px #ff00ff`;
    }, 120);
}
