

function init() {
  document.addEventListener("DOMContentLoaded", () => {
      run();
  });
};


(function() {
  const swup = new Swup();
})();


// run once
init();

// this event runs for every page view after initial load
// swup.on('contentReplaced', init);


console.log("swup.js is linked");
