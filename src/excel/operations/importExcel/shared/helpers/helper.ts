import { TExcelData, TFileChangeEvent } from "../models/ImodelsIndex";
import { schemaETT } from "../schemaValidators/schemaValidators";
import * as XLSX from "xlsx";
import { errorController } from "../controller/errorController";

export const getCellValue = (excelRow: object, key: string) => {
  const isElement = Object.keys(excelRow).find((i) => i.includes(key));
  if (isElement) return excelRow[isElement];
};

export const validateExcelRow = async (data: TExcelData, index: number) => {
  try {
    const validatedData = await schemaETT.parseAsync(data);
    return {
      isRowValid: true,
      data: validatedData,
      errorMessage: null,
    };
  } catch (error) {
    const errorMessage = errorController(error, data, index);
    return {
      isRowValid: false,
      data: null,
      errorMessage: errorMessage,
    };
  }
};

export const readExcelData = (excelFile: TFileChangeEvent) => {
  const workbook = XLSX.read(excelFile, { type: "buffer" });
  const worksheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[worksheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);
  return data;
};
