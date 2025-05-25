import {BASE_URL} from "@/constants";

export const fetcher = async <T>(endpoint: string, options?: RequestInit):Promise<T|null> => {
    const url = `${BASE_URL}${endpoint}`;
    try {
        const res = await fetch(url, {
            ...options, headers: {
                'Content-Type': 'application/json',
                ...(options?.headers || {}),
            },
        });
        const data= await res.json()
        return data as T;
    } catch (err) {
        console.log(err);
        return null;
    }
}