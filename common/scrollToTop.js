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
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";

  let ticking = false;

  // Optimization: Consolidate scroll updates and throttle using requestAnimationFrame
  // Cache DOM references and use passive event listener for scroll performance
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        let scroll = window.scrollY;
        let height = document.documentElement.scrollHeight - window.innerHeight;
        let progress = pathLength - (scroll * pathLength) / (height || 1);
        progressPath.style.strokeDashoffset = progress;

        if (scroll > offset) {
          progressWrap.classList.add("active-progress");
        } else {
          progressWrap.classList.remove("active-progress");
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  progressWrap.addEventListener("click", handleClick);

  // Return cleanup function to remove event listeners on unmount
  return () => {
    window.removeEventListener("scroll", onScroll);
    progressWrap.removeEventListener("click", handleClick);
  };
};

export default scrollToTop;
