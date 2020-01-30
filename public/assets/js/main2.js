/* =================================
------------------------------------
Functions: PreLoad, OnScroll, NavBarHide, ResponsiveMenu, Background, PopUp
 ------------------------------------ 
 ====================================*/
"use strict";

$(window).on("load", function() {
  /*------------------
		Preloder
	--------------------*/
  $(".loader").fadeOut();
  $("#preloder")
    .delay(400)
    .fadeOut("slow");
});

/*global $, jQuery, alert*/
$(document).ready(function() {
  "use strict";

  // ========================================================================= //
  //  //SMOOTH SCROLL
  // ========================================================================= //

  $(document).on("scroll", onScroll);

  $('a[href^="#"]').on("click", function(e) {
    e.preventDefault();
    $(document).off("scroll");

    $("a").each(function() {
      $(this).removeClass("active");
      if ($(window).width() < 768) {
        $(".nav-menu").slideUp();
      }
    });

    $(this).addClass("active");

    var target = this.hash,
      menu = target;

    target = $(target);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: target.offset().top - 80
        },
        500,
        "swing",
        function() {
          window.location.hash = target.selector;
          $(document).on("scroll", onScroll);
        }
      );
  });

  function onScroll(event) {
    if ($(".home").length) {
      var scrollPos = $(document).scrollTop();
      $("nav ul li a").each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
      });
    }
  }

  // ========================================================================= //
  //  //NAVBAR SHOW - HIDE
  // ========================================================================= //

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 200) {
      $("#main-nav, #main-nav-subpage").slideDown(700);
      $("#main-nav-subpage").removeClass("subpage-nav");
    } else {
      $("#main-nav").slideUp(700);
      $("#main-nav-subpage").hide();
      $("#main-nav-subpage").addClass("subpage-nav");
    }
  });

  // ========================================================================= //
  //  // RESPONSIVE MENU
  // ========================================================================= //

  $(".responsive").on("click", function(e) {
    $(".nav-menu").slideToggle();
  });

  // ========================================================================= //
  //  Typed Js
  // ========================================================================= //

  var typed = $(".typed");

  $(function() {
    typed.typed({
      strings: [
        "Timothy Howard.",
        "Designer.",
        "Developer.",
        "Technician.",
        "Photographer"
      ],
      typeSpeed: 100,
      loop: true
    });
  });
});

(function($) {
  /*------------------
		Background set
	--------------------*/
  $(".set-bg").each(function() {
    var bg = $(this).data("setbg");
    $(this).css("background-image", "url(" + bg + ")");
  });

  $(".review-slider").owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    items: 1,
    autoplay: true
  });

  $(".progress-bar-style").each(function() {
    var progress = $(this).data("progress");
    var prog_width = progress + "%";
    if (progress <= 100) {
      $(this).append(
        '<div class="bar-inner" style="width:' +
          prog_width +
          '"><span>' +
          prog_width +
          "</span></div>"
      );
    } else {
      $(this).append(
        '<div class="bar-inner" style="width:100%"><span>' +
          prog_width +
          "</span></div>"
      );
    }
  });

  $(".lan-prog").each(function() {
    var progress = $(this).data("lanprogesss");
    var ele = "<span></span>";
    var ele_fade = '<span class="fade-ele"></span>';

    for (var i = 1; i <= 5; i++) {
      if (i <= progress) {
        $(this).append(ele);
      } else {
        $(this).append(ele_fade);
      }
    }
  });

  /*------------------
		Popup
	--------------------*/
  $(".portfolio-item .port-pic").magnificPopup({
    type: "image",
    mainClass: "img-popup-warp",
    removalDelay: 500
  });

  if ($().circleProgress) {
    //Set progress circle 1
    $("#progress1").circleProgress({
      value: 0.75,
      size: 175,
      thickness: 2,
      fill: "#40424a",
      emptyFill: "rgba(0, 0, 0, 0)"
    });
    //Set progress circle 2
    $("#progress2").circleProgress({
      value: 0.83,
      size: 175,
      thickness: 2,
      fill: "#40424a",
      emptyFill: "rgba(0, 0, 0, 0)"
    });

    //Set progress circle white
    $("#progress3").circleProgress({
      value: 0.75,
      size: 175,
      thickness: 2,
      fill: "#ffffff",
      emptyFill: "rgba(0, 0, 0, 0)"
    });

    //Set progress circle white
    $("#progress4").circleProgress({
      value: 0.83,
      size: 175,
      thickness: 2,
      fill: "#ffffff",
      emptyFill: "rgba(0, 0, 0, 0)"
    });

    //Set progress circle skyblue
    $("#progress5").circleProgress({
      value: 0.75,
      size: 175,
      thickness: 2,
      fill: "#009fff",
      emptyFill: "rgba(0, 0, 0, 0)"
    });

    //Set progress circle skyblue
    $("#progress6").circleProgress({
      value: 0.83,
      size: 175,
      thickness: 2,
      fill: "#009fff",
      emptyFill: "rgba(0, 0, 0, 0)"
    });
  }
})(jQuery);


