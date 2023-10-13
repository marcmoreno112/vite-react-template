import { useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { validateExcelData } from "../../domain/validators/validator";
import { sendExcelDataToDB } from "../../infrastructure/serviceBds/serviceBds";

const readExcelData = (excelFile: string | ArrayBuffer) => {
  const workbook = XLSX.read(excelFile, { type: "buffer" });
  const worksheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[worksheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);
  return data;
};

export const useFileSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendExcelData = async (excelFile: string | ArrayBuffer | null) => {
    if (excelFile !== null) {
      setIsLoading(true);

      try {
        const decodedExcelData = await readExcelData(excelFile);
        const { isValid, validatedData, errorMsg } = await validateExcelData(
          decodedExcelData
        );

        if (isValid) {
          const res = sendExcelDataToDB(validatedData);
          if (res.status === 200) {
            toast.success("Data sent");
          } else {
            toast.error("Error sending data to the server");
          }
        } else {
          toast.error(errorMsg);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }

      setIsLoading(false);
    }
  };

  return { isLoading, sendExcelData };
};
