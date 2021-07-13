const shortcuts = {};
var currentlyPressed = "";
export const addShortcut = (keys, callback) => {
  console.log({ keys, callback });
  shortcuts[keys.join("")] = callback;
};

document.addEventListener("keydown", (e) => {
  if (currentlyPressed !== e.key) {
    currentlyPressed += e.key;
    if (shortcuts[currentlyPressed]) {
      shortcuts[currentlyPressed]();
    }
  }
});
document.addEventListener("keyup", (e) => {
  currentlyPressed = "";
});
