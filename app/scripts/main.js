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

  $(function () {
    $(".reviews__slider").slick({
      autoplay: true,
      dots: true,
      dotsClass: "reviews__slider-dots",
      appendDots: ".reviews__nav-block",
      appendArrows: ".reviews__nav-block",
      prevArrow:
        '<button class="reviews__btn reviews__btn--active" type="button"><svg class="reviews__arrow"><use xlink:href="images/sprite.svg#slider-arrow-icon"></use></svg></button>',
      nextArrow:
        '<button class="reviews__btn reviews__btn--next" type="button"><svg class="reviews__arrow reviews__arrow--next"><use xlink:href="images/sprite.svg#slider-arrow-icon"></use></svg></button>',
      speed: 1000,
    });
  });

  $(".reviews__nav-block").on("click", function () {
    $(".reviews__btn").removeClass("reviews__btn--active");
  });

  var mixer = mixitup(".popular__content");
});
