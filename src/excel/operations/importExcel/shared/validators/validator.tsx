import { adaptExcelRowValues } from "../adapters/adapters";
import { validateExcelRow } from "../helpers/helper";

export const validateExcelData = async (excelData: object[]) => {
  let isValid = true;
  let errorMsg: string | null = null;
  const validatedData = await Promise.all(
    excelData.map(async (excelRow, index) => {
      const adaptedData = adaptExcelRowValues(excelRow);
      const { isRowValid, data, errorMessage } = await validateExcelRow(
        adaptedData,
        index
      );
      if (!isRowValid) {
        isValid = false;
        errorMsg = errorMessage;
      }
      return data;
    })
  );

  return { validatedData, isValid, errorMsg };
};
