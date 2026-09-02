const scrollToTop = () => {
  const offset = 150;
  const progressWrap = document.querySelector('.progress-wrap');
  const progressPath = document.querySelector('.progress-wrap path');

  if (!progressWrap || !progressPath) return () => {};

  const pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    'stroke-dashoffset 10ms linear';

  let ticking = false;

  // Optimization: Combined passive scroll listener batched with requestAnimationFrame
  // Prevents DOM re-queries and layout thrashing on every scroll event
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scroll = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = height > 0 ? pathLength - (scroll * pathLength) / height : pathLength;
        progressPath.style.strokeDashoffset = progress;

        if (scroll > offset) {
          progressWrap.classList.add('active-progress');
        } else {
          progressWrap.classList.remove('active-progress');
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
  progressWrap.addEventListener('click', handleClick);

  // Return cleanup function to remove event listeners on component unmount
  return () => {
    window.removeEventListener('scroll', handleScroll);
    progressWrap.removeEventListener('click', handleClick);
  };
};

export default scrollToTop;
