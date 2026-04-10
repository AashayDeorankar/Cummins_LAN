(function () {
  var closeReadInputs = document.querySelectorAll("input.read[id^='close']");
  var readMoreLabels = document.querySelectorAll("label[for^='read']");
  var marsInput = document.getElementById("mars");
  var earthInput = document.getElementById("earth");
  var marsPlanet = document.getElementById("marsPlanet");
  var earthMoon = document.getElementById("earthMoon");

  function closeAllReadPanels() {
    closeReadInputs.forEach(function (input) {
      input.checked = true;
    });
  }

  function openReadPanel(readInputId) {
    var targetInput = document.getElementById(readInputId);
    if (targetInput) {
      targetInput.checked = true;
    }
  }

  function openMoonPage() {
    window.location.href = "moon.html";
  }

  function openMarsPage() {
    // If Mars is not selected yet, select it first so the UI transition still feels intentional.
    if (marsInput && !marsInput.checked) {
      marsInput.checked = true;
      setTimeout(function () {
        window.location.href = "mars.html";
      }, 260);
      return;
    }

    window.location.href = "mars.html";
  }

  function ensureEarthThenOpenMoon() {
    if (!earthInput.checked) {
      earthInput.checked = true;
      setTimeout(openMoonPage, 360);
      return;
    }
    openMoonPage();
  }

  if (marsPlanet) {
    marsPlanet.addEventListener("click", openMarsPage);

    marsPlanet.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openMarsPage();
      }
    });
  }

  closeAllReadPanels();

  readMoreLabels.forEach(function (label) {
    label.addEventListener("click", function (event) {
      var targetId = label.getAttribute("for");
      if (!targetId) {
        return;
      }

      // Keep read actions local so parent planet click handlers do not hijack navigation.
      event.preventDefault();
      event.stopPropagation();
      openReadPanel(targetId);
    });
  });

  document.querySelectorAll("a[href='mars.html']").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openMarsPage();
    });
  });

  if (earthInput && earthMoon) {
    earthMoon.addEventListener("click", function (event) {
      event.preventDefault();
      ensureEarthThenOpenMoon();
    });

    earthMoon.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        ensureEarthThenOpenMoon();
      }
    });
  }
})();
