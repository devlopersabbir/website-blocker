import { getWebsiteListFromStorage } from "../utils/service";

// chrome.runtime.onMessage.addListener((message, sender: any, sendResponse) => {
//   if (message?.action === "domainName") {
//     if (sender) {
//       const domainNameWithWww =
//         sender && sender?.tab.url ? new URL(sender.tab.url).hostname : "";
//       const domainName = domainNameWithWww.replace(/^www\./i, "").trim();
//       console.log(domainName);
//       sendResponse({ domainName });
//     }
//   }
//   return true;
// });

let domainName: string;
chrome.runtime.onMessage.addListener((_, sender, sendResponse) => {
  sendResponse("hello");
  if (sender) {
    const domain = sender.origin
      ?.replace(/https?:\/\//, "")
      .split("/")[0]
      .replace(/www\./, "");
    if (domain) {
      domainName = domain;
    }
  }
});

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const websiteList: [] = (await getWebsiteListFromStorage()) as any;
  // make condition and
  const blockedWebsite =
    websiteList &&
    websiteList.find((website) => details.url.includes(`${website}`));

  if (blockedWebsite) {
    chrome.tabs.update(details.tabId, {
      url: chrome.runtime.getURL("src/background/blocked.html"),
    });
  }
});
