let doc = window.document;
let restList;
if (doc.title == "Simple Food | Блюда") {
  restList = document.querySelector(".promotions__swiper");
} else if (doc.title == "Simple Food | Главная") {
  restList = document.querySelector(".restaurants__swiper");
}
console.log(doc.title);

// const restList = document.querySelector(".restaurants__swiper");
let mql = window.matchMedia("(max-width: 767px)");
let restSlider = new Swiper(restList, {
  slidesPerView: 1,
  spaceBetween: 20,
  init: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
});

if (window.screen.width < 768) {
  restSlider.init();
}

window.addEventListener("resize", () => {
  if (mql.matches) {
    if (restSlider.destroyed == true) {
      restSlider = new Swiper(restList, {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
        },
      });
    } else if (restSlider.initialized == undefined) {
      restSlider.init();
    }
  } else if (restSlider.initialized == true) {
    restSlider.destroy();
  } else return;
});

const range = $(".price-filter__range");
const inputFrom = $(".price-filter__input--from");
const inputTo = $(".price-filter__input--to");
let instance;
let min = $(".price-filter__range").prop("data-min");
let max = $(".price-filter__range").prop("data-max");
let from = $(".price-filter__range").prop("data-from");
let to = $(".price-filter__range").prop("data-to");

range.ionRangeSlider({
  type: "double",
  min: min,
  max: max,
  from: from,
  to: to,
  step: 50,
  onStart: updateInputs,
  onChange: updateInputs,
  onFinish: updateInputs,
});

instance = range.data("ionRangeSlider");

function updateInputs(data) {
  from = data.from;
  to = data.to;

  inputFrom.prop("value", from);
  inputTo.prop("value", to);
}

inputFrom.on("change", function () {
  let val = $(this).prop("value"); // --------->  Пыталась тут использовать attr вместо prop и не мгу понять почему перестает работать (почитала, что когда надо брать именно значение валью, то лучше использовть attr), пробовала с и такую запись +$(this).prop("value") с плюсиком, я имею в виду

  if (val < min) {
    val = min;
  } else if (val > to) {
    val = to;
  }

  instance.update({
    from: val,
  });

  $(this).attr("value", val);
});

inputTo.on("change", function () {
  var val = $(this).prop("value");

  if (val < from) {
    val = from;
  } else if (val > max) {
    val = max;
  }

  instance.update({
    to: val,
  });

  $(this).attr("value", val);
});

const popularSlider = document.querySelector(".popular__swiper");
const dishCardSlider = document.querySelector(".dish-card__swiper");
const tabsSlider = document.querySelector(".tabs__swiper");

let categorySwiper = new Swiper(popularSlider, {
  slidesPerView: "auto",
  spaceBetween: 20,
  breakpoints: {
    576: {
      spaceBetween: 20,
    },

    320: {
      spaceBetween: 10,
    },
  },
});

let dishCardSwiper = new Swiper(dishCardSlider, {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
});

let tabsSwiper = new Swiper(tabsSlider, {
  slidesPerView: "auto",
  spaceBetween: 60,
  breakpoints: {
    768: {
      spaceBetween: 60,
    },
    576: {
      spaceBetween: 40,
    },

    320: {
      spaceBetween: 30,
    },
  },
});

// function doPagination() {
//   const productsList = Array.from(
//     document.querySelectorAll(".food-list__item")
//   );
//   let currentPage = 1;
//   let productsNumber = 12;

//   function displayList(arr, items, page) {
//     const listEl = document.querySelector(".dishes__content");

//     const start = items * page;
//     const end = start + items;
//     const paginatedData = arr.slice(start, end);

//     for (let i = 0; i < paginatedData[i]; i++) {
//       listEl.appendChild(paginatedData[i]);
//     }
//   }

//   function displayPagintion(arr, items) {
//     const listEl = document.querySelector(".pagination__list");
//     const pagesCount = Math.ceil(arr.length / items);

//     for (let i = 0; i < pagesCount; i++) {
//       const itemEl = displayPaginationBtn(i + 1);
//       listEl.appendChild(itemEl);
//     }
//   }

//   function displayPaginationBtn(page) {
//     const itemEl = document.createElement("li");
//     itemEl.classList.add("pagination__item");
//     itemEl.innerHTML = `<a class="pagination__item input-bg input-text">${page}</a>`;
//   }

//   displayList(productsList, productsNumber, currentPage);
// }

// doPagination();

const btns = document.querySelectorAll(".quantity-form__action-btn");
const inputEl = document.querySelector(".quantity-form__input");
const btnMinus = document.querySelector(".quantity-form__action-btn--prev");
const btnSubmit = document.querySelector(".quantity-form__form-btn");

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let inputValue = parseInt(inputEl.value);
    const target = e.target;

    if (target.classList.contains("quantity-form__action-btn--prev")) {
      --inputValue;
      inputEl.value = inputValue;
      if (inputValue == 0) {
        // inputEl.setAttribute("disabled", ""); // Поочему не рабатывает?

        btnMinus.classList.add("quantity-form__action-btn--no-active");
        btnSubmit.classList.add("quantity-form__form-btn--no-active");
      }
    } else {
      inputValue++;
      inputEl.value = inputValue;
      btnMinus.classList.remove("quantity-form__action-btn--no-active");
      btnSubmit.classList.remove("quantity-form__form-btn--no-active");
    }
  });
});

