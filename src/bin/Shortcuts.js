const shortcuts = {};
const currentlyPressed = [];
export const addShortcut = (keys, callback) => {
  shortcuts[keys.join("+")] = callback;
};
document.addEventListener("keydown", (e) => {
  const keynum = e.key || e.keyIdentifier || e.keyCode;

  currentlyPressed[String.fromCharCode(keynum)] = true;
  const pressed = Object.keys(currentlyPressed)
    .filter((key) => {
      return currentlyPressed[key] == true;
    })
    .join("+");
  if (shortcuts[pressed]) shortcuts();
});
document.addEventListener("keyup", (e) => {
  const keynum = e.key || e.keyIdentifier || e.keyCode;
  currentlyPressed[String.fromCharCode(keynum)] = false;
});
