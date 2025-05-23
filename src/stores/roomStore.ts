// src/stores/roomStore.ts
import { create } from 'zustand';
import type { Room } from '../types';

interface RoomState {
  rooms: Room[];
  socket: WebSocket | null;
  setRooms: (rooms: Room[]) => void;
  setSocket: (socket: WebSocket) => void;
  addRoom: (room: Room) => void;
  removeRoom: (roomId: string) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  socket: null,
  setRooms: (rooms) => set({ rooms }),
  setSocket: (socket) => set({ socket }),
  addRoom: (room) =>
    set((state) => {
      const exists = state.rooms.some((r) => r._id === room._id);
      if (exists) return state; // 👈 évite les doublons
      return { rooms: [...state.rooms, room] };
    }),
  removeRoom: (roomId) =>
    set((state) => ({
      rooms: state.rooms.filter((room) => room._id !== roomId),
    })),
}));
