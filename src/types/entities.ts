interface IUser {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  session?: ISession;
  createdRooms: IRoom[];
  joinedRooms: IRoom[];
  messages: IMessage[];
  lastJoinedRoom?: string;
}

interface ISession {
  id: string;
  userId: string;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

interface IRoom {
  id: string;
  status: string;
  topic: string;
  description: string;
  codeContent: string;
  isProtected: boolean;
  passcode?: string;
  language: string;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  owner: IUser;
  members: IUser[];
  messages: IMessage[];
}

interface IMessage {
  id: string;
  type: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  roomId: string;
  room: IRoom;
  authorId: string;
  author: IUser;
}

interface Tag {
  id: string;
  text: string;
  roomId: string;
  room: IRoom;
}
