import { create } from 'zustand';
import axios from '../api/api-request';
import { toast } from 'react-toastify';

interface ParkingSession {
    _id: string
    startTime: string
    endTime?: string
    price?: number
    area: {
        name: string
        city: { name: string }
    }
}

interface ParkingStore {
  session: ParkingSession | null
  loading: boolean
  allSessions: ParkingSession[]
  activeSession: ParkingSession | null
  stopParking: () => Promise<void>
  startParking: () => Promise<void>
  fetchAllSessions: () => Promise<void>
  fetchActiveSession: () => Promise<void>
}

export const useParkingStore = create<ParkingStore>((set) => ({
  session: null,
  loading: false,
  allSessions: [],
  activeSession: null,

  startParking: async () => {
    try {
      set({ loading: true });
      const selectedArea = localStorage.getItem('selectedArea');
      if (!selectedArea) throw new Error('No area selected');
      const res = await axios.post('/start-parking', { areaId: selectedArea });
      set({ activeSession: res.data.session });
      toast.success('Parking started');
    } catch (err) {
      toast.error('Failed to start parking');
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  stopParking: async () => {
    try {
      set({ loading: true });
      const res = await axios.post('/stop-parking');
      set({ session: res.data.session, activeSession: null });
      toast.success('Parking stopped!');
    } catch (err) {
      toast.error('Failed to stop parking');
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  fetchAllSessions: async () => {
    try {
      const res = await axios.get('/parkings');
      set({ allSessions: res.data });
    } catch (err) {
      toast.error('Failed to load parking history');
      console.error(err);
    }
  },

  fetchActiveSession: async () => {
    try {
      const res = await axios.get('/parkings');
      const active = res.data.find((s: any) => !s.endTime);
      set({ activeSession: active || null });
    } catch (err) {
      console.error('Failed to fetch active session', err);
    }
  }
}));
