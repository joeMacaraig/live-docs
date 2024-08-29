"use server";

import { nanoid } from "nanoid"; //id generator for rooms
import { liveblocks } from "@/lib/liveblocks";
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "../utils";
import { redirect } from "next/navigation";
import { title } from "process";

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (err) {
    console.log(`Error happened while creating a room: ${err}`);
  }
};

export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error("You do not have access to this document.");
    }

    return parseStringify(room);
  } catch (err) {
    console.log(`Error happened while getting a room: ${err}`);
  }
};

export const getAllDocuments = async (email: string) => {
  try {
    const rooms = await liveblocks.getRooms({ userId: email });
    return parseStringify(rooms);
  } catch (err) {
    console.log(`Error happened while getting all the rooms: ${err}`);
  }
};

export const updateDocument = async (roomId: string, title: string) => {
  try {
    const updated = await liveblocks.updateRoom(roomId, {
      metadata: { title },
    });

    revalidatePath(`/documents/${roomId}`);

    return parseStringify(updated);
  } catch (err) {
    console.log(`Something happened while updating room: ${err}`);
  }
};

export const updateDocumentAccess = async ({
  roomId,
  email,
  userType,
  updatedBy,
}: ShareDocumentParams) => {
  try {
    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    };
    const room = await liveblocks.updateRoom(roomId, { usersAccesses });

    if (room) {
      const notificationId = nanoid();
      await liveblocks.triggerInboxNotification({
        userId: email,
        kind: "$documentAccess",
        subjectId: notificationId,
        activityData: {
          userType,
          title: `You have been granted ${userType} access to the document by ${updatedBy.name}`,
          updatedBy: updatedBy.name,
          avatar: updatedBy.avatar,
          email: updatedBy.email,
        },
        roomId,
      });
    }

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(room);
  } catch (err) {
    console.log(`Error happened while updating document access : ${err}`);
  }
};

export const removeCollaborator = async ({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    if (room.metadata.email === email) {
      throw new Error(" You cannot remove yourself from the document");
    }
    const updatedRoom = liveblocks.updateRoom(roomId, {
      usersAccesses: { [email]: null },
    });
    revalidatePath(`/documents/${roomId}`);
    return parseStringify(updatedRoom);
  } catch (err) {
    console.log(`Error happened while trying removing a collaborator : ${err}`);
  }
};

export const deleteDocument = async (roomId: string) => {
  try {
    await liveblocks.deleteRoom(roomId);
    revalidatePath("/");
    redirect("/");
  } catch (err) {
    console.log(`Error happened while trying delete a room : ${err}`);
  }
};
