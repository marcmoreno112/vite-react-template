import { axiosAsync } from "../../../../../shared/infrastructure/utilsInfraestructure";
import { TExcelData } from "../../domain/models";
// import { errorMessage } from "../../../transversal/error/errorController";

const BASE_API_USERS = "/api/workers";

export async function addDataExcel(data: TExcelData[]) {
  try {
    let result = undefined;
    result = await axiosAsync.post(`${BASE_API_USERS}/`, data);
    if (result?.status !== 200) {
      // errorMessage("addDataExcel", result);
    } else {
      return result;
    }
  } catch (e) {
    // errorMessage("addDataExcel", e);
  }
  return undefined;
}
export async function getDataStored(filter: { ettCode: string }) {
  try {
    let result = undefined;
    result = await axiosAsync.post(`${BASE_API_USERS}/getData`, {
      filter,
    });
    if (result?.status !== 200) {
      // errorMessage("getDataStored", result);
    } else {
      return result;
    }
  } catch (e) {
    // errorMessage("getDataStored", e);
  }
  return undefined;
}
export async function updateExcelItem(
  data: TExcelData,
  filter: { ettCode: string }
) {
  try {
    let result = undefined;
    result = await axiosAsync.post(`${BASE_API_USERS}/updateData`, {
      data,
      filter,
    });
    if (result?.status !== 200) {
      // errorMessage("updateExcelItem", result);
    } else {
      return result;
    }
  } catch (e) {
    // errorMessage("updateExcelItem", e);
  }
  return undefined;
}
export async function deleteExcelItem(filter: { ettCode: string }) {
  try {
    let result = undefined;
    result = await axiosAsync.post(`${BASE_API_USERS}/deleteData`, {
      filter,
    });
    if (result?.status !== 200) {
      // errorMessage("deleteExcelItem", result);
    } else {
      return result;
    }
  } catch (e) {
    // errorMessage("deleteExcelItem", e);
  }
  return undefined;
}
