import { extractZodError, getExcelRowValues } from "../helpers";
import { schemaETT } from "../schemaValidators/schemaValidators";
import { TExcelData } from "../models";

const validateExcelRow = async (data: unknown, index: number) => {
  try {
    const validatedData = await schemaETT.parseAsync(data);
    return {
      isRowValid: true,
      data: validatedData,
      errorMessage: null,
    };
  } catch (error) {
    const errorMessage = extractZodError(error, index);
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
    const adaptedData = getExcelRowValues(excelRow);
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
