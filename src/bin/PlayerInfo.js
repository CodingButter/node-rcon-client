const API_URL = `https://api.mojang.com/users/profiles/minecraft`;

export default async function PlayerInfo(username) {
  const resp = await fetch(`${API_URL}/${username}`);
  return await resp.json();
}
