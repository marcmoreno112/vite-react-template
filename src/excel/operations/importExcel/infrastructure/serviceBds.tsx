import axios from "axios";
import { TExcelData } from "../shared/models/ImodelsIndex";

export const sendExcelDataToDB = async (data: TExcelData) => {
  try {
    if (data) {
      const response = await axios.post("http://127.0.0.1:3000/api/workers", {
        data: data,
      });
      return response;
    }
  } catch (error) {
    console.error("Error sending data to the server:", error);
    return error;
  }
};
