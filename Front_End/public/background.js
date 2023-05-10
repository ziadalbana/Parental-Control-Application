function getUserName(){
  chrome.storage.local.get(['userName'], function(result) {
    console.log('Data retrieved successfully!', result.userName);
  });
 }


chrome.action.onClicked.addListener(function() {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
  });


  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SAVE_USERNAME") {
      const { username } = message.data;
      // Save your data to local storage
      chrome.storage.local.set({ userName: username }, function() {
        console.log('Data saved successfully!');
      });

      console.log("Received username:", username);
      chrome.storage.local.get(['userName'], function(result) {
        console.log('Data retrieved successfully!', result.userName);
      });
      sendResponse({ status: "OK" }); // Send a response back to the sender
    }
  });