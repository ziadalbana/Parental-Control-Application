
let adultKeywords = [];
let adultLinks = [];
let removeAdultTweets = false;
let removeAdultImages = false;
let enforceSafeSearch = false;

let username ;
let auth ;

async function getUser(username , token) {
  return fetch(`http://localhost:8000/user/getuser/${username}`, {
  method: 'GET',
  headers: {
    Authorization : `Bearer ${token}`,
  }
  })
  .then(data => data.json())
}

async function checkAdult(tweet , token) {
  return fetch('http://localhost:8000/user/checkadult', {
    headers: {
      'Content-Type': 'application/json',
       Authorization : `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify(tweet)
  })
    .then(data => data.json())
 }


 async function main() {


  const { userName, token } = await new Promise(resolve => {
    chrome.storage.local.get(['userName', 'token'], function(result) {
      resolve(result);
    });
  });


  username = userName ;
  auth = token ;

if(username && auth)
  {
    getUser(username , auth).then((token) => {
      // Update the values of the variables from the token object
      adultKeywords = token.adultKeywords || [];
      adultLinks = token.adultLinks || [];
      removeAdultTweets = token.removeAdultTweets || false;
      removeAdultImages = token.removeAdultImages || false;
      enforceSafeSearch = token.enforceSafeSearch || false;

      console.log('Variables updated successfully from token:', adultKeywords, adultLinks, removeAdultTweets, removeAdultImages, enforceSafeSearch);
    
    });
  }

 
 if(username){
  alert("you get username first")
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
            const tweetTextElement = tweet.querySelector('[data-testid="tweet"] [lang]');
            if (tweetTextElement !== null) {
              const tweetText = tweetTextElement.textContent;
              // console.log(tweetText);
              // filter and remove tweets as needed
              const text={
                tweet:tweetText
              }
             //remove cutom keywords
              if (adultKeywords.some(keyword => tweetText.includes(keyword))) {
                tweet.remove();
                
              }
              else if (removeAdultImages) {
                // console.log("classifing images");
                // const tweetImageElement = tweet.querySelector('img[alt="Image"]');
                // console.log(tweetImageElement);
                // if (tweetImageElement !== null) {
                //   const imageUrl = tweetImageElement.getAttribute('src');
                //   console.log("imageUrl");
                //   console.log(imageUrl);
                //   // this example uses axios
                //   const axios = require('axios');

                //   console.log("sending request");
                //   axios.get('https://api.sightengine.com/1.0/check.json', {
                //     params: {
                //       'url': imageUrl,
                //       'models': 'nudity-2.0',
                //       'api_user': '836180598',
                //       'api_secret': 'VpjgcAYmfdErTw7FDQBZ',
                //     }
                //   })
                //   .then(function (response) {
                //     console.log('response of image classification')
                //     console.log(response.data);
                //     const res = response.data;
                //     let rate = 0;
                //     if(res.status === 'success'){
                //       rate += res.nudity.sexual_activity;
                //       rate += res.nudity.sexual_display;
                //       rate += res.nudity.erotica;
                //       if(rate > 0.5)
                //         tweet.remove();
                //     }
                //   })
                //   .catch(function (error) {
                //     // handle error
                //     if (error.response) console.log(error.response.data);
                //     else console.log(error.message);
                //   });
                //   console.log('Image URL:', imageUrl);
                //   // You can download the image or perform any other operation with it
                // }
              }
              //remove adult tweets using the model
              else if(removeAdultTweets) {
                // tweet.style.display = 'none';
                // checkAdult(text,auth).then((token) => {
                //   console.log(token.predicted_class);
                //   if(token.predicted_class===0) tweet.remove();
                //   else tweet.style.display = 'block';
                // });
                const modelPredictionPromise = new Promise((resolve, reject) => {
                  tweet.style.display = 'none';
                  checkAdult(text, auth).then((token) => {
                    if (token.predicted_class === 0) {
                      tweet.remove();
                      reject();
                    } else {
                      resolve();
                    }
                  });
                });
  
                // Show the tweet after model prediction response is received
                modelPredictionPromise.then(() => {
                  tweet.style.display = 'block';
                }).catch(() => {});
              }
            }
          }
      }

    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
}else 
{
  alert("Kidefender doesn't work, Please Sign in again");
}
 }

 main();