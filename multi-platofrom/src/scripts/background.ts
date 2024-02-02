import Browser from "webextension-polyfill";
import { getWebsiteListFromStorage } from "../utils/service";

Browser.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const websiteList = await getWebsiteListFromStorage();
  websiteList &&
    websiteList.find((website) => {
      const URL = details.url;
      if (
        (website && URL.endsWith(`https://www.${website}`)) ||
        URL.endsWith(`https://${website}`) ||
        URL.endsWith(`https://${website}/`) ||
        URL.endsWith(`https://www.${website}/`)
      ) {
        Browser.tabs.update(details.tabId, {
          url: Browser.runtime.getURL(
            `src/popup/popup.html?name=site-blocked&site=${website}&origin=${details.url}`
          ),
        });
      }
    });
});

// make timer to update domainlist
Browser.runtime.onMessage.addListener((message) => {
  let totalSeconds = message.totalSecond;
  console.log(totalSeconds);
  const intervalId = setInterval(async () => {
    totalSeconds--;
    Browser.action.setBadgeText({ text: `${totalSeconds}` });
    if (totalSeconds === 0) {
      clearInterval(intervalId);

      // again push to domain name into localstorage
      const weblists = await getWebsiteListFromStorage();
      console.log("old array: ", weblists);
      const newLists: any = [...(weblists || ""), message.domain];
      await Browser.storage.sync.set({ websites: newLists });
    }
  }, 1000);
});
