import { toast } from "react-toastify";
import { readExcelData } from "../helpers/helper";
import { TFileChangeEvent } from "../models/ImodelsIndex";
import { validateExcelData } from "../validators/validator";
import { sendExcelDataToDB } from "../../infrastructure/serviceBds";

const handleFileSubmit = (excelFile: TFileChangeEvent) => {
  if (excelFile !== null) {
    const decodedExcelData = readExcelData(excelFile);
    const isExcelDataValid = validateExcelData(decodedExcelData);
    isExcelDataValid.then((res) => {
      const { isValid, validatedData, errorMsg } = res;
      if (isValid) {
        const sendDataToDB = sendExcelDataToDB(validatedData);
        sendDataToDB.then((res) => {
          if (res.status == 200) {
            toast.success("data sent");
          } else {
            toast.error("Error sending data to the server");
          }
        });
      } else {
        toast.error(errorMsg);
      }
    });
  }
};

export default handleFileSubmit;
