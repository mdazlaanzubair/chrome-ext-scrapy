// BACKGROUND JS CODE

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    scriptInjector(tabId, "RECENTLY");
  }
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  scriptInjector(tabId, "RECENTLY");
});

const scriptInjector = (tabId, moment = "INITIALLY") => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabId },
      files: ["content.js"]
    },
    () => {
      if (chrome.runtime.lastError) {
        chrome.storage.local.set({ scriptStatus: "FAILED" });
        console.error("Injecting FAILED:", chrome.runtime.lastError);
      } else {
        chrome.storage.local.set({ scriptStatus: "INJECTED" });
        console.log(`${moment}: Content script injected successfully`);
      }
    }
  );
};
