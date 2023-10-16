// import { errorMessage } from "../../../transversal/error/errorController";
import { axiosAsync } from "../../../../shared/infrastructure/utilsInfraestructure";

const BASE_API_USERS = "/auth";

export async function loginUser(email: string, password: string) {
  try {
    let result = undefined;
    result = await axiosAsync.post(`${BASE_API_USERS}/loginUser`, {
      email: email,
      password: password,
    });
    if (result?.status !== 200) {
      // errorMessage("loginUser", result);
    } else {
      return result;
    }
  } catch (e) {
    // errorMessage("loginUser", e);
  }
  return undefined;
}
export async function logoutUser(email: string) {
  try {
    let result = undefined;
    result = await axiosAsync.post(`${BASE_API_USERS}/logoutUser`, {
      email: email,
    });
    if (result?.status !== 200) {
      // errorMessage("logoutUser", result);
    } else {
      return result;
    }
  } catch (e) {
    // errorMessage("logoutUser", e);
  }
  return undefined;
}
export async function updatePasswordUser(
  email: string,
  oldPassword: string,
  password: string
) {
  try {
    let result = undefined;
    result = await axiosAsync.post(`${BASE_API_USERS}/updatePasswordUser`, {
      email: email,
      oldPassword: oldPassword,
      password: password,
    });
    if (result?.status !== 200) {
      // errorMessage("updatePasswordUser", result);
    } else {
      return result;
    }
  } catch (e) {
    // errorMessage("updatePasswordUser", e);
  }
  return undefined;
}
export async function findUserByMailNotLogin(mail: string) {
  try {
    let result = undefined;
    result = await axiosAsync.post(`${BASE_API_USERS}/findUserNotLogin`, {
      filter: { email: mail },
    });
    if (result?.status !== 200) {
      // errorMessage("findUserByMailNotLogin", result);
    } else {
      return result;
    }
  } catch (e) {
    // errorMessage("findUserByMailNotLogin", e);
  }
  return undefined;
}
