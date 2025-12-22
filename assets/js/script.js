// Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const navCollapse = document.getElementById("navbarNav");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  navCollapse.classList.toggle("show");
});
