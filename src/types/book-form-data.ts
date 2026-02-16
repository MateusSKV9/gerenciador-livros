import type z from "zod";
import type { BookSchema } from "../schemas/bookSchema";

export type BookFormData = z.infer<typeof BookSchema>;
