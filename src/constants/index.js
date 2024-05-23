// import "../assets/"
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    return (images[item.replace("./", "")] = r(item));
  });
  return images;
}


export const appicons = importAll(
  require.context("../assets/icons", false, /\.(png|jpe?g|svg|webp)$/)
);

export const bgpics = importAll(
  require.context("../assets/bg", false, /\.(png|jpe?g|svg|webp)$/)
);

export const aboutpics = importAll(
  require.context("../assets/about", false, /\.(png|jpe?g|svg|webp)$/)
);
