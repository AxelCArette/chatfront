// src/hooks/useRoomSocket.ts
import { useEffect } from 'react';
import { useRoomStore } from '../stores/roomStore';

export const useRoomSocket = () => {
  const { setRooms, addRoom, removeRoom, setSocket, socket } = useRoomStore();

  useEffect(() => {
    const sock = new WebSocket('ws://localhost:8888/ws/rooms');

    sock.onopen = () => {
      setSocket(sock);
      sock.send(JSON.stringify({ action: 'get_rooms' }));
    };

    sock.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type || data.action) {
        case 'room_list':
          setRooms(data.rooms);
          break;
        case 'room_created':
          addRoom(data.room);
          break;
        case 'room_deleted':
          removeRoom(data.room_id);
          break;
        case 'error':
          console.warn('⚠️ WebSocket error:', data.message);
          break;
        default:
          console.log('🔁 WebSocket message reçu:', data);
      }
    };

    return () => {
      sock.close();
    };
  }, [setRooms, addRoom, removeRoom, setSocket]);

  const createRoom = (name: string, username: string) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    socket.send(
      JSON.stringify({
        action: 'create_room',
        room_name: name,
        username,
      })
    );
  };

  return { createRoom };
};
