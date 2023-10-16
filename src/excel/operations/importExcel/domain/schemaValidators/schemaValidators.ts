import { z } from "zod";
import { adaptSerialNumToJSDate } from "../../application/adapters/adapters";

export const schemaETT = z.object({
  id: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
  group: z.number().int(),
  department: z.number().int(),
  date: z.number().transform((value: number) => {
    const fullDate = adaptSerialNumToJSDate(value);

    if (!(fullDate instanceof Date)) {
      throw new Error("Invalid date format");
    }
    return fullDate;
  }),
});
