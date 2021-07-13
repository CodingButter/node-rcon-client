import qs from "querystringify";

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/rcon`;

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
  async function getConsoleData(tunnel, Authentication) {
    tunnel = "https://gikejkbehkbbg.loca.lt";
    const resp = await fetch(`${tunnel}/control`, {
      headers: { Authentication },
    });
    return await resp.json();
  }

  async function getIp(ipdomain) {
    const regexExp =
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    if (regexExp.test(ipdomain)) return ipdomain;
    const data = await fetch(
      `https://api.ipapi.com/${ipdomain}?access_key=1c0da03999c95740403bc2d42d0f075b`,
      { ipdomain }
    );
    const jsonIp = await data.json();
    return jsonIp.ip;
  }

  return {
    connect,
    send,
    getResponse,
    getStatus,
    getConsoleData,
    getIp,
  };
}
export default RconClient();
