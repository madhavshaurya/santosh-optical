/**
 * Performance Optimization:
 * - Batched scroll processing using requestAnimationFrame to prevent main-thread blocking and layout thrashing.
 * - Combined dual scroll listeners into a single passive listener ({ passive: true }).
 * - Cached DOM element references to avoid repeated querySelector calls during scroll.
 * - Returns a cleanup function for onUnmounted to prevent memory leaks across page navigations.
 */
const scrollToTop = () => {
  const offset = 150;
  const progressWrap = document.querySelector(".progress-wrap");
  const progressPath = document.querySelector(".progress-wrap path");

  if (!progressWrap || !progressPath) return () => {};

  const pathLength = progressPath.getTotalLength();

  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";

  let ticking = false;

  const updateProgressAndVisibility = () => {
    const scroll = window.scrollY || window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;

    if (height > 0) {
      const progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    }

    if (scroll > offset) {
      progressWrap.classList.add("active-progress");
    } else {
      progressWrap.classList.remove("active-progress");
    }

    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateProgressAndVisibility);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  updateProgressAndVisibility();
  window.addEventListener("scroll", handleScroll, { passive: true });
  progressWrap.addEventListener("click", handleClick);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    progressWrap.removeEventListener("click", handleClick);
  };
};

export default scrollToTop;
