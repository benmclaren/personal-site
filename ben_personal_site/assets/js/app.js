
console.log('its linked');

const hamburger = document.querySelector(".ham");
const mainContainerTag = document.querySelector(".home-container");

hamburger.addEventListener("click", function () {
  mainContainerTag.classList.toggle("open");
})
