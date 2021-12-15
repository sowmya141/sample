export interface FieldError {
    field: string;
    errorMessage: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileImage: string;
    designation: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface ModelResponse<T> {
    fieldErrors: FieldError[];
    errorMessage: string;
    success: boolean;
    data: T;
}

export interface LoginRequest {
    email: string;
    password: string;
}