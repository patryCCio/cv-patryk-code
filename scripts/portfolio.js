import { setLoadedAssets } from "./loading.js";

const buttons = document.querySelectorAll(
  ".portfolio-wrapper .portfolio-buttons button"
);

const arrLeft = document.querySelector(".arr-left");
const arrRight = document.querySelector(".arr-right");

const imagesClient = [];
const imagesProjects = [];
const imagesGraphics = [];

const pActual = document.querySelector("#p-actual");
const pMax = document.querySelector("#p-max");
const pContent = document.querySelector("#p-content");
const pTitle = document.querySelector("#p-title");
const progressIn = document.querySelector(".portfolio-wrapper .progress-in");
const visit = document.querySelector("#visit");
const cv = document.querySelector("#button-1");

const imgContent = document.querySelector("#img-content");

const imgShow = document.querySelector("#img-show");
const imgShow2 = document.querySelector("#img-show-2");

const imgPortfolio = document.querySelector("#img-portfolio");

const cancelImg = document.querySelector("#cancel-img");
const cancelImg2 = document.querySelector("#cancel-img-2");

const portfolioContent = document.querySelector(".portfolio-content");

let maxItems = 0;
let actualIndex = 0;
let actualItem = 0;

const portfolioItems = [
  {
    name: "projects",
    items: [
      {
        id: 0,
        title: "Businness Tour",
        content:
          "Pierwsza zmagania z display flex. Rozwijalna lista w navbarze.",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 1,
        title: "Clock",
        content:
          "Zabawa ze stylami CSS oraz JavaScript. Zegar z aktualnym czasem.",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 2,
        title: "PROGAMERS",
        content: `Strona stworzona za pomocą bootstrap'a oraz przy pomocy kursu "Od zera do front-end developera cz.2" na Udemy.`,
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 3,
        title: "Library+",
        content:
          "Prosta strona internetowa, w której nauczyłem się podstaw JavaScript.",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 4,
        title: "CV Web Concept #1",
        content: "Moja koncepcja na stronę wizytówkę.",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 5,
        title: "SVG Social Animations",
        content:
          "Podstawowe animacje dla obiektów wektorowych. W tym przykładzie nauczyłem się w jaki sposób można animować obiekty SVG za pośrednictwem JS i CSS.",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 6,
        title: "LOVE-IT",
        content: `Nauka animacji typu "morph" za pomocą biblioteki anime-master, Adobe After Effects oraz animacja w CSS.`,
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 7,
        title: "ICE-GOOD",
        content:
          "Strona informacyjna wymyślonej przeze mnie firmy lodów. Wszystkie elementy graficzne oraz animacje stworzone przeze mnie.",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 8,
        title: "Climb for health!",
        content:
          "Strona informacyjna o podróżach w góry. Zabawa z animacjami SVG stworzonymi przeze mnie.",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 9,
        title: "CV Web Concept #2",
        content: "Poprzednia strona CV stworzona przy pomocy React'a.",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 10,
        title: "CV Web Concept #3",
        content:
          "Jedna z pierwszych zabaw animacją 3d. Strona stworzona przy pomocy ThreeJS, GSAP i Reacta.",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 11,
        title: "Population",
        content:
          "Zabawa z animacjami 3D oraz danymi dotyczącymi liczby ludności w konkretnym kraju.",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 12,
        title: "Netflix",
        content:
          "Kopia strony Netflixa stworzona przy pomocy React'a. https://netflix.com",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 13,
        title: "HBOMax",
        content:
          "Kopia strony HBOMax stworzona przy pomocy React'a. https://hbomax.com/pl/pl",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 14,
        title: "Disney+",
        content:
          "Kopia strony Disney+ stworzona przy pomocy React'a. https://disneyplus.com/pl-pl",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 15,
        title: "Screen Slider",
        content:
          "Przewijanie pomiędzy scenami w ThreeJS. Nauka vertex i fragment shader'ów (GLSL).",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 16,
        title: "Aqua Effect",
        content: "Nauka vertex i fragment shader'ów (GLSL).",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 17,
        title: "EnglishPRO",
        content: "Strona do nauki angielskiego oparta o React'a oraz Redux.",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 18,
        title: "EDIT-CONTENT",
        content:
          "Stworzony przeze mnie prosty edytor do blogów pozwalający dodawanie obrazów, filmików oraz rozmieszczenie ich w odpowiedniej kolejności. Do edycji tekstu użyłem biblioteki Editor.js.",
        hasLink: false,
        is_graphic: false,
        extension: "png",
      },
      {
        id: 19,
        title: "CV Web Concept #4",
        content: "Poprzednie portfolio oparte o animeJS oraz ThreeJS.",
        hasLink: true,
        link: "https://patryccio.github.io/patryk-cv",
        is_graphic: false,
        extension: "png",
      },
    ],
  },
  {
    name: "clients",
    items: [
      {
        id: 0,
        title: "ZHP Piastów",
        content:
          "Strona stworzona w oparciu o React'a, mój wcześniej utworzony edytor oraz elementy 3D. Do backend'u zastosowano NodeJS oraz MySQL.",
        hasLink: true,
        is_graphic: false,
        link: "https://rajdczarnobyl.pl",
        extension: "png",
      },
    ],
  },
  {
    name: "graphic",
    items: [
      {
        id: 0,
        title: "",
        content: "Dragon Ball - Goku SSJ",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 1,
        title: "",
        content: "Kościół Mariacki",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 2,
        title: "",
        content: "1 World Trade Center",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 3,
        title: "",
        content: "Fiat 126P",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 4,
        title: "",
        content: "Wieża Eiffla",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 5,
        title: "",
        content: "Domek zimą",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 6,
        title: "",
        content: "Crysis - prorok",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 7,
        title: "",
        content: "F-16",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 8,
        title: "",
        content: "Młody Goku",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 9,
        title: "",
        content: "Toyota Corolla",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 10,
        title: "",
        content: "Logo Neti Fashion Look",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 11,
        title: "",
        content: "Koncepcja kota",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 12,
        title: "",
        content: "Krajobraz gór",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 13,
        title: "",
        content: "Wyprzedaż Black Week",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 14,
        title: "",
        content: "Logo MV17",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 15,
        title: "",
        content: "Goku MUI",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 16,
        title: "",
        content: "Dragon Ball",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
      {
        id: 17,
        title: "",
        content: "Goku SSJ Blue",
        hasLink: false,
        is_graphic: true,
        extension: "jpg",
      },
    ],
  },
];

export const preloadImages = async () => {
  const preloadProjects = portfolioItems[0].items.map((el, index) => {
    return preloadImage("projects", index, el);
  });
  await Promise.all(preloadProjects);
  setLoadedAssets(19);

  const preloadClients = portfolioItems[1].items.map((el, index) => {
    return preloadImage("clients", index, el);
  });
  await Promise.all(preloadClients);
  setLoadedAssets(1);

  const preloadGraphics = portfolioItems[2].items.map((el, index) => {
    return preloadImage("graphics", index, el);
  });
  await Promise.all(preloadGraphics);
  setLoadedAssets(11);

  setItems();
};

const preloadImage = (state, index, el) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = "./assets/" + state + "/" + index + "." + el.extension;

    img.src = url;

    img.onload = () => {
      if (state === "projects") {
        imagesProjects.push({ id: index, img });
      } else if (state === "clients") {
        imagesClient.push({ id: index, img });
      } else if (state === "graphics") {
        imagesGraphics.push({ id: index, img });
      }
      resolve();
    };

    img.onerror = () => {
      reject(new Error(`Nie udało się załadować obrazu: ${url}`));
    };
  });
};

