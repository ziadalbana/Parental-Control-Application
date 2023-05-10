// Define an array of keywords to filter
let adultKeywords = [];
let adultLinks = [] ;
let removeAdultTweets = false ;
let removeAdultImages = false ;
let enforceSafeSearch = false ;
async function getUser() {
  const username ='ziadA';
  console.log(username);
  return fetch(`http://localhost:8000/user/getuser/`+username, {
  method: 'GET',
  })
  .then(data => data.json())
}
async function checkAdult(tweet) {
  return fetch('http://localhost:8000/user/checkadult', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(tweet)
  })
    .then(data => data.json())
 }

 getUser().then((token) => {
  console.log(token);
  adultKeywords = [...token.blockedKeyWords] ;
  adultLinks = [...token.blockedLinks];
  removeAdultTweets = token.removeAdultTweets ;
  removeAdultImages = token.removeAdultImages ;
  enforceSafeSearch = token.enforceSafeSearch ;
  console.log(adultKeywords) ;
  console.log(adultLinks) ;
  console.log(removeAdultTweets) ;
  console.log(removeAdultImages) ;
  console.log(enforceSafeSearch) ;

});


// block adult links
  
// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   console.log(tabs[0].url);
//   var tabUrl = tabs[0].url;
//   if (adultLinks.some(word => tabUrl.includes(word))) {
//     var tabId = tabs[0].id;
//     chrome.tabs.update(tabId, { url: chrome.extension.getURL("blockedPage.html") });
//   }
// });

//enforce safe search
// if(enforceSafeSearch)
// {
//   chrome.storage.sync.set({ isSafeSearchEnabled: !isSafeSearchEnabled });
// }
//remove adult images
if(removeAdultImages)
{

}



// Create a MutationObserver to observe changes to the DOM
const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // Select all tweet elements on the page
      const tweets = document.querySelectorAll('[data-testid="tweet"]');
      

      // Filter out any tweets that contain adult keywords
      for (const tweet of tweets) {
          if(!tweet.hasAttribute('isFiltered'))
          {
            tweet.setAttribute('isFiltered' , 'true');
            tweet.style.display = 'none';
            const tweetTextElement = tweet.querySelector('[data-testid="tweet"] [lang]');
            if (tweetTextElement !== null) {
              const tweetText = tweetTextElement.textContent;
              console.log(tweetText);
              // filter and remove tweets as needed
              const text={
                tweet:tweetText
              }
             //remove cutom keywords
              if (adultKeywords.some(keyword => tweetText.includes(keyword))) {
                tweet.remove();
                
              }
              //remove adult tweets using the model
              else if(removeAdultTweets) {
                checkAdult(text).then((token) => {
                  if(token.predicted_class===0) tweet.remove();
                });

              }
              tweet.style.display = 'none';
            }
          }
      }

    }
  }
});

// Start observing changes to the DOM
observer.observe(document.body, { childList: true, subtree: true });