// const paginationItems = document.querySelectorAll(".pagination__item");
// const paginationBtns = document.querySelectorAll(".pagination__nav");

// if (paginationItems[0].children.classList.contains("pagination__btn--active")) {
//   paginationBtns[0].classList.add("pagination__nav--no-active");
// } else if (
//   paginationItems[paginationItems.length - 1].children.classList.contains(
//     "pagination__btn--active"
//   )
// ) {
//   paginationBtns[1].classList.add("pagination__nav--no-active");
// }

$(function () {
  $(window).on("scroll", function () {
    const scrollValue = window.scrollY;

    if (scrollValue > 0) {
      $(".header__inner").addClass("header__inner--mini");
    } else $(".header__inner").removeClass("header__inner--mini");
  });

  $(function () {
    $(window).trigger("scroll");
  });

  $(".burger-btn").on("click", function () {
    $(".mobile-menu").addClass("active");
    $("body").addClass("lock-bg");
  });

  $(".filter-btn").on("click", function () {
    $(".filters").addClass("filters--mobile");
    $("body").addClass("lock-bg");
  });

  $(".dish-card__image").on("click", function () {
    $(".dish-card__popup").addClass("dish-card__popup--active");
    $("dish-card__image").attr(
      "src",
      "images/content/products/lettuce-burger/1-big.png"
    );
    $("body").addClass("lock-bg lock-bg--popup");
  });

  $(".close-btn").on("click", function () {
    if ($(this).hasClass("mobile-menu__close-btn")) {
      $(".mobile-menu").removeClass("active");
      $("body").removeClass("lock-bg");
    } else if ($(this).hasClass("filters__close-btn")) {
      $(".filters").removeClass("filters--mobile");
      $("body").removeClass("lock-bg");
    } else if ($(this).hasClass("dish-card__close-btn")) {
      $(".dish-card__popup").removeClass("dish-card__popup--active");
      $("body").removeClass("lock-bg lock-bg--popup");
    }
  });

  $(function () {
    $(".reviews__slider").slick({
      dots: true,
      dotsClass: "slider-dots",
      appendDots: ".slider-nav",
      appendArrows: ".slider-nav",
      prevArrow:
        '<button class="slider-nav__btn slider-nav__btn--prev slider-nav__btn--active" type="button"><svg class="slider-nav__arrow"><use xlink:href="images/sprite.svg#slider-arrow-icon"></use></svg></button>',
      nextArrow:
        '<button class="slider-nav__btn slider-nav__btn--next" type="button"><svg class="slider-nav__arrow slider-nav__arrow--next"><use xlink:href="images/sprite.svg#slider-arrow-icon"></use></svg></button>',
      speed: 1000,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            dots: false,
          },
        },
      ],
    });
  });

  $(function () {
    $(".interest__slider").slick({
      slidesToShow: 5,
      slidesToScroll: 5,
      dotsClass: "slider-dots",
      appendDots: ".interest__slider-box",
      appendArrows: ".slider-nav",
      prevArrow:
        '<button class="slider-nav__btn slider-nav__btn--prev slider-nav__btn--active" type="button"><svg class="slider-nav__arrow"><use xlink:href="images/sprite.svg#slider-arrow-icon"></use></svg></button>',
      nextArrow:
        '<button class="slider-nav__btn slider-nav__btn--next" type="button"><svg class="slider-nav__arrow slider-nav__arrow--next"><use xlink:href="images/sprite.svg#slider-arrow-icon"></use></svg></button>',
      speed: 500,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 768,
          settings: {
            dots: true,
            arrows: false,
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 576,
          settings: {
            dots: true,
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    });
  });

  $(".slider-nav").on("click", function () {
    $(".slider-nav__btn").removeClass("slider-nav__btn--active");
  });

  //не понимаю почему не срабатвает, хотя в функции выше сработало
  $(".interest .slider-nav .slider-nav__btn--prev").removeClass(
    "slider-nav__btn--active"
  );

  $(".sort-filter__select").styler();

  $("a.categories-filter__event").on("click", function (e) {
    e.preventDefault();
    $(this).addClass("categories-filter__event--active");
  });

  $(".price-filter__range").ionRangeSlider({
    type: "double",
    onChange: function (data) {
      $(".price-filter__input--from").text(data.from);
      $(".price-filter__input--to").text(data.to);
    },
  });

  $(".pagination__item .pagination__btn").on("click", function () {
    $(".pagination__btn").removeClass("pagination__btn--active");
    $(this).addClass("pagination__btn--active");
  });

  $(".rating").rateYo({
    starWidth: "16px",
    normalFill: "rgba(193, 193, 193, 0.3)",
    ratedFill: "#ffb800",
    readOnly: true,
    spacing: "6px",
    starSvg:
      "<svg class='rating__icon'>" +
      "<use href='images/sprite.svg#star-icon'></use>" +
      "</svg>",
  });

  $(".tabs__link").on("click", function (e) {
    e.preventDefault();
    $(".tabs__link").removeClass("tabs__link--active");
    $(this).addClass("tabs__link--active");

    $(".tabs__content-item").removeClass("tabs__content-item--active");
    $($(this).attr("href")).addClass("tabs__content-item--active");
  });

  var mixer = mixitup(".food-list");
});
