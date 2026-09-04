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

  // Performance optimization: Throttle scroll updates with requestAnimationFrame
  // and batch DOM property reads/writes to prevent forced layout thrashing.
  const updateProgress = () => {
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pathLength - (scroll * pathLength) / (height || 1);
    progressPath.style.strokeDashoffset = progress;

    if (scroll > offset) {
      progressWrap.classList.add("active-progress");
    } else {
      progressWrap.classList.remove("active-progress");
    }
    ticking = false;
  };

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

  // Return cleanup handler to remove listeners when component unmounts
  return () => {
    window.removeEventListener("scroll", onScroll);
    progressWrap.removeEventListener("click", handleClick);
  };
};

export default scrollToTop;
