console.log("OK");

document.addEventListener("DOMContentLoaded", function () {
  // ---LIENS---
  document.getElementById("header-info-name").addEventListener("click", () => {
    window.location.href = "/index.html";
  });
  document.getElementById("mail").addEventListener("click", () => {
    window.open("mailto:mulleremilie8@gmail.com", "_blank");
  });

  document.getElementById("insta").addEventListener("click", () => {
    window.open("https://www.instagram.com/emiliwasabi", "_blank");
  });

  // ---INFOS---
  const headerMain = document.getElementById("header-main");
  const headerContainerInfo = document.getElementById("header-container-info");
  const containerInfo = document.getElementById("container-info");
  const container1 = document.getElementById("container-1");

  document.getElementById("header-info-infos").addEventListener("click", () => {
    container1.classList.toggle("blur");
    headerMain.classList.toggle("visible");
    headerContainerInfo.classList.toggle("visible");
    containerInfo.classList.toggle("visible");
  });

  containerInfo.addEventListener("click", () => {
    container1.classList.toggle("blur");
    headerMain.classList.toggle("visible");
    headerContainerInfo.classList.toggle("visible");
    containerInfo.classList.toggle("visible");
  });

  // ---INDEX---
  const containerIndex = document.getElementById("container-index");
  document.getElementById("header-info-index").addEventListener("click", () => {
    containerIndex.classList.toggle("visible");
    headerMain.classList.toggle("visible");
    container1.classList.toggle("blur");
  });

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("showContainer") === "true") {
    containerIndex.classList.toggle("visible");
    headerMain.classList.toggle("visible");
    container1.classList.toggle("blur");
  }

  containerIndex.addEventListener("click", () => {
    containerIndex.classList.toggle("visible");
    headerMain.classList.toggle("visible");
    container1.classList.toggle("blur");
  });

  const indexElements = document.querySelectorAll(".index");
  const indexImg = document.querySelectorAll(".index-img");

  if (window.innerWidth >= 768) {
    indexElements.forEach((element, index) => {
      element.addEventListener("mouseenter", () => {
        // console.log("hello");
        indexImg[index].classList.toggle("visible");
      });
      element.addEventListener("mouseleave", () => {
        indexImg[index].classList.toggle("visible");
      });
    });
  } else {
    indexElements.forEach((element, index) => {
      element.addEventListener("click", () => {
        // console.log("hello");
        indexImg[index].classList.toggle("visible");
      });
    });
  }

  const indexRows = document.querySelectorAll(".index");

  indexRows.forEach((row) => {
    row.addEventListener("click", () => {
      const id = row.id; // Ex: "index-1"
      window.location.href = `/pages/projects.html#${id}`; // Redirection avec l'ancre
    });
  });

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Récupère la hauteur spécifiée dans l'URL
  const scrollToHeight = getQueryParam("scrollTo");

  if (scrollToHeight) {
    // Fait défiler à la hauteur spécifiée (avec un défilement fluide)
    window.scrollTo({
      top: parseInt(scrollToHeight, 10), // Convertit le paramètre en nombre
      behavior: "smooth", // Défilement fluide
    });
  }
  // ---DIAPOS---
  const diapos = document.querySelectorAll(".diapo");
  const containerDiapo = document.getElementById("container-1");

  let intervalID = null;
  let isPlaying = false; // Variable d'état pour savoir si le diaporama est actif

  // Fonction pour afficher une diapo aléatoire
  const showRandomDiapo = () => {
    diapos.forEach((diapo) => diapo.classList.remove("visible"));
    const randomIndex = Math.floor(Math.random() * diapos.length);
    const randomDiapo = diapos[randomIndex];
    randomDiapo.classList.add("visible");
  };

  // Fonction pour démarrer la randomisation
  const startRandomization = () => {
    if (!intervalID) {
      intervalID = setInterval(showRandomDiapo, 1300);
      isPlaying = true;
    }
  };

  // Fonction pour arrêter la randomisation
  const stopRandomization = () => {
    clearInterval(intervalID);
    intervalID = null;
    isPlaying = false;
  };

  // Fonction pour basculer entre démarrage et arrêt
  const toggleRandomization = () => {
    if (isPlaying) {
      stopRandomization();
    } else {
      startRandomization();
    }
  };

  // Démarrer la randomisation au chargement
  startRandomization();

  // Ajouter un écouteur de clic pour basculer
  containerDiapo.addEventListener("click", () => {
    toggleRandomization();
    headerMain.classList.toggle("visible");
  });
});
