new Swiper(".swiper", {
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  speed: 2000,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  breakpoints: {
    600: {
      direction: "horizontal",
      slidesPerView: 2,
    },
    800: {
      direction: "vertical",
      slidesPerView: 3,
    },
  },
});

const pagination = document.querySelector(".swiper-pagination").classList;

window.matchMedia("(min-width: 800px)").addEventListener("change", (e) => {
  pagination.toggle("swiper-pagination-vertical");
  pagination.toggle("swiper-pagination-horizontal");
});
