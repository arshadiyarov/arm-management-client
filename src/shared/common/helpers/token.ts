import { StorageHelper } from "shared";
import { LOCAL_STORAGE } from "shared/common";

const STORAGE_ACCESS_TOKEN = LOCAL_STORAGE.ACCESS_TOKEN;

export class TokenStorageHelper {
  public static storeToken(token: string): void {
    StorageHelper.setOrUpdateItem(STORAGE_ACCESS_TOKEN, token);
  }

  public static getToken(): string {
    return StorageHelper.getItem(STORAGE_ACCESS_TOKEN);
  }

  public static removeToken(): void {
    StorageHelper.removeItem(STORAGE_ACCESS_TOKEN);
  }
}
