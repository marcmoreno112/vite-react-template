import { z } from "zod";

const getCellValue = (
  excelRow: { [x: string]: string | number },
  key: string
) => {
  const isElement = Object.keys(excelRow).find((i) => i.includes(key));
  if (isElement) return excelRow[isElement];
};

export const convertSerialNumToJSDate = (serialNumber: number) => {
  const utcDays = Math.floor(serialNumber - 25569);
  const utcValue = utcDays * 86400;
  const dateInfo = new Date(utcValue * 1000);

  const fractionalDay = serialNumber - Math.floor(serialNumber) + 0.0000001;

  let totalSeconds = Math.floor(86400 * fractionalDay);

  const seconds = totalSeconds % 60;

  totalSeconds -= seconds;

  const hours = Math.floor(totalSeconds / (60 * 60));
  const minutes = Math.floor(totalSeconds / 60) % 60;

  const fullDate = new Date(
    dateInfo.getFullYear(),
    dateInfo.getMonth(),
    dateInfo.getDate(),
    hours,
    minutes,
    seconds
  );
  return fullDate;
};

export const getExcelRowValues = (excelRow: {
  [x: string]: string | number;
}) => {
  if (excelRow) {
    const data = {
      id: getCellValue(excelRow, "IDENTIFICADOR"),
      name: getCellValue(excelRow, "NOMBRE SUSTITUTO"),
      group: getCellValue(excelRow, "GRUPO"),
      department: getCellValue(excelRow, "DEP"),
      date: getCellValue(excelRow, "FECHA"),
    };
    return data;
  }
};

export const extractZodError = (error: z.ZodError | unknown, index: number) => {
  let errorMessage = "";
  if (error instanceof z.ZodError) {
    const zodError = error.issues[0];

    if (zodError.path[0] === "date" && zodError.message !== "Required") {
      errorMessage = `Validation failed: Excel row number: ${
        index + 2
      }, cell name: ${zodError.path[0]}, please introduce correct date format`;
    } else {
      errorMessage = `Validation failed: Excel row number: ${
        index + 2
      }, cell name: ${zodError.path[0]}, ${zodError.message}`;
    }

    return errorMessage.toLowerCase();
  } else {
    return (errorMessage = `An unexpected error occurred`);
  }
};
