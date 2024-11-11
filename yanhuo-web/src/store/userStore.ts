import { defineStore } from "pinia";
import { ref } from "vue";
import { storage } from "@/utils/storage";
import { refreshToken } from "@/api/user";
import { store } from "@/store";
import type { User } from "@/type/user";

// 使用setup模式定义
export const userStore = defineStore("userStore", () => {
  const token = ref("");

  const userInfo = ref<User | null>(storage.get('userInfo'));

  const getToken = () => {
    return storage.get("accessToken");
  };

  const getUserInfo = (): User => {
    return storage.get("userInfo") as User;
  };

  const setUserInfo = (data: User) => {
    userInfo.value = data;
    storage.set("userInfo", data);
  };

  const isLogin = () => {
    const user = storage.get("userInfo") as User;
    return user != null && user != undefined;
  };

  const getNewToken = (token: string) => {
    return new Promise<any>((resolve, reject) => {
      refreshToken(token)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
    });
  };

  const loginOut = () => {
    userInfo.value = <any>{};
    window.localStorage.clear();
  };

  return { token, userInfo, getToken, getNewToken, getUserInfo, setUserInfo, loginOut, isLogin };
});

export function useUserStore() {
  return userStore(store);
}
