const scrollToTop = () => {
  let offset = 150;
  let progressWrap = document.querySelector(".progress-wrap");
  if (!progressWrap) return () => {};

  let progressPath = document.querySelector(".progress-wrap path");
  if (!progressPath) return () => {};

  let pathLength = progressPath.getTotalLength();
  let ticking = false;

  // Performance Optimization: Combine scroll handlers & throttle via requestAnimationFrame
  // to avoid layout thrashing and high CPU usage during rapid page scrolling.
  const updateProgressAndVisibility = () => {
    let scroll = window.scrollY;
    let height = document.documentElement.scrollHeight - window.innerHeight;
    if (height > 0) {
      let progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    }

    // Performance Optimization: Cache progressWrap reference instead of re-querying document.querySelector on every scroll event
    if (scroll > offset) {
      progressWrap.classList.add("active-progress");
    } else {
      progressWrap.classList.remove("active-progress");
    }

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgressAndVisibility);
      ticking = true;
    }
  };

  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";

  updateProgressAndVisibility();
  window.addEventListener("scroll", onScroll, { passive: true });

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return false;
  };

  progressWrap.addEventListener("click", handleClick);

  // Return a cleanup function so component unmounting removes listener leaks
  return () => {
    window.removeEventListener("scroll", onScroll);
    progressWrap.removeEventListener("click", handleClick);
  };
};

export default scrollToTop;
