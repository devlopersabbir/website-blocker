import { getWebsiteListFromStorage } from "../utils/service";

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const websiteList = await getWebsiteListFromStorage();
  websiteList &&
    websiteList.find((website) => {
      if (website && details.url.includes(website)) {
        chrome.tabs.update(details.tabId, {
          url: chrome.runtime.getURL(
            `index.html?name=site-blocked&site=${website}&origin=${details.url}`
          ),
        });
      }
    });
});

// make timer to update domainlist
chrome.runtime.onMessage.addListener((message) => {
  let totalSeconds = message.totalSecond;
  const intervalId = setInterval(async () => {
    totalSeconds--;
    chrome.action.setBadgeText({ text: `${totalSeconds}` });
    if (totalSeconds === 0) {
      clearInterval(intervalId);

      // again push to domain name into localstorage
      const weblists = await getWebsiteListFromStorage();
      console.log("old array: ", weblists);
      const newLists: any = [...(weblists || ""), message.domain];
      await chrome.storage.sync.set({ websites: newLists });

    }
  }, 1000);
});

// show badge
// chrome.runtime.onMessage.addListener((remaingTime) => {
//   chrome.action.setBadgeText({ text: remaingTime?.remaingTime });
// });
