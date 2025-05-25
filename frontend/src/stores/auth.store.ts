import {create} from 'zustand';

type AuthState = {
    isAuthenticated: boolean;
    userId: string | null;
    setAuthenticated: (value: boolean, userId: string | null) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    userId: null,

    setAuthenticated: (value, userId) =>
        set({
            isAuthenticated: value,
            userId: value ? userId : null, // clear userId if logging out
        }),

    logout: () => set({isAuthenticated: false, userId: null}),
}));
