const API_URL = `https://api.mojang.com/users/profiles/minecraft`;

const userInfo = {};
export default function PlayerInfo() {
  return async function getInfoByUsername(userName) {
    return await fetch(`${API_URL}/${userName}`)
      .then((res) => res.json())
      .then((res) => {
        userInfo[userName] = res;
        return res;
      })
      .catch((error) => console.log(error));
  };
}
