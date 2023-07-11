import { getWebsiteListFromStorage } from "../utils/service";

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const websiteList: [] = (await getWebsiteListFromStorage()) as any;

  websiteList &&
    websiteList.find((website) => {
      if (website && details.url.includes(website)) {
        chrome.tabs.update(details.tabId, {
          url: chrome.runtime.getURL(
            `src/block/index.html?name=site-blocked&site=${website}&origin=${details.url}`
          ),
        });
      }
    });
});