const changeState = (index) => {
  for (let x = 0; x < buttons.length; x++) {
    if (x == index) {
      buttons[x].classList.add("active");
    } else {
      buttons[x].classList.remove("active");
    }
  }

  actualItem = 0;
  actualIndex = index;
  maxItems = portfolioItems[index].items.length;

  setItems();
};

const setItems = () => {
  pMax.textContent = maxItems;
  pActual.textContent = actualItem + 1;
  pTitle.textContent = portfolioItems[actualIndex].items[actualItem].title;
  pContent.textContent = portfolioItems[actualIndex].items[actualItem].content;

  let progress = (actualItem + 1) / maxItems;
  progressIn.style.width = `${progress * 100}%`;

  let el;

  if (actualIndex == 0) {
    imagesProjects.forEach((el2) => {
      if (el2.id == actualItem) el = el2.img;
    });
  } else if (actualIndex == 1) {
    imagesClient.forEach((el2) => {
      if (el2.id == actualItem) el = el2.img;
    });
  } else {
    imagesGraphics.forEach((el2) => {
      if (el2.id == actualItem) el = el2.img;
    });
  }

  if (el) {
    imgContent.src = el.src;
    imgPortfolio.src = el.src;
  }

  if (maxItems == 1) {
    arrLeft.style.visibility = "hidden";
    arrRight.style.visibility = "hidden";
  } else {
    arrLeft.style.visibility = "visible";
    arrRight.style.visibility = "visible";
  }

  portfolioContent.classList.add("active");
  setTimeout(() => {
    portfolioContent.classList.remove("active");
  }, 500);
};

const changeItem = (state) => {
  if (maxItems == 1) return;
  if (state == "right") {
    if (actualItem == maxItems - 1) {
      actualItem = 0;
    } else actualItem++;
  } else {
    if (actualItem == 0) {
      actualItem = maxItems - 1;
    } else actualItem--;
  }

  setItems();
};

export const initPortfolio = () => {
  changeState(0);
};

buttons.forEach((el, index) => {
  el.addEventListener("click", () => changeState(index));
});

const handleLeftClick = () => changeItem("left");
const handleRightClick = () => changeItem("right");

arrLeft.removeEventListener("click", handleLeftClick);
arrRight.removeEventListener("click", handleRightClick);

arrLeft.addEventListener("click", handleLeftClick);
arrRight.addEventListener("click", handleRightClick);

cancelImg.addEventListener("click", () => {
  imgShow.style.transform = "scale(0)";
  imgShow.style.visibility = "visible";
});

cancelImg2.addEventListener("click", () => {
  imgShow2.style.transform = "scale(0)";
  imgShow2.style.visibility = "visible";
});

cv.addEventListener("click", () => {
  imgShow2.style.transform = "scale(1)";
  imgShow2.style.visibility = "visible";
});

visit.addEventListener("click", () => {
  let pItem = portfolioItems[actualIndex].items[actualItem];
  let url;

  if (pItem.hasLink) {
    url = pItem.link;
    window.open(url, "_blank");
  } else {
    if (!pItem.is_graphic) {
      url = "./projects/kat" + actualItem + "/index.html";
      window.open(url, "_blank");
    } else {
      imgShow.style.transform = "scale(1)";
      imgShow.style.visibility = "visible";
    }
  }
});
