import request from "@/utils/request";

/**
 * 根据作品id获取作品
 * @param noteId 作品id
 * @returns 作品
 */
export const getNoteById = (noteId: string) => {
  return request<any>({
    url: "/platform/note/getNoteById", // mock接口
    method: "get",
    params: {
      noteId,
    },
  });
};

/**
 * 保存作品
 * @param data 作品实体
 * @returns 作品id
 */
export const saveNoteByDTO = (data: any) => {
  return request<any>({
    url: "/platform/note/saveNoteByDTO", // mock接口
    method: "post",
    data: data,
    headers: { "Content-Type": "multipart/form-data;boundary=----WebKitFormBoundaryk4ZvuPo6pkphe7Pl" },
  });
};

/**
 * 更新作品
 * @param data 作品实体
 * @returns 作品id
 */
export const updateNoteByDTO = (data: any) => {
  return request<any>({
    url: "/platform/note/updateNoteByDTO", // mock接口
    method: "post",
    data: data,
    headers: { "Content-Type": "multipart/form-data;boundary=----WebKitFormBoundaryk4ZvuPo6pkphe7Pl" },
  });
};

/**
 * 置顶作品
 * @param noteId
 * @returns
 */
export const pinnedNote = (noteId: string, type: number) => {
  return request<any>({
    url: "/platform/note/pinnedNote", // mock接口
    method: "get",
    params: {
      noteId,
      type,
    },
  });
};

/**
 * 删除作品
 * @param data
 * @returns
 */
export const deleteNoteByIds = (data: any) => {
  return request<any>({
    url: "/platform/note/deleteNoteByIds", // mock接口
    method: "post",
    data: data,
  });
};
