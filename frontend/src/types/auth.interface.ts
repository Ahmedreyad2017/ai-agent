export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    name?: string;
}

export interface AuthResponse {
    userId: string;
    token: string; // Optional depending on your backend
}
