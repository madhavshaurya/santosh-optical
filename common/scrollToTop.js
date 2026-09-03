/**
 * Initializes scroll-to-top button progress animation and scroll event handling.
 * Optimized with requestAnimationFrame throttling and consolidated listeners.
 *
 * @returns {Function} Cleanup function to remove event listeners on unmount.
 */
const scrollToTop = () => {
  let offset = 150;
  let progressWrap = document.querySelector(".progress-wrap");
  let progressPath = document.querySelector(".progress-wrap path");

  if (!progressWrap || !progressPath) {
    return () => {};
  }

  let pathLength = progressPath.getTotalLength();
  let ticking = false;

  // Single consolidated update function throttled via requestAnimationFrame
  const updateProgress = () => {
    let scroll = window.scrollY;
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

  // Throttle scroll events to animation frames to avoid main-thread thrashing
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return false;
  };

  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";

  updateProgress();
  window.addEventListener("scroll", handleScroll, { passive: true });
  progressWrap.addEventListener("click", handleClick);

  // Return cleanup function to prevent memory leaks across route navigation
  return () => {
    window.removeEventListener("scroll", handleScroll);
    progressWrap.removeEventListener("click", handleClick);
  };
};

export default scrollToTop;
