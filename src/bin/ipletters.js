const alphaChars = "abcdefghijk".split("");
const chars = "0123456789.".split("");
const ipToLetters = (ip) => {
  const splitIp = ip.split("");
  return splitIp.map((ch) => alphaChars[chars.indexOf(ch)]).join("");
};
const lettersToIp = (letters) => {
  const splitLetters = letters.split("");
  return splitLetters.map((lc) => chars[alphaChars.indexOf(lc)]).join("");
};

module.exports = {
  ipToLetters,
  lettersToIp,
};
