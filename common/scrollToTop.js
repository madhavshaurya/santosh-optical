const scrollToTop = () => {
  const offset = 150;
  const progressWrap = document.querySelector(".progress-wrap");
  if (!progressWrap) return () => {};

  const progressPath = progressWrap.querySelector("path");
  if (!progressPath) return () => {};

  const pathLength = progressPath.getTotalLength();

  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";

  let ticking = false;

  // Optimization: Single update function to avoid duplicate scroll listeners & redundant DOM queries
  const updateProgress = () => {
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? pathLength - (scroll * pathLength) / height : pathLength;
    progressPath.style.strokeDashoffset = progress;

    if (scroll > offset) {
      progressWrap.classList.add("active-progress");
    } else {
      progressWrap.classList.remove("active-progress");
    }
    ticking = false;
  };

  // Optimization: Throttle scroll event handling with requestAnimationFrame and passive event listener
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  updateProgress();
  window.addEventListener("scroll", onScroll, { passive: true });
  progressWrap.addEventListener("click", handleClick);

  // Return cleanup callback to prevent memory leaks across route navigation
  return () => {
    window.removeEventListener("scroll", onScroll);
    progressWrap.removeEventListener("click", handleClick);
  };
};

export default scrollToTop;
