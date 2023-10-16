import { z } from "zod";
import { adaptExcelRowValues } from "../../application/adapters/adapters";
import { schemaETT } from "../schemaValidators/schemaValidators";
import { TExcelData } from "../models/ImodelsIndex";

const zodError = (error: z.ZodError | unknown, index: number) => {
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

const validateExcelRow = async (data: unknown, index: number) => {
  try {
    const validatedData = await schemaETT.parseAsync(data);
    return {
      isRowValid: true,
      data: validatedData,
      errorMessage: null,
    };
  } catch (error) {
    const errorMessage = zodError(error, index);
    return {
      isRowValid: false,
      data: null,
      errorMessage: errorMessage,
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateExcelData = async (excelData: string | any[]) => {
  let isValid = true;
  let errorMsg: string | null = null;
  const validatedData: TExcelData[] = [];
  let index = 0;

  while (index < excelData.length && isValid) {
    const excelRow = excelData[index];
    const adaptedData = adaptExcelRowValues(excelRow);
    const { isRowValid, data, errorMessage } = await validateExcelRow(
      adaptedData,
      index
    );

    if (isRowValid && data !== null && data.date) {
      validatedData.push(data);
      index++;
    } else {
      isValid = false;
      errorMsg = errorMessage;
      validatedData.length = 0;
    }
  }

  return { validatedData, isValid, errorMsg };
};
