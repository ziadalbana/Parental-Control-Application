// Define an array of keywords to filter
const adultKeywords = [];
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
             
              if (adultKeywords.some(keyword => tweetText.includes(keyword))) {
                tweet.remove();
              }else {
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