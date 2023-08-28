// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkURL') {
      const url = request.url;
  
      // Perform URL check logic here
      // You need to implement the URL feature extraction and model prediction
  
      // For now, I'll provide a dummy response
      const prediction = Math.random() < 0.5 ? 'Benign' : 'Malicious';
      sendResponse({ result: prediction });
    }
  });
  
