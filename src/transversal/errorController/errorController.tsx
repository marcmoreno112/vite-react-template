import { z } from "zod";

export const importExcelErrorController = (
  error: z.ZodError | unknown,
  index: number
) => {
  let errorMessage = "";
  if (error instanceof z.ZodError) {
    const formatedError = error.format();
    const invalidCell = Object.keys(formatedError)[1];
    const zodErrorMsg = formatedError[invalidCell];
    if (invalidCell === "date") {
      errorMessage = `Validation failed: Excel row number: ${
        index + 2
      }, cell name: ${invalidCell}, Please introduce correct date format`;
    } else {
      errorMessage = `Validation failed: Excel row number: ${
        index + 2
      }, cell name: ${invalidCell}, ${zodErrorMsg._errors[0]}`;
    }
    console.log(errorMessage.toLowerCase());
    return errorMessage.toLowerCase();
  } else {
    return (errorMessage = `An unexpected error occurred`);
  }
};