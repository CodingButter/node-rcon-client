import qs from "querystringify";

const API_ENDPOINT = "https://codingbutter.com:2080/rcon";

const fetchResults = async (endpoint, data) => {
  const queryString = qs.stringify(data);
  const apiUrl = `${API_ENDPOINT}${endpoint}?${queryString}`;
  return await fetch(apiUrl)
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default function RconClient() {
  async function connect({ host, port, password }) {
    return await fetchResults("/connect", { host, port, password });
  }

  function send({ uid, command }) {}

  function getResponse({ uid, lastResponceUid }) {}

  return {
    connect,
    send,
    getResponse
  };
}
