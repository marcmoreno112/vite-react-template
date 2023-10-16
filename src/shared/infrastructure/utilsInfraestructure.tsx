// import {errorMessage} from "../../transversal/error/errorController";
import axios from "axios";

const tpdmApi = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "127.0.0.1:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosAsync = {
  get: async (url: string) =>
    await tpdmApi
      .get(url)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      }),
  post: (url: string, body: string[]) => {
    return {
      status: 200,
      body,
      url,
    };
  },

  // post: async (url, body) =>
  //   await tpdmApi
  //     .post(url, body)
  //     .then((result) => {
  //       return result;
  //     })
  //     .catch((error) => {
  //       return error;
  //     }),
  delete: async (url: string) =>
    await tpdmApi
      .delete(url)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      }),
  upload: async (url: string, body: string[]) =>
    await tpdmApi
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      }),
};

async function refreshToken() {
  try {
    let result = undefined;
    result = await axiosAsync.get("tokensStatusCase/refreshToken");
    if (result?.status !== 200) {
      // errorMessage("refreshToken", result);
    } else {
      return result.data;
    }
  } catch (e) {
    // errorMessage("refreshToken", e);
  }
  return undefined;
}

export const isAuthenticated = async () => {
  const res = await refreshToken();
  if (res === undefined) {
    return false;
  } else {
    return res;
  }
};
