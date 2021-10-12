const animateCounters = () => {
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const { target } = entry;
        const endValue = Number(target.dataset.count) || 0;

        const increaseCounter = () => {
          const currentValue = Number(target.innerText) || 0;
          const time = endValue / 200;
          if (endValue > currentValue) {
            target.innerText = Math.ceil(currentValue + time);
            setTimeout(increaseCounter, 1);
          } else {
            target.innerText = currentValue;
          }
        }
        increaseCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -200px 0px" });
  document.querySelectorAll(".counter-value").forEach(cell => { observer.observe(cell) });
}

const showButton = (btnRef) => {
  let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        btnRef.classList.remove("show");
      } else {
        btnRef.classList.add("show");
      }
    });
  }, { rootMargin: "0px 0px -200px 0px" });

  observer.observe(document.querySelector(".main"));
}

window.addEventListener("load", () => {
  const button = document.querySelector(".btn-goto");

  if (!!window.IntersectionObserver) {
    animateCounters();
    showButton(button);
  }

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

}, false);
