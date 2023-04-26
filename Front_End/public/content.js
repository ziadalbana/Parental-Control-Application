// Define an array of keywords to filter
const adultKeywords = ['الحمد', 'Last', 'كنت', 'الشهر', 'نفطر' , 'ليالي'];

// Create a MutationObserver to observe changes to the DOM
const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // Select all tweet elements on the page
      const tweets = document.querySelectorAll('[data-testid="tweet"]');
      
      console.log(tweets) ;

      // Filter out any tweets that contain adult keywords
      for (const tweet of tweets) {
        const tweetTextElement = tweet.querySelector('[data-testid="tweet"] [lang]');
        if (tweetTextElement !== null) {
          const tweetText = tweetTextElement.textContent;
          console.log(tweetText);
          // filter and remove tweets as needed
          if (adultKeywords.some(keyword => tweetText.includes(keyword))) {
            console.log("remooooove") ;
            console.log(tweetText);
            tweet.remove();
          }
}
      }

      console.log(tweets);
    }
  }
});

// Start observing changes to the DOM
observer.observe(document.body, { childList: true, subtree: true });