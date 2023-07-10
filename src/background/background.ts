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

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const websiteList: [] = (await getWebsiteListFromStorage()) as any;
  // make condition and
});
