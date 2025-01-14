const loading = document.querySelector("#loading");
const loadingP = document.querySelector("#loading .loading-p");
const loadingProgress = document.querySelector(".progress");
const loadingProgressIn = document.querySelector(".progress-in");

export const removeLoading = () => {
  loading.style.visibility = "hidden";
};

let loadedAssets = 0;
const totalmb = 121;

export const setLoadedAssets = (mb) => {
  loadedAssets += mb;
  changeStatus();
};

export const preloadVideo = (movie, assets) => {
  return new Promise((resolve) => {
    movie.src = "./renders/3d.mp4";
    movie.loop = true;
    movie.muted = true;
    movie.preload = "auto";
    movie.onloadeddata = () => {
      setLoadedAssets(90);
      assets.push(movie);
      resolve(movie);
    };

    movie.load();
  });
};

export const changeStatus = () => {
  let percent = (loadedAssets / totalmb) * 100;
  let width = loadingProgress.clientWidth;

  let percentProgress = width * (percent / 100);

  loadingProgressIn.style.width = `${percentProgress.toFixed(0)}px`;
  loadingP.textContent = percent.toFixed(0);
};
