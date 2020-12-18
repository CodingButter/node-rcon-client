export default async function getSkinHead(image_url) {
  const skinImage = new Image();
  skinImage.crossOrigin = "Anonymous";
  skinImage.src = image_url;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const gt = canvas.getContext("2d");
    skinImage.onload = () => {
      gt.drawImage(skinImage, 0, 0, 64, 64);
      const resp = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      resolve(resp);
    };
  });

  //.replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.
}
