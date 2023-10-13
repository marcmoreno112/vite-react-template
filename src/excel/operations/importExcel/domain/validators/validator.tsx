import { importExcelErrorController } from "../../../../../transversal/errorController/errorController";
import { adaptExcelRowValues } from "../../application/adapters/adapters";
import { TExcelData } from "../models/ImodelsIndex";
import { schemaETT } from "../schemaValidators/schemaValidators";

const validateExcelRow = async (data: TExcelData, index: number) => {
    try {
      const validatedData = await schemaETT.parseAsync(data);
      return {
        isRowValid: true,
        data: validatedData,
        errorMessage: null,
      };
    } catch (error) {
      const errorMessage = importExcelErrorController(error, index);
      return {
        isRowValid: false,
        data: null,
        errorMessage: errorMessage,
      };
    }
  };

export const validateExcelData = async (excelData: object[]) => {
    let isValid = true;
    let errorMsg: string | null = null
    const validatedData = await Promise.all(
      excelData.map(async (excelRow, index) => {
        const adaptedData = adaptExcelRowValues(excelRow);
        const { isRowValid, data, errorMessage } = await validateExcelRow(adaptedData, index);
        if (!isRowValid) {
          isValid = false;
          errorMsg = errorMessage
        }
        return data;
      })
    );
  
    return { validatedData, isValid, errorMsg };
  };


  