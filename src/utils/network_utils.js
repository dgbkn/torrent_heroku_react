import Axios from "axios";
import * as Constants from "../Constants";

const instance = Axios.create({ baseURL: Constants.BASE_URL, timeout: 10000 });

export async function getMagnetLink(website, torrent_url) {
  const url = `${website}_mg?url=${torrent_url}`;

  return new Promise(function (resolve, reject) {
    instance
      .get(url)
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export async function getTorrents(endpoint, search) {
  const url = `${endpoint}?search=${search}`;

  return new Promise(function (resolve, reject) {
    instance
      .get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
