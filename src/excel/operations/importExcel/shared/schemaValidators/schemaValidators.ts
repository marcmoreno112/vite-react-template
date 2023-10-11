import { z } from "zod";
import { adaptSerialNumToJSDate } from "../adapters/adapters";

export const schemaETT = z.object({
  ettCode: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
  group: z.number().int(),
  department: z.number().int(),
  date: z
    .number()
    .transform((value: number) => {
      const fullDate = adaptSerialNumToJSDate(value);

      return fullDate instanceof Date ? fullDate : null;
    })
    .refine((date) => date !== null, {
      message: "Invalid date format",
    }),
});
