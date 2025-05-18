import { create } from 'zustand';
import axios from '../api/api-request';
import { toast } from 'react-toastify';

interface City {
    _id: string
    name: string
}

interface Area {
    _id: string
    name: string
}

interface CityStore {
    cities: City[]
    areas: Area[]
    selectedCity: string
    selectedArea: string
    fetchCities: () => Promise<void>
    fetchAreas: (cityId: string) => Promise<void>
    setCity: (id: string) => void
    setArea: (id: string) => void
    startParking: () => Promise<void>
}

export const useCityStore = create<CityStore>((set, get) => ({
    cities: [],
    areas: [],
    selectedCity: '',
    selectedArea: '',
    fetchCities: async () => {
        const res = await axios.get('/cities');
        set({ cities: res.data });
    },
    fetchAreas: async (cityId) => {
        const res = await axios.get(`/cities/${cityId}/areas`);
        set({ areas: res.data });
    },
    setCity: (id) => set({ selectedCity: id, selectedArea: '', areas: [] }),
    setArea: (id) => set({ selectedArea: id }),
    startParking: async () => {
        const { selectedArea } = get();
        if (!selectedArea) {
            return;
        }

        await axios.post('/start-parking', { areaId: selectedArea });
        toast.success('Parking started');
    }
}))
