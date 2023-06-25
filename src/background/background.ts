chrome.runtime.onMessage.addListener((message, sender: any, sendResponse) => {
  if (message?.action === "domainName") {
    if (sender) {
      const domainNameWithWww =
        sender && sender?.tab.url ? new URL(sender.tab.url).hostname : "";
      const domainName = domainNameWithWww.replace(/^www\./i, "").trim();

      sendResponse({ domainName });
    }
  }
  return true;
});
