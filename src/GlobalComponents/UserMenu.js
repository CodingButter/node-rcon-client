import React, { useState, useEffect } from "react";
import userCommands from "bin/UserCommands";
import {
  Button,
  Paper,
  ButtonGroup,
  Grid,
  Typography,
} from "@material-ui/core";
var offsetAngle;

const UserMenu = ({ username, visible }) => {
  const [angle, updateAngle] = useState(parseFloat(1));
  const [radius, updateRadius] = useState(80);
  const targetAngle = 100;
  const handleUpdateAngle = () => {
    setInterval(() => {
      updateAngle((a) => (a + (a - targetAngle) / 8) / 8);
    }, 50);
  };
  useEffect(() => {
    handleUpdateAngle();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {visible &&
        userCommands.map((item, index) => {
          const { Component } = item;

          const itemAngle =
            (360 / userCommands.length) * index * (Math.PI / 180);

          return (
            <Paper
              style={{
                position: "absolute",
                zIndex: 5,
                top: Math.sin(itemAngle + angle) * radius + 30,
                left: Math.cos(itemAngle + angle) * radius - 85,
              }}
              key={index}
            >
              <Component username={username} />
            </Paper>
          );
        })}
    </div>
  );
};

export default UserMenu;
