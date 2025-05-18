import { create } from 'zustand';
import axios from '../api/api-request';

type User = {
    _id: string;
    email: string;
    fullName: string;
    address: string;
    carPlate: string;
}

interface AuthStore {
    user: User | null
    token: string | null
    login: (email: string, carPlate: string) => Promise<boolean>
    logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),

    login: async (email, carPlate) => {
        try {
            const res = await axios.post('/login', { email, carPlate });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            set({ user: res.data.user, token: res.data.token });
            return true;
        } catch (err) {
            console.error('Login error', err);
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null });
    }
}))
