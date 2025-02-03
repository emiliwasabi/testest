console.log("OK");

document.addEventListener("DOMContentLoaded", function () {
  // ---LIENS---

  document.getElementById("header-cross").addEventListener("click", (event) => {
    const cartel = activeCarousel?.querySelector(".project-cartel");

    if (cartel && cartel.classList.contains("visible")) {
      event.preventDefault();
      cartel.classList.remove("visible");
      const carouselWrapper = document.querySelector(".carousel-wrapper");
      carouselWrapper.style.overflow = "scroll";
      updateProjectTitle();

      const buttonPrev = activeCarousel.querySelector(".button-prev");
      const buttonNext = activeCarousel.querySelector(".button-next");
      const slidesContainer = activeCarousel.querySelector(".slides-container");
      const project = document.querySelector(".project");
      const projectText = document.querySelector(".project-text");

      buttonPrev.style.pointerEvents = "auto";
      buttonNext.style.pointerEvents = "auto";
      slidesContainer.classList.remove("blur");
      project.style.mixBlendMode = "difference";
      projectText.classList.toggle("click");
      projectText.style.pointerEvents = "all";
    } else {
      window.location.href = "/index.html?showContainer=true";
    }
  });

  // ---TITLE---
  const carousels = document.querySelectorAll(".carousel");
  const projectTitle = document.getElementById("project-title");
  const projectType = document.getElementById("project-type");
  const projectText = document.querySelector(".project-text");
  const carouselWrapper = document.querySelector(".carousel-wrapper");
  let activeCarousel = null;

  function updateProjectTitle() {
    carousels.forEach((carousel) => {
      const rect = carousel.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        const newTitle = carousel.getAttribute("data-title");
        const newType = carousel.getAttribute("data-type");
        projectTitle.querySelector("h1").innerHTML = newTitle;
        projectType.querySelector("h1").innerHTML = newType;

        activeCarousel = carousel;

        carousels.forEach((otherCarousel) => {
          if (otherCarousel !== activeCarousel) {
            otherCarousel.querySelectorAll("video").forEach((video) => {
              video.pause();
              video.muted = true;
            });
          }
        });
      }
    });
  }

  carouselWrapper.addEventListener("scroll", updateProjectTitle);
  updateProjectTitle();

  // ---CARTELS---
  projectText.addEventListener("click", () => {
    if (activeCarousel) {
      const project = document.querySelector(".project");
      const projectText = document.querySelector(".project-text");
      const cartel = activeCarousel.querySelector(".project-cartel");
      const buttonPrev = activeCarousel.querySelector(".button-prev");
      const buttonNext = activeCarousel.querySelector(".button-next");
      const slidesContainer = activeCarousel.querySelector(".slides-container");

      cartel.classList.toggle("visible");

      if (cartel.classList.contains("visible")) {
        document.querySelector(".carousel-wrapper").style.overflow = "hidden";
        buttonPrev.style.pointerEvents = "none";
        buttonNext.style.pointerEvents = "none";
        slidesContainer.classList.toggle("blur");
        project.style.mixBlendMode = "normal";
        projectText.classList.toggle("click");
        projectText.style.pointerEvents = "none";
        document.body.style.overflow = "hidden";

        carousels.forEach((carousel) => {
          if (carousel !== activeCarousel) {
            const otherCartel = carousel.querySelector(".project-cartel");
            otherCartel.classList.remove("visible");

            const otherSlidesContainer =
              carousel.querySelector(".slides-container");
            otherSlidesContainer.classList.remove("blur");
          }
        });
      } else {
        const carouselWrapper = document.querySelector(".carousel-wrapper");
        carouselWrapper.style.overflow = "scroll";
        updateProjectTitle();

        buttonPrev.style.pointerEvents = "auto";
        buttonNext.style.pointerEvents = "auto";
        slidesContainer.classList.remove("blur");
        project.style.mixBlendMode = "difference";
        projectText.classList.toggle("click");
        projectText.style.pointerEvents = "all";
      }
    }
  });

  // ---CAROUSEL---
  carousels.forEach((carousel) => {
    const slidesContainer = carousel.querySelector(".slides-container");
    const slides = Array.from(slidesContainer.querySelectorAll(".slide"));

    let currentSlideIndex = 0;

    const updateCarousel = () => {
      const imageWidth = slides[0].offsetWidth;
      slidesContainer.style.transition = "transform 300ms ease-out";
      slidesContainer.style.transform = `translateX(-${
        currentSlideIndex * imageWidth
      }px)`;

      slides.forEach((slide, index) => {
        const video = slide.querySelector("video");
        if (video) {
          if (index === currentSlideIndex) {
            video.play();
            video.muted = false;
          } else {
            video.pause();
            video.muted = true;
          }
        }
      });
    };

    carousel.querySelector(".button-prev").addEventListener("click", () => {
      console.log("Click-prev");
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
      } else {
        currentSlideIndex = slides.length - 1;
      }
      updateCarousel();
    });

    carousel.querySelector(".button-next").addEventListener("click", () => {
      console.log("Click-next");
      if (currentSlideIndex < slides.length - 1) {
        currentSlideIndex++;
      } else {
        currentSlideIndex = 0;
      }
      updateCarousel();
    });

    updateCarousel();
  });
});
