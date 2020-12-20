import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
const API_URL = "https://codingbutter.com:2080/mcapi";

export default function SkinHead({ username }) {
  const [skinUrl, setSkinUrl] = useState(
    "https://static.wikia.nocookie.net/minecraft_gamepedia/images/f/f2/Alex_skin.png/revision/latest/scale-to-width-down/120?cb=20191231170222"
  );

  const randomDelay = Math.random() * 8;
  const panSpeed = 3 + Math.random() * 5;

  const useStyles = makeStyles((theme) => ({
    container: {
      border: "1px solid rgba(255,255,255,.7)",
      borderRadius: 5,
      padding: 0,
      display: "block",
      width: 80,
      height: 80,
      zIndex: 3,
      background: "white",
      overflow: "hidden",
      boxShadow: "-3px 3px 8px 2px rgba(0,0,0,.7)",
      animationDelay: `${randomDelay}s`,
      animation: `$shadowpan ${panSpeed}s ease-in-out infinite`,
      position: "relative",
      margin: theme.spacing(1)
    },
    canvas: {
      transform: "scale(10)",
      transformOrigin: "top",
      position: "absolute",
      zIndex: 3,
      top: 0,
      left: 40,
      animationDelay: `${randomDelay}s`,
      animation: `$panning ${panSpeed}s ease-in-out infinite`,
      imageRendering: "pixelated"
    },
    "@keyframes panning": {
      "0%": {
        left: 33,
        top: 0
      },
      "25%": {
        top: -5
      },
      "50%": {
        left: 22,
        top: 0
      },
      "75%": {
        top: -5
      },
      "100%": {
        left: 33,
        top: 0
      }
    },
    "@keyframes shadowpan": {
      "0%": {
        boxShadow: "-3px 3px 4px 3px rgba(0,0,0,.7)"
      },
      "50%": {
        boxShadow: "3px 3px 8px 2px rgba(0,0,0,.7)"
      },
      "100%": {
        boxShadow: "-3px 3px 4px 3px rgba(0,0,0,.7)"
      }
    },
    hidden: {
      display: "none"
    }
  }));
  const frame = useRef(document.createElement("div"));
  const canvas = useRef(document.createElement("canvas"));
  function addToCanvas({ target }) {
    const si = target;
    const cs = canvas.current;
    cs.width = 10;
    cs.height = 8;
    const gt = cs.getContext("2d");
    si.onload = () => {
      gt.imageSmoothingEnabled = false;
      gt.drawImage(si, 6, 8, 10, 8, 0, 0, 10, 8);
    };
  }

  useEffect(() => {
    //const skinImage = useRef(document.createElement("img"));
    //const si = skinImage.current;
    const cs = canvas.current;
    fetch(`${API_URL}/gethead?username=${username}`)
      .then((res) => res.json())
      .then((json) => {
        const imageUrl = json.textures.SKIN.url;
        setSkinUrl(imageUrl);
      });
  }, []);

  const classes = useStyles();
  return (
    <>
      <div ref={frame} className={classes.container}>
        <canvas ref={canvas} className={classes.canvas} />
        <img
          alt=""
          src={skinUrl}
          onLoad={addToCanvas}
          className={classes.hidden}
        />
      </div>
    </>
  );
}
