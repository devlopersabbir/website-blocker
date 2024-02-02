import Browser from "webextension-polyfill";

export const setTimestampInStorage = async (
  currentDomain: string,
  dateNow: number
) => {
  const timestampKey = `timestamp_${currentDomain}`;
  const timestampValue = JSON.stringify(dateNow);

  const data = { [timestampKey]: timestampValue };
  await Browser.storage.sync.set(data);
};

export const getTimestampFromStorage = (currentDomain: string) => {
  return new Promise(async (resolve, reject) => {
    const timestampKey = `timestamp_${currentDomain}`;
    const result = await Browser.storage.sync.get("timestampKey");

    const timestampValue = result[timestampKey];
    if (timestampValue) {
      const timestamp = JSON.parse(timestampValue);
      resolve(timestamp);
    } else {
      resolve(null);
    }
  });
};
