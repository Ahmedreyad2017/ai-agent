import {fetcher} from "@/lib/fetcher";
import {AuthResponse, LoginPayload, RegisterPayload} from "@/types/auth.interface";


export async function login(data: LoginPayload) {
    return await fetcher<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function register(data: RegisterPayload) {
    return await fetcher<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function logout() {
    return await fetcher<null>('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
