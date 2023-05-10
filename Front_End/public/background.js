const adultLinks = ["youtube.com/"];
chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const blockedKeywords = ["https://www.youtube.com/", "facebook"];
  const url = details.url.toLowerCase();

  for (let i = 0; i < blockedKeywords.length; i++) {
    if (url.includes(blockedKeywords[i])) {
      chrome.tabs.update(details.tabId, {url: chrome.runtime.getURL("blockedPage.html")});
      return;
    }
  }
}, {url: [{urlMatches: ".*"}]});

