import { useEffect, useRef, useState } from "react";
import type { Room } from "../types";

export function useChatSocket(username: string) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8888/ws/chat");

    socketRef.current.onopen = () => {
      socketRef.current?.send(JSON.stringify({ action: "get_rooms" }));
    };

    socketRef.current.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      switch (data.action) {
        case "rooms_list":
          setRooms(data.rooms);
          break;

        case "room_created":
          if (data.room) {
            setRooms((prev) => [...prev, data.room]);
            setActiveRoomId(data.room._id); // deviens actif direct
          }
          break;

        case "room_deleted":
          setRooms((prev) => prev.filter((room) => room._id !== data.room_id));
          if (activeRoomId === data.room_id) {
            setActiveRoomId(null); // on reset si le salon actif est supprimé
          }
          break;

      }
    };

    return () => socketRef.current?.close();
  }, [activeRoomId]);

  const createRoom = (name: string) => {
    if (!name.trim()) return;
    socketRef.current?.send(
      JSON.stringify({
        action: "create_room",
        room_name: name,
        username,
      })
    );
  };

  const deleteRoom = (room_id: string) => {
    socketRef.current?.send(
      JSON.stringify({
        action: "delete_room",
        room_id,
        username,
      })
    );
  };

  return {
    rooms,
    activeRoomId,
    setActiveRoomId,
    createRoom,
    deleteRoom,
    socket: socketRef.current,
  };
}
