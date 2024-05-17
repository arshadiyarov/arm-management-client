export class StorageHelper {
  public static setOrUpdateItem(key: string, val: string) {
    if (typeof window != "undefined") {
      window.localStorage.setItem(key, val);
    }
  }

  public static getItem(key: string) {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(key) || "";
    }

    return "";
  }

  public static removeItem(key: string) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  }
}
