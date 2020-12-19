import React from "react";

const API_URL = `https://codingbutter.com/mcapi/`;

async function getCanvas(image_url) {
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
      resolve(canvas);
    };
  });
}

async function getPlayerInfo(username) {
  return await fetch(`${API_URL}/gethead?username=${username}`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
}

export default function SkinHead({ username }) {
  console.log(getPlayerInfo(username));
  return <div></div>;
}
