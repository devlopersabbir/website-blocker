// import { getWebsiteListFromStorage } from "../utils/service";

chrome.runtime.onMessage.addListener((message, sender: any, sendResponse) => {
  if (message?.action === "domainName") {
    if (sender) {
      const domainNameWithWww =
        sender && sender?.tab.url ? new URL(sender.tab.url).hostname : "";
      const domainName = domainNameWithWww.replace(/^www\./i, "").trim();
      console.log(domainName);
      sendResponse({ domainName });
    }
  }
  return true;
});

// before load website then run code
// chrome.webRequest.onBeforeRequest.addListener(
//   (details) => {
//     const shouldBlock = ["instagram.com"].some((url) =>
//       details.url.includes(url)
//     );

//     if (shouldBlock) {
//       return { cancel: true };
//     }
//   },
//   { urls: ["<all_urls>"] },
//   ["blocking"]
// );
