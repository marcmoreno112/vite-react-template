import axios from "axios";
import { TExcelData } from "../../domain/models/ImodelsIndex";

export const sendExcelDataToDB = async (data: TExcelData[]) => {
  try {
    if (data.length !== 0) {
      const response = await axios.post("http://127.0.0.1:3000/api/workers", {
        data: data,
      });
      return response.status;
    }
  } catch (error) {
    return error;
  }
};
