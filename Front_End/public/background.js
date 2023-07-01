
async function getUser(username , token) {
  return fetch(`http://localhost:8000/user/getuser/${username}`, {
  method: 'GET',
  headers: {
    Authorization : `Bearer ${token}`,
  }
  })
  .then(data => data.json())
}
function getCurrentDateTime() {
  let now = new Date();
  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  let day = String(now.getDate()).padStart(2, '0');
  let hours = String(now.getHours()).padStart(2, '0');
  let minutes = String(now.getMinutes()).padStart(2, '0');

  let dateTime = year +"-"+ month+"-" + day+" " + hours+":"+minutes;
  return dateTime;
}

function updateHistory(username , token , blockedAction) {
let dataFormat=getCurrentDateTime();
  let historyObject={
  word:blockedAction,
  timestamp:dataFormat,
};
  return fetch(`http://localhost:8000/user/history/${username}`, {
  method: 'PATCH',
  headers: {
    Authorization : `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(historyObject)
  })
  .then(data => data.json())
}

chrome.action.onClicked.addListener(function() {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
  });


  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SAVE_USERNAME") {
      const { username } = message.data;
      chrome.storage.local.set({ userName: username }, function() {
      });
      chrome.storage.local.get(['userName'], function(result) {
      });
      sendResponse({ status: "OK" }); // Send a response back to the sender
    }else if(message.type === "SAVE_TOKEN") {
      const { token } = message.data;
      chrome.storage.local.set({ token: token }, function() {
      });
      chrome.storage.local.get(['token'], function(result) {
      });
      sendResponse({ status: "OK" }); // Send a response back to the sender
    }
  });
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if(details.url.includes("&safe=active")) return;
  let adultKeywords ; 
  let adultLinks ;
  let username ;
  let auth 
  await new Promise((resolve, reject) => {
    chrome.storage.local.get(['userName', 'token'], (result) => {
      username = result.userName ;
      auth = result.token ;
      resolve();
    });
  });
  const token = await getUser(username , auth);
  adultKeywords = token.blockedKeyWords || [];
  adultLinks = token.blockedLinks || [];  
  const url = details.url.toLowerCase();
  const blockedKeywords = adultKeywords.concat(adultLinks);
  for (let i = 0; i < blockedKeywords.length; i++) {
    if (url.includes(blockedKeywords[i])) {
      chrome.tabs.update(details.tabId, {url: chrome.runtime.getURL("blockedPage.html")});
      updateHistory(username , auth , blockedKeywords[i]);
      return;
    }
  }
}, {url: [{urlMatches: ".*"}]});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const googleSearchURLPattern = "https://www.google.com/search*";
  const safeSearchParam = "&safe=active";
  if (details.url.match(googleSearchURLPattern) && !details.url.includes(safeSearchParam)) {
    const modifiedURL = details.url + safeSearchParam;
    chrome.tabs.update(details.tabId, { url: modifiedURL });
  }
});

