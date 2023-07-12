export const getPasswordFromStorage = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("password", ({ password }) => {
      if (chrome.runtime.lastError) {
        reject(new Error(`${chrome.runtime.lastError}`));
      } else {
        if (password) {
          resolve(password);
        } else {
          reject("Password not found in storage");
        }
      }
    });
  });
};

export const getTimeFromStroage = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("times", ({ times }) => {
      if (chrome.runtime.lastError) {
        reject(new Error(`${chrome.runtime.lastError}`));
      } else {
        if (times) {
          resolve(times);
        } else {
          reject("Times not found!");
        }
      }
    });
  });
};

export const getWebsiteListFromStorage = (): Promise<Array<string>> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("websites", ({ websites }) => {
      if (chrome.runtime.lastError) {
        reject(new Error(`${chrome.runtime.lastError}`));
      } else {
        if (websites) {
          resolve(websites);
        } else {
          reject("Password not found in storage");
        }
      }
    });
  });
};
