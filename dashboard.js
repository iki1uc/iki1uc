// dashboard.js
export function initDashboard() {
    const boxes = document.querySelectorAll(".dash-box");

    boxes.forEach(box => {
        box.addEventListener("click", () => {
            box.classList.toggle("active");
        });

        box.addEventListener("mouseenter", () => {
            box.style.transform = "scale(1.05)";
        });

        box.addEventListener("mouseleave", () => {
            box.style.transform = "scale(1)";
        });
    });
}
