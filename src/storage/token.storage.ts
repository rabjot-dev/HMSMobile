import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN =
  "accessToken";

const REFRESH_TOKEN =
  "refreshToken";

export const saveToken =
async (token: string) => {
  await AsyncStorage.setItem(
    ACCESS_TOKEN,
    token
  );
};

export const getToken =
async () => {
  return AsyncStorage.getItem(
    ACCESS_TOKEN
  );
};

export const saveRefreshToken =
async (token: string) => {
  await AsyncStorage.setItem(
    REFRESH_TOKEN,
    token
  );
};

export const getRefreshToken =
async () => {
  return AsyncStorage.getItem(
    REFRESH_TOKEN
  );
};

export const removeTokens =
async () => {
  await AsyncStorage.multiRemove([
    ACCESS_TOKEN,
    REFRESH_TOKEN,
  ]);
};