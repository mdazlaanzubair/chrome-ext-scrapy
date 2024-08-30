// POPUP JS CODE

import { funcToChangeBtnStyle, saveScrappedContent } from "./utils.js";

const scrapBtn = document.getElementById("startButton");

const startScraping = async () => {
  try {
    funcToChangeBtnStyle(scrapBtn, "started");
    const { scriptStatus } = await chrome.storage.local.get("scriptStatus");

    if (scriptStatus === "INJECTED") {
      const queryOptions = { active: true, currentWindow: true };
      chrome.tabs.query(queryOptions, (tabs) => {
        const activeTab = tabs[0];

        console.info("Sending message....");
        chrome.tabs.sendMessage(
          activeTab.id,
          { command: "REPORT-BACK" },
          (res) => {
            if (chrome.runtime.lastError) {
              funcToChangeBtnStyle(scrapBtn, "error");
              console.error(
                "Error sending message:",
                chrome.runtime.lastError.message
              );
            } else {
              saveScrappedContent(res);
              funcToChangeBtnStyle(scrapBtn, "success");
              console.info("Message sent!");
            }
          }
        );
      });
    } else {
      funcToChangeBtnStyle(scrapBtn, "error");
      console.log("scriptStatus:", scriptStatus);
    }
  } catch (error) {
    console.info("Unexpected error occurred while fetching data:");
    console.error(error);
  }
};

scrapBtn.addEventListener("click", startScraping);
