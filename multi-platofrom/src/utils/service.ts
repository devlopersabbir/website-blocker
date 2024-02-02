import Browser from "webextension-polyfill";

export const getPasswordFromStorage = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const { password } = await Browser.storage.sync.get("password");
    if (password) {
      resolve(password);
    } else {
      reject("Password not found in storage");
    }
  });
};

export const getTimeFromStroage = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const { times } = await Browser.storage.sync.get("times");

    if (times) {
      resolve(times);
    } else {
      reject("Times not found!");
    }
  });
};

export const getWebsiteListFromStorage = (): Promise<Array<string>> => {
  return new Promise(async (resolve, reject) => {
    const { websites } = await Browser.storage.sync.get("websites");
    if (websites) {
      resolve(websites);
    } else {
      reject("Password not found in storage");
    }
  });
};
