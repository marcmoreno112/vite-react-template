import { useState } from "react";
import * as XLSX from "xlsx";
import { validateExcelData } from "../../domain/validators/validator";
import { addDataExcel } from "../serviceBds/serviceBds";

const readExcelData = (excelFile: string | ArrayBuffer) => {
  const workbook = XLSX.read(excelFile, { type: "buffer" });
  const worksheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[worksheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);
  return data;
};

export const useFileSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const sendExcelData = async (excelFile: string | ArrayBuffer | null) => {
    if (excelFile !== null) {
      setIsLoading(true);

      const decodedExcelData = readExcelData(excelFile);
      const { isValid, validatedData, errorMsg } = await validateExcelData(
        decodedExcelData
      );

      if (isValid) {
        const res = await addDataExcel(validatedData);

        setIsLoading(false);
        if (res?.status === 200) {
          setSuccess("Data sent");
        } else {
          // desde aquí se puede enviar el error (que es "res") a errorController de transversal
          setError("Error sending data to the server");
        }
      } else {
        setIsLoading(false);
        setError(errorMsg);
      }
    }
  };

  return { isLoading, error, setError, success, setSuccess, sendExcelData };
};
