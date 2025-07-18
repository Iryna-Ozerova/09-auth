import { cookies } from "next/headers";
import { nextServer } from "./api";
import { ServerBoolResponse, User } from "@/types/user";
import { FetchNotesResponse } from "./clientApi";
import { Note } from "@/types/note";

export const checkServerSession = async () => {
  const cookieData = await cookies();
  const response = await nextServer<ServerBoolResponse>(`/auth/session`, {
    headers: { Cookie: cookieData.toString() },
  });
  return response;
};

export const getServerMe = async (): Promise<User> => {
  const cookieData = await cookies();
  const { data } = await nextServer.get(`/users/me`, {
    headers: { Cookie: cookieData.toString() },
  });
  return data;
};

export const fetchNotes = async (
  page = 1,
  query = "",
  perPage = 12,
  tag?: string
): Promise<FetchNotesResponse> => {
  const cookieData = await cookies();
  const params: Record<string, string | number> = { page, perPage };
  if (query.trim()) params.search = query;
  if (tag && tag.toLowerCase() !== "all") {
    params.tag = tag;
  }

  const res = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
    headers: { Cookie: cookieData.toString() },
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieData = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieData.toString() },
  });
  return res.data;
};
