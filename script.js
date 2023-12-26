class Progress {
  constructor(circleElement, progressBlockElement) {
    this.circle = circleElement;
    this.progressBlock = progressBlockElement;

    this.radius = circle.r.baseVal.value;
    this.circumference = 2 * Math.PI * this.radius;

    this.animated = false;

    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.circle.style.strokeDashoffset = this.circumference;
  }

  setProgress(percent) {
    const offset = this.circumference - (percent / 100) * this.circumference;
    this.circle.style.strokeDashoffset = offset;
  }

  animateProgress() {
    this.animated = !this.animated;

    if (this.animated) {
      this.circle.style.animation = "spin 2s linear infinite";
    } else {
      this.circle.style.animation = "none";
    }
  }

  hideProgress() {
    this.progressBlock.classList.toggle("hided");
  }
}

const circle = document.querySelector(".progress-ring__circle");
const progressBlock = document.querySelector(".progress__block");

const progress = new Progress(circle, progressBlock);

const input = document.querySelector(".progress__input");
const inputAnimate = document.querySelector(".progress__input-animate");
const inputHide = document.querySelector(".progress__input-hide");
const warning = document.querySelector(".warning");

input.addEventListener("change", (e) => {
  const value = e.target.value.replace(/^0+/, "");

  if (input.value.charAt(0) === "0") {
    input.value = input.value.replace(/^0+/, "");
  }

  if (value >= 0 && value <= 100) {
    warning.classList.add("warning-hide");
    progress.setProgress(value);
  } else {
    warning.classList.remove("warning-hide");
  }
});

inputAnimate.addEventListener("change", () => {
  progress.animateProgress();

  setTimeout(() => {
    progress.animated = false;
    progress.circle.style.animation = "none";
    inputAnimate.checked = false;
  }, 3000);
});

inputHide.addEventListener("change", () => {
  progress.hideProgress();
});

document.addEventListener("DOMContentLoaded", () => {
  progress.setProgress(75);
});
