import { useEffect, useRef, useState } from "react";
import type { Room } from "../types";

export function useChatSocket() {
  const [rooms, setRooms] = useState<Room[]>([]);
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
          setRooms((prev) => [...prev, data]);
          break;
      }
    };

    return () => socketRef.current?.close();
  }, []);

  const createRoom = (name: string) => {
    if (!name.trim()) return;
    socketRef.current?.send(JSON.stringify({ action: "create_room", name }));
  };

  return {
    rooms,
    createRoom,
    socket: socketRef.current,
  };
}
