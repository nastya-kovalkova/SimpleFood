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

let categorySwiper = new Swiper(popularSlider, {
  slidesPerView: "auto",
  spaceBetween: 20,
});

let dishCardSwiper = new Swiper(dishCardSlider, {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
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

  $(".burger-menu").on("click", function () {
    $(".mobile-menu").addClass("active");
    $("body").addClass("lock-bg");
  });

  $(".mobile-menu__btn-close").on("click", function () {
    $(".mobile-menu").removeClass("active");
    $("body").removeClass("lock-bg");
  });

  $(function () {
    $(".reviews__slider").slick({
      autoplay: true,
      dots: true,
      dotsClass: "slider__dots",
      appendDots: ".slider__nav",
      appendArrows: ".slider__nav",
      prevArrow:
        '<button class="slider__btn slider__btn--prev slider__btn--active" type="button"><svg class="slider__arrow"><use xlink:href="images/sprite.svg#slider-arrow-icon"></use></svg></button>',
      nextArrow:
        '<button class="slider__btn slider__btn--next" type="button"><svg class="slider__arrow slider__arrow--next"><use xlink:href="images/sprite.svg#slider-arrow-icon"></use></svg></button>',
      speed: 1000,
    });
  });

  $(function () {
    $(".interest__slider").slick({
      variableWidth: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      appendDots: ".slider__nav",
      appendArrows: ".slider__nav",
      prevArrow:
        '<button class="slider__btn slider__btn--prev slider__btn--active" type="button"><svg class="slider__arrow"><use xlink:href="images/sprite.svg#slider-arrow-icon"></use></svg></button>',
      nextArrow:
        '<button class="slider__btn slider__btn--next" type="button"><svg class="slider__arrow slider__arrow--next"><use xlink:href="images/sprite.svg#slider-arrow-icon"></use></svg></button>',
      speed: 500,
    });
  });

  $(".slider__nav").on("click", function () {
    $(".slider__btn").removeClass("slider__btn--active");
  });

  //не понимаю почему не срабатвает, хотя в функции выше сработало
  $(".interest .slider__nav .slider__btn--prev").removeClass(
    "slider__btn--active"
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

  $(".pagination__link").on("click", function (e) {
    e.preventDefault();
  });

  $(".pagination__btn").on("click", function () {
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

  $(".dish-card__tab-btn").on("click", function () {
    $(".dish-card__tab-btn").removeClass("dish-card__tab-btn--active");
    $(this).addClass("dish-card__tab-btn--active");

    $(".dish-card__text-item").removeClass("dish-card__text-item--display");

    if ($(this).hasClass("dish-card__tab-btn--decsr")) {
      $(".dish-card__text-item--decsr").addClass(
        "dish-card__text-item--display"
      );
    } else if ($(this).hasClass("dish-card__tab-btn--charact")) {
      $(".dish-card__text-item--charact").addClass(
        "dish-card__text-item--display"
      );
    } else {
      $(".dish-card__text-item--reviews").addClass(
        "dish-card__text-item--display"
      );
    }
  });

  var mixer = mixitup(".food-list");
});
