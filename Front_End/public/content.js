

let adultKeywords = [];
let adultLinks = [];
let removeAdultTweets = false;
let removeAdultImages = false;
let enforceSafeSearch = false;

let username ;

async function getUser(username) {
  return fetch(`http://localhost:8000/user/getuser/${username}`, {
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

chrome.storage.local.get(['userName'], function(result) {
  username = result.userName;
  alert(`userName retrieved successfully: ${username}`)
  if(username)
  {
    getUser().then((token) => {
      // Update the values of the variables from the token object
      adultKeywords = token.adultKeywords || [];
      adultLinks = token.adultLinks || [];
      removeAdultTweets = token.removeAdultTweets || false;
      removeAdultImages = token.removeAdultImages || false;
      enforceSafeSearch = token.enforceSafeSearch || false;

      console.log('Variables updated successfully from token:', adultKeywords, adultLinks, removeAdultTweets, removeAdultImages, enforceSafeSearch);
    
    });
  }else 
    return ;
});

 
 if(username){
   //enforce safe search
   if(enforceSafeSearch)
   {
   
   }
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
}else 
{
  alert("Kidefender doesn't work, Please Sign in again");
}