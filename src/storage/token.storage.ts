import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "accessToken";

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getToken = async () => {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const removeTokens = async () => {
  await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, "refreshToken"]);
};
