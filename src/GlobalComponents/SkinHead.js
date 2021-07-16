import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
const API_URL = `${process.env.REACT_APP_API_ENDPOINT}/mcapi`;

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
    animationDelay: `3s`,
    animation: `$shadowpan 6s ease-in-out infinite`,
    position: "relative",
    margin: theme.spacing(1),
  },
  canvas: {
    transform: "scale(10)",
    transformOrigin: "top",
    position: "absolute",
    zIndex: 3,
    top: 0,
    left: 40,
    animationDelay: `3s`,
    animation: `$panning 6s ease-in-out infinite`,
    imageRendering: "pixelated",
  },
  "@keyframes panning": {
    "0%": {
      left: 33,
      top: 0,
    },
    "25%": {
      top: -5,
    },
    "50%": {
      left: 22,
      top: 0,
    },
    "75%": {
      top: -5,
    },
    "100%": {
      left: 33,
      top: 0,
    },
  },
  "@keyframes shadowpan": {
    "0%": {
      boxShadow: "-3px 3px 4px 3px rgba(0,0,0,.7)",
    },
    "50%": {
      boxShadow: "3px 3px 8px 2px rgba(0,0,0,.7)",
    },
    "100%": {
      boxShadow: "-3px 3px 4px 3px rgba(0,0,0,.7)",
    },
  },
  hidden: {
    display: "none",
  },
}));

export default function SkinHead({
  username,
  animationDuration,
  animationDelay,
}) {
  const [skinUrl, setSkinUrl] = useState(
    "https://www.minecraftskins.com/uploads/skins/2020/12/18/my-hero-from-my-hero-academia-16092829.png?v302"
  );
  const frame = useRef(document.createElement("div"));
  const canvas = useRef(document.createElement("canvas"));
  function addToCanvas({ target }) {
    const si = target;
    const cs = canvas.current;
    cs.width = 10;
    cs.height = 8;
    const gt = cs.getContext("2d");
    gt.imageSmoothingEnabled = false;
    gt.drawImage(si, 6, 8, 10, 8, 0, 0, 10, 8);
  }

  useEffect(() => {
    fetch(`${API_URL}/gethead?username=${username}`)
      .then((res) => res.json())
      .then((json) => {
        const imageUrl = json.textures.SKIN.url;

        setSkinUrl(imageUrl);
      });
  }, [username]);

  const classes = useStyles();

  return (
    <>
      <Container
        ref={frame}
        style={{
          animationDuration: `${animationDuration}`,
          animationDelay: `${animationDelay}s`,
        }}
        title={username}
        className={classes.container}
      >
        <canvas
          style={{
            animationDuration: `${animationDuration}`,
            animationDelay: `${animationDelay}s`,
          }}
          ref={canvas}
          className={classes.canvas}
        />
        <img
          alt=""
          src={skinUrl}
          onLoad={addToCanvas}
          className={classes.hidden}
        />
      </Container>
    </>
  );
}
