function getWebsiteName(url) {
  try {
    // Create a new URL object
    const parsedUrl = new URL(url);

    // Extract the hostname
    const hostname = parsedUrl.hostname;

    // Extract the domain name (excluding subdomains and 'www')
    const domainParts = hostname.split(".");
    const domain = domainParts.slice(-2).join(".");

    return domain;
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

export function funcToChangeBtnStyle(element, status) {
  const styles = {
    started: { text: "Scraping....", bgColor: "#e0f2fe", color: "#075985" },
    success: { text: "Scraped", bgColor: "#22c55e", color: "#f0fdf4" },
    error: { text: "Error", bgColor: "#dc2626", color: "#fef2f2" },
    "script-loading": {
      text: "Loading Script...",
      bgColor: "#0284c7",
      color: "#f0f9ff",
    },
  };

  element.innerText = styles[status]?.text || "Start";
  element.disabled = status !== "started";
  element.style.backgroundColor = styles[status]?.bgColor || "#0284c7";
  element.style.color = styles[status]?.color || "#f0f9ff";

  if (status !== "script-loading") {
    setTimeout(() => {
      element.innerText = "Start";
      element.disabled = false;
      element.style.backgroundColor = "#0284c7";
      element.style.color = "#f0f9ff";
    }, 2000);
  }
}

export function saveScrappedContent(content) {
  const { url, dom } = content;
  if (url && dom) {
    const website = getWebsiteName(url);

    console.info(`${website} content is successfully scrapped`);
    console.info(`Link to scrapped webpage:`, url);

    const text = `Website: ${website} - ${content.url}\n\n\n${content.dom}`;
    const blob = new Blob([text], { type: "text/plain" });
    const blobURL = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobURL;
    a.download = `${website}-content--${Date.now()}.txt`;
    a.click();

    URL.revokeObjectURL(blobURL);
  }
}
