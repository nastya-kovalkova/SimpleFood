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

  var mixer = mixitup(".popular__content");
});
