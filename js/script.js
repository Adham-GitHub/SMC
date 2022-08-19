window.addEventListener("DOMContentLoaded", () => {
  // PAGE ANIMATION //////////////////////////////////////////////////////////////
  let earthPositions;
  let activePage = 0;
  let scrollWheel = true;
  const pageDotElasticWidth = 36;
  const pageDotPostions = [];
  const earthWrapper = document.getElementById("earth-wrapper").style;
  const pageControls = document.querySelectorAll(".page-control");
  const earthContainer = document.getElementById("earth-container").style;
  const controlSVGs = document.querySelectorAll(".control-svg");
  const earthBox = document.getElementById("earth-box").style;
  const pageDot = document.getElementById("page-dot").style;
  const pageDotWidthDiffrenet = pageDotElasticWidth - pageDot.width;
  const pages = document.querySelectorAll(".page");

  const setEarthPositions = () => {
    const screen = document.body.offsetWidth;

    earthPositions = [
      // PAGE 1
      {
        rotate: "",
        height: "",
        width: "",
        right: "",
        bottom: "",
      },
      // PAGE 2
      {
        rotate: "",
        height: "96vw",
        width: "96vw",
        right: "",
        bottom: "-10vw",
      },
      // PAGE 3
      {
        rotate: "20deg",
        height: "90vh",
        width: "90vh",
        right: "-5vw",
        bottom: "",
      },
      // PAGE 4
      {
        rotate: "0",
        width: screen > 1100 ? "110vw" : "110vh",
        height: screen > 1100 ? "110vw" : "110vh",
        right: "",
        bottom: screen > 1100 ? "60%" : "53%",
      },
      // PAGE 5
      {
        rotate: "",
        height: "",
        width: "",
        right: "",
        bottom: "",
      },
      // PAGE 6
      {
        rotate: "125deg",
        height: "75vw",
        width: "75vw",
        right: "100%",
        bottom: "0",
      },
      // PAGE 7
      {
        rotate: "",
        height: "96vw",
        width: "96vw",
        right: "",
        bottom: screen > 1100 ? "125vh" : "100vh",
      },
    ];

    setEarthPosition(earthPositions[activePage]);
  };

  const setEarthPosition = (position) => {
    earthWrapper.transform = position.rotate && `rotate(${position.rotate})`;
    earthBox.height = position.height;
    earthBox.width = position.width;
    earthContainer.bottom = position.bottom;
    earthContainer.right = position.right;
  };

  const setControlSVGCircle = (state) => {
    controlSVGs[activePage].classList.remove("active");
    controlSVGs[state].classList.add("active");
  };

  const setDotPosition = (state) => {
    if (state < activePage) {
      pageDot.left = pageDotPostions[activePage] - pageDotWidthDiffrenet + "px";
      pageDot.width = pageDotElasticWidth + "px";

      setTimeout(() => {
        pageDot.left = pageDotPostions[state] + "px";
        pageDot.width = "";
      }, 350);
    }

    if (state > activePage) {
      pageDot.width = pageDotElasticWidth + "px";

      setTimeout(() => {
        pageDot.left = pageDotPostions[state] + "px";
        pageDot.width = "";
      }, 350);
    }
  };

  const setPage = (state) => {
    const currentPage = activePage;

    pages[currentPage].classList.remove("active");

    setTimeout(() => {
      pages[currentPage].classList.remove("render");
      pages[state].classList.add("render");

      setTimeout(() => {
        pages[state].classList.add("active");
      }, 50);
    }, 400);
  };

  const goToPage = (state) => {
    if (state !== activePage) {
      setEarthPosition(earthPositions[state]);
      setControlSVGCircle(state);
      setDotPosition(state);
      setPage(state);
      activePage = state;
    }
  };

  for (let i = 0; i < pageControls.length; i++) {
    pageDotPostions.push(
      pageControls[i].offsetLeft + pageControls[0].offsetWidth * 0.4
    );

    pageControls[i].addEventListener("click", () => {
      goToPage(i);
    });
  }

  setEarthPositions();

  window.addEventListener("wheel", (e) => {
    if ([...e.target.classList].includes("scrollable")) {
      return;
    }

    if (scrollWheel) {
      let nextState;

      if (e.deltaY < 0 && activePage > 0) nextState = activePage - 1;

      if (e.deltaY > 0 && activePage < pageControls.length - 1)
        nextState = activePage + 1;

      if (nextState !== undefined) goToPage(nextState);

      scrollWheel = false;

      setTimeout(() => {
        scrollWheel = true;
      }, 850);
    }
  });

  window.matchMedia("(max-width: 1100px)").addEventListener("change", (e) => {
    e && setEarthPositions();
  });

  window.matchMedia("(max-width: 768px)").addEventListener("change", (e) => {
    if (e) {
      swiper2.destroy();
      swiper2 = swiper2Creator();

      swiper3.destroy();
      swiper3 = swiper3Creator();

      swiper4.destroy();
      swiper4 = swiper4Creator();
    }
  });

  // SWIPERS ///////////////////////////////////////////////////////////////////
  new Swiper("#page-1", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    pagination: {
      el: "#swiper-pagination-1",
      clickable: true,
    },
    speed: 1500,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
  });

  const swiper2Creator = () => {
    if (document.body.offsetWidth > 768) {
      return new Swiper("#page-2", {
        slidesPerView: 2,
        grid: {
          rows: 2,
        },
      });
    }

    return new Swiper("#page-2", {
      slidesPerView: 1,
      grabCursor: true,
      grid: {
        rows: 2,
      },
      pagination: {
        el: "#swiper-pagination-2",
        clickable: true,
      },
      speed: 1000,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
    });
  };

  let swiper2 = swiper2Creator();

  const swiper3Creator = () => {
    if (document.body.offsetWidth > 768) {
      return new Swiper("#page-3", {
        slidesPerView: 4,
        spaceBetween: 25,
      });
    }

    return new Swiper("#page-3", {
      slidesPerView: 2,
      spaceBetween: 15,
      grabCursor: true,
      speed: 1000,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
    });
  };

  let swiper3 = swiper3Creator();

  const swiper4Creator = () => {
    if (document.body.offsetWidth > 768) {
      return new Swiper("#page-4", {
        slidesPerView: 2,
        spaceBetween: 50,
      });
    }

    return new Swiper("#page-4", {
      slidesPerView: 1,
      spaceBetween: 50,
      grabCursor: true,
      pagination: {
        el: "#swiper-pagination-4",
        clickable: true,
      },
      speed: 1000,
      autoplay: {
        delay: 3500,
      },
    });
  };

  let swiper4 = swiper4Creator();

  new Swiper("#page-5", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    pagination: {
      el: "#swiper-pagination-5",
      clickable: true,
    },
    speed: 1000,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      600: {
        slidesPerView: 1,
      },
      930: {
        slidesPerView: 2,
      },
      1300: {
        slidesPerView: 3,
      },
    },
  });

  new Swiper("#page-6", {
    slidesPerView: 1,
    grabCursor: true,
    pagination: {
      el: "#swiper-pagination-6",
      clickable: true,
    },
    speed: 1000,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      600: {
        slidesPerView: 1,
      },
      930: {
        slidesPerView: 2,
      },
      1300: {
        slidesPerView: 3,
      },
    },
  });

  new Swiper("#page-7", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    speed: 1000,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      600: {
        slidesPerView: 1,
      },
      930: {
        slidesPerView: 2,
      },
      1300: {
        slidesPerView: 3,
      },
    },
  });

  // ACCORDIONS ///////////////////////////////////////////////////////////////////
  const tabs = document.getElementsByClassName("tab");
  const accordionWrappers =
    document.getElementsByClassName("accordion-wrapper");
  const accordionTitles = document.getElementsByClassName("accordion-title");
  let activeTab = 0;

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", () => {
      tabs[activeTab].classList.remove("active");
      tabs[i].classList.add("active");
      accordionWrappers[activeTab].classList.remove("active");
      accordionWrappers[i].classList.add("active");
      activeTab = i;
    });
  }

  for (const accordionTitle of accordionTitles) {
    accordionTitle.addEventListener("click", () => {
      accordionTitle
        .closest(".accordion-wrapper")
        .querySelector(".active")
        .classList.remove("active");
      accordionTitle.closest(".accordion").classList.add("active");
    });
  }

  // FORM ///////////////////////////////////////////////////////////////////
  const selectHead = document.getElementById("selectHead");
  const selectBody = selectHead.nextElementSibling;

  const selectOpenCloser = () => {
    if (selectBody.style.height) {
      selectBody.style.height = "";
      selectHead.previousElementSibling.blur();
    } else {
      selectBody.style.height = selectBody.scrollHeight + "px";
      selectHead.previousElementSibling.focus();
    }
  };

  selectHead.addEventListener("click", selectOpenCloser);
  selectBody.addEventListener("click", (e) => {
    e.preventDefault();
    selectOpenCloser();
  });

  $(() => $(":input").inputmask());

  // MAP ////////////////////////////////////////////////////////////////////

  // GO TO HOME /////////////////////////////////////////////////////////////
  document.getElementById("logo").addEventListener("click", () => goToPage(0));
});
