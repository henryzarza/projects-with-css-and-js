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

window.addEventListener("load", () => {
  if (!!window.IntersectionObserver) {
    animateCounters();
  }
}, false);
