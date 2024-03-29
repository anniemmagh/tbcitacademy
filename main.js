//Slider Component
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider_btn-left");
  const btnRight = document.querySelector(".slider_btn-right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const {
        slide
      } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  setInterval(nextSlide, 5000);
};
slider();

//Mobile Navigation
const headerEl = document.querySelector(".header_container");
const btnNavEl = document.querySelector(".mobile-nav");
const overlay = document.querySelector(".overlay");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
  overlay.classList.toggle("hidden");
});

window.addEventListener("click", function (event) {
  if (event.target === overlay) {
    headerEl.classList.remove("nav-open");
    overlay.classList.add("hidden");
  }
});

//Accordion component
const arrowDownIcons = document.querySelectorAll(".down");
const questions = document.querySelectorAll(".question");
const answers = document.querySelectorAll(".hidden-box");
questions.forEach((item, index) => {
  item.addEventListener("click", () => {
    answers.forEach((answer, answerIndex) => {
      if (answerIndex != index) {
        answer.classList.add("hidden");
      }
    });
    arrowDownIcons.forEach((arrow, arrowIndex) => {
      if (arrowIndex != index) {
        arrow.classList.remove("active");
      }
    });
    arrowDownIcons[index].classList.toggle("active");
    answers[index].classList.toggle("hidden");
  });
});