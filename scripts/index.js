import { options } from "./sections.js";
import { checkAnimation } from "./animations.js";
import { initPortfolio, preloadImages } from "./portfolio.js";
import { preloadVideo, removeLoading } from "./loading.js";

const movie = document.querySelector("#video-threed");

const sections = document.querySelectorAll("section");
const holdingInfoGroup = document.querySelector(".holding-info-group");

const slider = document.querySelector("#slider");

let actualSection = 0;
let prevSection = 0;
let isChangeOptions = true;
let prevFraction = 0;

const assets = [];
const updateDots = () => {
  const windowHeight = window.innerHeight;

  let groupNumber = sections[actualSection].className
    .split(" ")[1]
    .replace("group-", "");

  groups.forEach((group, index) => {
    const groupSections = [...sections].filter((section) =>
      section.classList.contains(group)
    );

    const groupTop = Math.min(...groupSections.map((sec) => sec.offsetTop));
    const groupBottom = Math.max(
      ...groupSections.map((sec) => sec.offsetTop + sec.offsetHeight)
    );
    const groupHeight = groupBottom - groupTop;

    const rectTop = groupTop - window.scrollY;
    const rectBottom = rectTop + groupHeight;

    const dot = holdingInfoGroup.querySelector(`.dot[data-index="${index}"]`);
    const lineInner = dot.parentNode.querySelector(".line-inner");

    if (rectTop <= windowHeight / 2 && rectBottom >= windowHeight / 2) {
      dot.classList.add("active");

      const progress = Math.min(
        1,
        Math.max(0, (windowHeight / 2 - rectTop) / groupHeight)
      );

      if (lineInner) {
        if (window.innerWidth < 1024) {
          lineInner.style.height = "2px";
          lineInner.style.width = `${progress * 100}%`;
        } else {
          lineInner.style.height = `${progress * 100}%`;
          lineInner.style.width = "2px";
        }
      }
    } else {
      dot.classList.remove("active");

      if (lineInner) {
        if (index >= groupNumber) {
          lineInner.style.height = "0%";
          lineInner.classList.remove("visited");
        } else {
          lineInner.style.height = `100%`;
          lineInner.classList.add("visited");
        }

        if (index == 0 && groupNumber == 0) {
          lineInner.classList.remove("visited");
        }
      }
    }

    if (index < groupNumber) {
      dot.classList.add("visited");
    } else {
      dot.classList.remove("visited");
    }
  });
};

const preloadAssets = async () => {
  await preloadImages();
  const preloadPromises = [preloadVideo(movie, assets)];
  await Promise.all(preloadPromises);

  removeLoading();
};

const groups = Array.from(
  new Set(
    [...sections].map((section) => {
      const groupClass = Array.from(section.classList).find((cls) =>
        cls.startsWith("group-")
      );
      return groupClass;
    })
  )
).filter(Boolean);
groups.forEach((group, index) => {
  const dotContainer = document.createElement("div");
  dotContainer.classList.add("dot-container");

  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.dataset.index = index;

  const sectionWithGroup = [...sections].find((section) =>
    section.classList.contains(group)
  );

  if (sectionWithGroup) {
    const text = document.createElement("span");
    text.classList.add("group-name");
    text.textContent = sectionWithGroup.getAttribute("data-name");
    dot.appendChild(text);

    dot.addEventListener("click", () => {
      const groupTop = sectionWithGroup.offsetTop;
      window.scrollTo({
        top: groupTop,
        behavior: "smooth",
      });
    });
  }

  dotContainer.appendChild(dot);

  if (index < groups.length - 1) {
    const line = document.createElement("div");
    const lineInner = document.createElement("div");

    line.classList.add("line");
    lineInner.classList.add("line-inner");
    line.appendChild(lineInner);
    dotContainer.appendChild(line);
  }

  holdingInfoGroup.appendChild(dotContainer);
});

const setOptions = (state) => {
  if (assets.length == 0) {
    preloadAssets();
  } else {
    checkAnimation(sections, actualSection, null, movie, slider);
  }

  let ct =
    state == "up" ? options[actualSection].to : options[actualSection].from;

  movie.load();

  if (!state) ct = options[actualSection].from;

  if (options[actualSection].type == "movies") {
    movie.play();
    movie.loop = true;
    movie.muted = true;

    movie.currentTime = ct;

    movie.ontimeupdate = () => {
      if (movie.currentTime.toFixed(2) >= options[actualSection].to - 0.3) {
        movie.currentTime = options[actualSection].from;
      }
    };
  } else {
    movie.pause();
    movie.muted = true;
    movie.loop = false;
    movie.currentTime = ct;
    movie.ontimeupdate = null;
  }
};

const checkActualSection = () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  let changing = false;

  sections.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    const sectionTop = rect.top + scrollY;
    const sectionBottom = sectionTop + el.offsetHeight;

    const viewportMiddle = scrollY + viewportHeight / 2;
    if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
      actualSection = index;
    }
  });

  let state;

  if (prevSection != actualSection) {
    if (prevSection > actualSection) {
      state = "up";
    } else {
      state = "down";
    }
    isChangeOptions = true;
    prevSection = actualSection;
  }

  if (isChangeOptions) {
    isChangeOptions = false;
    changing = true;
    setOptions(state);
  }

  return changing;
};

let lastExecution = 0;

const throttleTime = /Mobi|Android/i.test(navigator.userAgent) ? 50 : 30;

const onScroll = () => {
  const now = Date.now();

  if (now - lastExecution >= throttleTime) {
    performScrollActions();
    lastExecution = now;
  }
};

const performScrollActions = () => {
  const activeSection = sections[actualSection];

  const sectionTop = activeSection.offsetTop;
  const sectionHeight = activeSection.offsetHeight;

  const scrollTopInSection =
    window.scrollY - sectionTop + window.innerHeight / 2;

  let scrollFraction = scrollTopInSection / sectionHeight;
  scrollFraction = Math.min(1, Math.max(0, scrollFraction));

  const changing = checkActualSection();
  updateDots();

  if (!changing) {
    if (scrollFraction != prevFraction) {
      prevFraction = scrollFraction;

      if (options[actualSection].type === "sequences") {
        const from = options[actualSection].from;
        const to = options[actualSection].to;
        const duration = to - from;

        movie.currentTime = from + duration * scrollFraction;
      }
    }

    checkAnimation(sections, actualSection, scrollFraction, movie, slider);
  }
};

const spans = document.querySelectorAll("span.welcome-text");
window.addEventListener("scroll", onScroll);

const init = () => {
  onScroll();
  initPortfolio();

  spans.forEach((el) => {
    el.classList.add("active");
  });

  setTimeout(() => {
    spans.forEach((el) => {
      el.style.transition = "0.3s 0s";

      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;
        const distanceX = e.clientX - elCenterX;
        const distanceY = e.clientY - elCenterY;
    
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
        // Maksymalne przesunięcie
        const maxOffset = 120;
    
        // Im bliżej środka literki, tym większa reakcja
        const strength = Math.min(maxOffset / distance, maxOffset);
    
        const offsetX = (distanceX / distance) * strength;
        const offsetY = (distanceY / distance) * strength;
    
        el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    
      el.addEventListener("mouseleave", () => {
        el.style.transform = `translate(0, 0)`;
      });
    });
  }, 2000);
};

init();
