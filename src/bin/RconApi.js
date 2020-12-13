import qs from "querystringify";

const API_ENDPOINT = "http://api.codingbutter.com:2080/rcon";

const fetchResults = async (endpoint, data) => {
  const queryString = qs.stringify(data);
  const apiUrl = `${API_ENDPOINT}${endpoint}?${queryString}`;
  console.log({ apiUrl });
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
  async function connect({ host, ip, port, password }) {
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
