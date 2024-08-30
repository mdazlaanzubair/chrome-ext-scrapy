// CONTENT JS CODE

(() => {
  console.log("Content Script Loaded");

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Content Script Ready To Serve");
    if (message["command"] === "REPORT-BACK") {
      const content = {
        url: document.location.href,
        dom: document.documentElement.outerHTML,
      };
      sendResponse(content);
    } else {
      sendResponse({ dom: "What is the command" });
    }
  });
})();
