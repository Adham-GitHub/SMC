window.addEventListener("DOMContentLoaded", () => {
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

  const toTop = document.getElementById("to-top");
  const toTopStyle = toTop.style;
  const html = document.documentElement;
  const body = document.body;

  const topAnime = () => {
    if (body.scrollTop > 250 || html.scrollTop > 250) {
      toTopStyle.visibility = "visible";
      toTopStyle.opacity = "1";
    } else {
      toTopStyle.visibility = "";
      toTopStyle.opacity = "";
    }
  };

  toTop.addEventListener("click", () => (html.scrollTop = body.scrollTop = 0));

  window.addEventListener("scroll", topAnime);
});
