export type Room = {
  _id: string;
  id?: string;
  name: string;
  created_by?: string;
  created_at?: string;
};

export type Message = {
  _id?: string;
  username: string;
  message: string;
  room_id?: string;
  timestamp?: string;
};

export type WebSocketMessage = {
  action: string;
  [key: string]: any;
};

export type ChatState = {
  rooms: Room[];
  messages: Message[];
  currentRoom: Room | null;
  username: string;
  
};