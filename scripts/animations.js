const abTitle = document.querySelector("#ab-title");
const abt1 = document.querySelector("#ab-t1");
const abt2 = document.querySelector("#ab-t2");

const kn1 = document.querySelector("#kn-t1");
const kn2 = document.querySelector("#kn-t2");
const kn3 = document.querySelector("#kn-t3");
const kn4 = document.querySelector("#kn-t4");
const kn5 = document.querySelector("#kn-t5");

const knTitle = document.querySelector("#kn-title");
const portfolioTitle = document.querySelector("#portfolio-title");
const contactTitle = document.querySelector("#contact-title");

const portfolioWrapper = document.querySelector(".portfolio-wrapper");
const contactWrapper = document.querySelector(".contact-wrapper");


export const checkAnimation = (
  sections,
  actualSection,
  scrollFraction = null,
  movie,
  slider
) => {
  const activeSection = sections[actualSection];

  if (!scrollFraction) {
    const sectionTop = activeSection.offsetTop;
    const sectionHeight = activeSection.offsetHeight;

    const scrollTopInSection =
      window.scrollY - sectionTop + window.innerHeight / 2;

    scrollFraction = scrollTopInSection / sectionHeight;
    scrollFraction = Math.min(1, Math.max(0, scrollFraction));
  }

  const viewportHeight = window.innerHeight;
  const triggerPoint = viewportHeight * 0.75;
  if (abt1.getBoundingClientRect().top < triggerPoint) {
    abt1.style.transform = "translateX(0%)";
  } else {
    abt1.style.transform = "translateX(150%)";
  }

  if (abt2.getBoundingClientRect().top < triggerPoint) {
    abt2.style.transform = "translateX(0%)";
  } else {
    abt2.style.transform = "translateX(-150%)";
  }

  if (kn1.getBoundingClientRect().top < triggerPoint) {
    kn1.style.opacity = 1;
  } else {
    kn1.style.opacity = 0;
  }

  if (kn2.getBoundingClientRect().top < triggerPoint) {
    kn2.style.transform = "translateX(0%)";
  } else {
    kn2.style.transform = "translateX(-150%)";
  }

  if (kn3.getBoundingClientRect().top < triggerPoint) {
    kn3.style.transform = "translateX(0%)";
  } else {
    kn3.style.transform = "translateX(150%)";
  }

  if (kn4.getBoundingClientRect().top < triggerPoint) {
    kn4.style.transform = "translateX(0%)";
  } else {
    kn4.style.transform = "translateX(-150%)";
  }

  if (kn5.getBoundingClientRect().top < triggerPoint) {
    kn5.style.transform = "translateX(0%)";
  } else {
    kn5.style.transform = "translateX(150%)";
  }

  if (actualSection == 2 || actualSection == 11) {
    if (scrollFraction >= 0.97) {
      slider.style.opacity = 1;
    } else if (scrollFraction < 0.97 && scrollFraction > 0.8) {
      const opacity = (scrollFraction - 0.8) / 0.2;
      slider.style.opacity = opacity.toFixed(2);
    } else {
      slider.style.opacity = 0;
    }
  }

  if (actualSection == 3 || actualSection == 12) {
    if (scrollFraction <= 0) {
      slider.style.opacity = 1;
    } else if (scrollFraction > 0 && scrollFraction <= 0.2) {
      const opacity = 1 - scrollFraction / 0.2;
      slider.style.opacity = opacity.toFixed(2);
    } else {
      slider.style.opacity = 0;
    }
  }
  if (actualSection == 0) {

    
    if (scrollFraction >= 0.6) {
      const blurValue = ((scrollFraction - 0.6) / 0.2) * 40;
      movie.style.filter = `blur(${blurValue.toFixed(2)}px)`;
    } else {
      movie.style.filter = "blur(0px)";
    }
  } else if (actualSection == 1) {
    if (scrollFraction <= 0.2) {
      const blurValue = ((0.2 - scrollFraction) / 0.2) * 40;
      movie.style.filter = `blur(${blurValue.toFixed(2)}px)`;
    } else {
      movie.style.filter = "blur(0px)";
    }

    if (scrollFraction >= 0.05 && scrollFraction <= 0.95) {
      const translateX = ((scrollFraction - 0.05) / 0.9) * 400 - 200;

      abTitle.style.transform = `translate(${translateX}%, -50%)`;
      abTitle.style.position = "fixed";
    } else {
      abTitle.style.position = "absolute";
    }

    if (scrollFraction < 0.05) {
      abTitle.style.transform = `translate(-200%, -50%)`;
    } else if (scrollFraction > 0.95) {
      abTitle.style.transform = `translate(200%, -50%)`;
    }
  } else if (actualSection == 3) {
    if (scrollFraction >= 0.05 && scrollFraction <= 0.95) {
      const translateX = ((scrollFraction - 0.05) / 0.9) * 400 - 200;

      knTitle.style.transform = `translate(${translateX}%, -50%)`;
      knTitle.style.position = "fixed";
    } else {
      knTitle.style.position = "absolute";
    }

    if (scrollFraction < 0.05) {
      knTitle.style.transform = `translate(-200%, -50%)`;
    } else if (scrollFraction > 0.95) {
      knTitle.style.transform = `translate(200%, -50%)`;
    }
  } else if (actualSection == 11) {
    if (scrollFraction >= 0.05 && scrollFraction <= 0.95) {
      const translateX = ((scrollFraction - 0.05) / 0.9) * 400 - 200;

      portfolioTitle.style.transform = `translate(${translateX}%, -50%)`;
      portfolioTitle.style.position = "fixed";
    } else {
      portfolioTitle.style.position = "absolute";
    }
  } else if (actualSection == 12) {
    if (scrollFraction < 0.2) {
      portfolioWrapper.style.opacity = 0;
      portfolioWrapper.style.transform = "scale(0)";
      portfolioWrapper.style.borderRadius = "50%";
    } else if (scrollFraction >= 0.2 && scrollFraction <= 0.8) {
      portfolioWrapper.style.opacity = 1;
      portfolioWrapper.style.transform = "scale(1)";
      portfolioWrapper.style.borderRadius = "0%";
    } else {
      portfolioWrapper.style.opacity = 0;
      portfolioWrapper.style.transform = "scale(0)";
      portfolioWrapper.style.borderRadius = "50%";
    }
  } else if (actualSection == 13) {
    if (scrollFraction >= 0.05 && scrollFraction <= 0.95) {
      const translateX = ((scrollFraction - 0.05) / 0.9) * 400 - 200;

      contactTitle.style.transform = `translate(${translateX}%, -50%)`;
      contactTitle.style.position = "fixed";
    } else {
      contactTitle.style.position = "absolute";
    }
  } else if (actualSection == 14) {
    if (scrollFraction < 0.2) {
      contactWrapper.style.opacity = 0;
      contactWrapper.style.transform = "scale(0)";
      contactWrapper.style.borderRadius = "50%";
    } else if (scrollFraction >= 0.2 && scrollFraction <= 0.8) {
      contactWrapper.style.opacity = 1;
      contactWrapper.style.transform = "scale(1)";
      contactWrapper.style.borderRadius = "0%";
    } else {
      contactWrapper.style.opacity = 0;
      contactWrapper.style.transform = "scale(0)";
      contactWrapper.style.borderRadius = "50%";
    }
  }

  if (actualSection == 12) {
    portfolioWrapper.style.position = "fixed";
  } else {
    portfolioWrapper.style.position = "relative";
  }

  if (actualSection == 14) {
    contactWrapper.style.position = "fixed";
  } else {
    contactWrapper.style.position = "relative";
  }
};
