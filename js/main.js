AOS.init({
  duration: 800,
  easing: "slide",
  once: true,
});

jQuery(document).ready(function ($) {
  "use strict";

  var siteMenuClone = function () {
    $(".js-clone-nav").each(function () {
      var $this = $(this);
      $this
        .clone()
        .attr("class", "site-nav-wrap")
        .appendTo(".site-mobile-menu-body");
    });

    setTimeout(function () {
      var counter = 0;
      $(".site-mobile-menu .has-children").each(function () {
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find(".arrow-collapse").attr({
          "data-toggle": "collapse",
          "data-target": "#collapseItem" + counter,
        });

        $this.find("> ul").attr({
          class: "collapse",
          id: "collapseItem" + counter,
        });

        counter++;
      });
    }, 1000);

    $("body").on("click", ".arrow-collapse", function (e) {
      var $this = $(this);
      if ($this.closest("li").find(".collapse").hasClass("show")) {
        $this.removeClass("active");
      } else {
        $this.addClass("active");
      }
      e.preventDefault();
    });

    $(window).resize(function () {
      var $this = $(this),
        w = $this.width();

      if (w > 768) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });

    $("body").on("click", ".js-menu-toggle", function (e) {
      var $this = $(this);
      e.preventDefault();

      if ($("body").hasClass("offcanvas-menu")) {
        $("body").removeClass("offcanvas-menu");
        $this.removeClass("active");
      } else {
        $("body").addClass("offcanvas-menu");
        $this.addClass("active");
      }
    });

    $(document).mouseup(function (e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });
  };
  siteMenuClone();

  var sitePlusMinus = function () {
    $(".js-btn-minus").on("click", function (e) {
      e.preventDefault();
      if ($(this).closest(".input-group").find(".form-control").val() != 0) {
        $(this)
          .closest(".input-group")
          .find(".form-control")
          .val(
            parseInt(
              $(this).closest(".input-group").find(".form-control").val()
            ) - 1
          );
      } else {
        $(this).closest(".input-group").find(".form-control").val(parseInt(0));
      }
    });
    $(".js-btn-plus").on("click", function (e) {
      e.preventDefault();
      $(this)
        .closest(".input-group")
        .find(".form-control")
        .val(
          parseInt(
            $(this).closest(".input-group").find(".form-control").val()
          ) + 1
        );
    });
  };
  // sitePlusMinus();

  var siteSliderRange = function () {
    $("#slider-range").slider({
      range: true,
      min: 0,
      max: 500,
      values: [75, 300],
      slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
      },
    });
    $("#amount").val(
      "$" +
        $("#slider-range").slider("values", 0) +
        " - $" +
        $("#slider-range").slider("values", 1)
    );
  };
  // siteSliderRange();

  var siteCarousel = function () {
    if ($(".nonloop-block-13").length > 0) {
      $(".nonloop-block-13").owlCarousel({
        center: false,
        items: 1,
        loop: true,
        stagePadding: 0,
        margin: 0,
        autoplay: true,
        nav: true,
        navText: [
          '<span class="icon-arrow_back">',
          '<span class="icon-arrow_forward">',
        ],
        responsive: {
          600: {
            margin: 0,
            nav: true,
            items: 2,
          },
          1000: {
            margin: 0,
            stagePadding: 0,
            nav: true,
            items: 3,
          },
          1200: {
            margin: 0,
            stagePadding: 0,
            nav: true,
            items: 4,
          },
        },
      });
    }

    if ($(".nonloop-block-14").length > 0) {
      $(".nonloop-block-14").owlCarousel({
        center: false,
        items: 1,
        loop: true,
        stagePadding: 30,
        margin: 0,
        autoplay: true,
        smartSpeed: 1000,
        nav: true,
        navText: [
          '<span class="icon-arrow_back">',
          '<span class="icon-arrow_forward">',
        ],
        responsive: {
          600: {
            margin: 20,
            nav: true,
            items: 2,
          },
          1000: {
            margin: 30,

            nav: true,
            items: 2,
          },
          1200: {
            margin: 30,

            nav: true,
            items: 3,
          },
        },
      });
    }

    $(".slide-one-item").owlCarousel({
      center: false,
      items: 1,
      loop: true,
      stagePadding: 0,
      margin: 0,
      autoplay: true,
      pauseOnHover: false,
      nav: true,
      navText: [
        '<span class="icon-keyboard_arrow_left">',
        '<span class="icon-keyboard_arrow_right">',
      ],
    });
  };
  siteCarousel();

  var siteStellar = function () {
    $(window).stellar({
      responsive: false,
      parallaxBackgrounds: true,
      parallaxElements: true,
      horizontalScrolling: false,
      hideDistantElements: false,
      scrollProperty: "scroll",
    });
  };
  siteStellar();

  var siteCountDown = function () {
    $("#date-countdown").countdown("2020/10/10", function (event) {
      var $this = $(this).html(
        event.strftime(
          "" +
            '<span class="countdown-block"><span class="label">%w</span> weeks </span>' +
            '<span class="countdown-block"><span class="label">%d</span> days </span>' +
            '<span class="countdown-block"><span class="label">%H</span> hr </span>' +
            '<span class="countdown-block"><span class="label">%M</span> min </span>' +
            '<span class="countdown-block"><span class="label">%S</span> sec</span>'
        )
      );
    });
  };
  siteCountDown();

  var siteDatePicker = function () {
    if ($(".datepicker").length > 0) {
      $(".datepicker").datepicker();
    }
  };
  siteDatePicker();

  var siteSticky = function () {
    $(".js-sticky-header").sticky({ topSpacing: 0 });
  };
  siteSticky();

  var OnePageNavigation = function () {
    var navToggler = $(".site-menu-toggle");
    $("body").on(
      "click",
      ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a",
      function (e) {
        e.preventDefault();

        var hash = this.hash;

        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          600,
          "easeInOutCirc",
          function () {
            window.location.hash = hash;
          }
        );
      }
    );
  };
  OnePageNavigation();

  var siteScroll = function () {
    $(window).scroll(function () {
      var st = $(this).scrollTop();

      if (st > 100) {
        $(".js-sticky-header").addClass("shrink");
      } else {
        $(".js-sticky-header").removeClass("shrink");
      }
    });
  };
  siteScroll();

  $(function () {
    $("#bgndVideo").YTPlayer();
  });

  $(document).ready(function () {
    $("form.subscribe-form").submit(function (e) {
      e.preventDefault();

      const email = $(this).find('input[type="text"]').val();

      $.ajax({
        url: "http://localhost:5000/api/subscribe",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ email }),
        success: function (response) {
          alert("Thank you for subscribing!");
          $('input[type="text"]').val("");
        },
        error: function (error) {
          alert(
            "Error subscribing: " +
              (error.responseJSON?.error || "Unknown error")
          );
        },
      });
    });

    $("#contactForm").submit(function (e) {
      e.preventDefault();

      const formData = {
        fname: $("#fname").val(),
        lname: $("#lname").val(),
        email: $("#email").val(),
        subject: $("#subject").val(),
        message: $("#message").val(),
      };

      $.ajax({
        url: "http://localhost:5000/api/contact",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert("Your message has been sent. Thank you!");
          $("#contactForm")[0].reset();
        },
        error: function (error) {
          alert(
            "Error sending message: " +
              (error.responseJSON?.error || "Unknown error")
          );
        },
      });
    });

    function loadClasses() {
      $.ajax({
        url: "http://localhost:3000/api/classes",
        type: "GET",
        success: function (data) {
          if (data && data.classes) {
            const classesContainer = $("#classes-container");
            classesContainer.empty();

            data.classes.forEach(function (classItem) {
              const classHtml = `
	              <div class="col-lg-4">
	                <div class="class-item d-flex align-items-center">
	                  <a href="${classItem["single-page"]}" class="class-item-thumbnail">
	                    <img src="${classItem.image}" alt="${classItem.name}">
	                  </a>
	                  <div class="class-item-text">
	                    <span>${classItem.time}</span>
	                    <h2><a href="${classItem["single-page"]}">${classItem.name}</a></h2>
	                    <span>${classItem.instructor}</span>,
	                    <span>${classItem.duration}</span>
	                  </div>
	                </div>
	              </div>
	            `;
              classesContainer.append(classHtml);
            });
          }
        },
        error: function (error) {
          console.error("Error loading classes:", error);
        },
      });
    }

    function loadSubjects() {
      $.ajax({
        url: "http://localhost:3000/api/subjects",
        type: "GET",
        success: function (data) {
          if (data && data.contactSubject) {
            const subjectSelect = $("#subject");
            subjectSelect.empty();

            subjectSelect.append('<option value="">Select Subject</option>');

            data.contactSubject.forEach(function (subject) {
              subjectSelect.append(
                `<option value="${subject}">${subject}</option>`
              );
            });
          }
        },
        error: function (error) {
          console.error("Error loading subjects:", error);
        },
      });
    }

    loadClasses();
    loadSubjects();

    function loadOccupationCategories() {
      $.ajax({
        url: "http://localhost:3000/json/occupation-cat.json",
        type: "GET",
        success: function (data) {
          if (data && data.length > 0) {
            const categorySelect = $("#occupation-category");

            data.forEach(function (category) {
              categorySelect.append(
                `<option value="${category.toLowerCase()}">${category}</option>`
              );
            });

            categorySelect.on("change", function () {
              const selectedCategory = $(this).val();
              if (selectedCategory) {
                loadOccupations(selectedCategory);
              } else {
                const occupationSelect = $("#occupation");
                occupationSelect.empty();
                occupationSelect.append(
                  '<option value="">Select Occupation</option>'
                );
                occupationSelect.prop("disabled", true);
              }
            });
          }
        },
        error: function (error) {
          console.error("Error loading occupation categories:", error);
        },
      });
    }

    function loadOccupations(category) {
      $.ajax({
        url: `http://localhost:3000/json/${category}.json`,
        type: "GET",
        success: function (data) {
          const occupationSelect = $("#occupation");
          occupationSelect.empty();
          occupationSelect.append(
            '<option value="">Select Occupation</option>'
          );

          if (data && data.length > 0) {
            data.forEach(function (occupation) {
              occupationSelect.append(
                `<option value="${occupation}">${occupation}</option>`
              );
            });

            occupationSelect.prop("disabled", false);
          }
        },
        error: function (error) {
          console.error(`Error loading occupations for ${category}:`, error);
        },
      });
    }

    $("#registerForm").submit(function (e) {
      e.preventDefault();

      const firstName = $("#firstName").val();
      const lastName = $("#lastName").val();
      const email = $("#registerEmail").val();
      const password = $("#registerPassword").val();
      const category = $("#occupation-category").val();
      const occupation = $("#occupation").val();

      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !category ||
        !occupation
      ) {
        alert("All fields are required");
        return;
      }

      const formData = {
        firstName,
        lastName,
        email,
        password,
        category,
        occupation,
      };

      $.ajax({
        url: "http://localhost:5000/api/register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert(response.message);
          $("#registerForm")[0].reset();
          $("#occupation").prop("disabled", true);
        },
        error: function (error) {
          alert(
            error.responseJSON?.message ||
              "Registration failed. Please try again."
          );
        },
      });
    });

    $("#loginForm").submit(function (e) {
      e.preventDefault();

      const email = $("#loginEmail").val();
      const password = $("#loginPassword").val();

      if (!email || !password) {
        alert("Email and password are required");
        return;
      }

      const formData = {
        email,
        password,
      };

      $.ajax({
        url: "http://localhost:5000/api/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert(response.message);
          if (response.message === "Login successfully.") {
            $("#loginForm")[0].reset();
          }
        },
        error: function (error) {
          alert(
            error.responseJSON?.message || "Login failed. Please try again."
          );
        },
      });
    });

    loadOccupationCategories();
  });
});
