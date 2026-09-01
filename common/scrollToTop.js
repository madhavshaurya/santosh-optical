const scrollToTop = () => {
  let offset = 150;
  let progressWrap = document.querySelector(".progress-wrap");
  if (!progressWrap) return () => {};
  let progressPath = progressWrap.querySelector("path");
  if (!progressPath) return () => {};

  let pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";

  let ticking = false;

  const updateProgress = () => {
    let scroll = window.scrollY || window.pageYOffset;
    let height = document.documentElement.scrollHeight - window.innerHeight;
    if (height > 0) {
      let progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    }

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

  // Optimization: Single passive scroll listener throttled with requestAnimationFrame to prevent scroll jank
  updateProgress();
  window.addEventListener("scroll", onScroll, { passive: true });
  progressWrap.addEventListener("click", handleClick);

  // Return cleanup function to remove event listeners on unmount
  return () => {
    window.removeEventListener("scroll", onScroll);
    progressWrap.removeEventListener("click", handleClick);
  };
};

export default scrollToTop;
