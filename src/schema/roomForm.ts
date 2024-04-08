import { z } from "zod";

export const createRoomSchema = z.object({
  topicValue: z.string().min(10, {
    message: "Topic should have at least 10 characters.",
  }),
  languageValue: z.string(),
});

export type TCreateRoomSchema = z.infer<typeof createRoomSchema>;

export const joinRoomSchema = z.object({
  roomId: z.string(),
});

export type TJoinRoomSchema = z.infer<typeof joinRoomSchema>;
