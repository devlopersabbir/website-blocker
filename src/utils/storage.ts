export const setTimestampInStorage = async (
  currentDomain: string,
  dateNow: number
) => {
  const timestampKey = `timestamp_${currentDomain}`;
  const timestampValue = JSON.stringify(dateNow);

  const data = { [timestampKey]: timestampValue };
  await chrome.storage.sync.set(data);
};

export const getTimestampFromStorage = (currentDomain: string) => {
  return new Promise((resolve, reject) => {
    const timestampKey = `timestamp_${currentDomain}`;
    chrome.storage.sync.get([timestampKey], (result) => {
      if (chrome.runtime.lastError)
        return reject(new Error(`${chrome.runtime.lastError}`));

      const timestampValue = result[timestampKey];
      if (timestampValue) {
        const timestamp = JSON.parse(timestampValue);
        resolve(timestamp);
      } else {
        resolve(null);
      }
    });
  });
};
