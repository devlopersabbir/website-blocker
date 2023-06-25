export const getPasswordFromStorage = async () => {
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

export const getWebsiteListFromStorage = () => {
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
