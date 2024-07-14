import { create } from 'zustand'
import { type Notification } from '../types/type'

interface State {
    data: Notification[]
    loading: boolean
    error: unknown;
    fetchData: () => void
    removeNotification: (id: number) => void
    updateNotificationRead: (id: number, read: boolean) => void
    getTotal: () => number
    token: ""
}

export const useNotificationStore = create<State>()((set, get) => {
    return {
        data: [],
        loading: true,
        error: null,
        token: "",

        fetchData: async () => {
            set({ loading: true });
            try {

                const responseToken = await fetch("http://localhost:3000/auth/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: "user",
                        password: "123456"
                    }),
                });
                if (!responseToken.ok) throw new Error(`HTTP error! status: ${responseToken.status}`);
                const tok = await responseToken.json();
                const token = tok.access_token

                set({ token });

                const response = await fetch("http://localhost:3000/notification/system",
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                set({ data, loading: false });
            } catch (error) {
                set({ error: error/* .message */, loading: false });
            }
        },
        removeNotification: async (id: number) => {
            set({ loading: true });
            try {
                const { token } = get()
                const response = await fetch(`http://localhost:3000/notification/system/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                set({ loading: false });
                const { fetchData } = get()
                fetchData()
            } catch (error) {
                set({ error: error/* .message */, loading: false });
            }

        },
        updateNotificationRead: async (id: number, read: boolean) => {
            set({ loading: true });
            try {
                const { token } = get()
                const response = await fetch(`http://localhost:3000/notification/system/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        read
                    }),
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                set({ loading: false });
                const { fetchData } = get()
                fetchData()
            } catch (error) {
                set({ error: error/* .message */, loading: false });
            }

        },
        getTotal: (): number => {
            const { data } = get();
            return data.length

        },
    }
})