
console.log('app.js is linked');



const hamburger = document.querySelector(".ham");
const mainContainerTag = document.querySelector(".home-container");

hamburger.addEventListener("click", function () {
  mainContainerTag.classList.toggle("open");
})


// function delay (URL) {
//   setTimeout( function() { window.location = URL }, 800 );
// }

const navItem = document.querySelectorAll(".nav-item");

navItem.forEach((link) => {
  link.addEventListener("click", function () {
    mainContainerTag.classList.toggle("open");
    hamburger.classList.toggle("active");
    console.log("triggers");
  })
})
