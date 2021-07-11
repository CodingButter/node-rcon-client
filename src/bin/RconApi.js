import qs from "querystringify";

const API_ENDPOINT = "https://chatstyler.tk:2080/rcon";

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

function RconClient() {
  async function connect({ host, port, password }) {
    return await fetchResults("/connect", { host, port, password });
  }

  async function send({ uid, command }) {
    return await fetchResults("/send", { uid, command });
  }

  async function getResponse({ uid }) {
    return await fetchResults("/response", { uid });
  }

  async function getStatus({ uid }) {
    return await fetchResults("/status", { uid });
  }

  return {
    connect,
    send,
    getResponse,
    getStatus,
  };
}
export default RconClient();
