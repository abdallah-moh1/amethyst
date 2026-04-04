export function attachScrollbarVisibility(scroller: HTMLElement) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const handleScroll = () => {
    scroller.classList.add("is-scrolling");

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      scroller.classList.remove("is-scrolling");
    }, 700);
  };

  scroller.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    scroller.removeEventListener("scroll", handleScroll);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
}