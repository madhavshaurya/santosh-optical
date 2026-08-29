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

  // Single throttled scroll handler using requestAnimationFrame
  const updateScroll = () => {
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

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  };

  const onClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return false;
  };

  updateScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  progressWrap.addEventListener("click", onClick);

  // Return cleanup function to remove event listeners on component unmount
  return () => {
    window.removeEventListener("scroll", onScroll);
    progressWrap.removeEventListener("click", onClick);
  };
};

export default scrollToTop;
