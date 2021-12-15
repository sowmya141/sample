import { FieldError } from "./User";

export interface ModelResponse<T> {
    fieldErrors: FieldError[];
    errorMessage: string;
    success: boolean;
    data: T;
}