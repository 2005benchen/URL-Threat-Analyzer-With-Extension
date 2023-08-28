// popup.js

// Send a message to the content script when the popup is loaded
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: checkURLInContentScript
    });
  });
  
  // Define the function to be executed in the content script
  function checkURLInContentScript() {
    const url = window.location.href; // Get the current URL
  
    // Communicate with the background script to perform the URL check
    chrome.runtime.sendMessage({ action: 'checkURL', url }, (response) => {
      const resultElement = document.getElementById('result');
      resultElement.textContent = response.result;
  
      // Show "benign" or "malicious" text in hello.html
      const resultText = response.result === 'Benign' ? 'benign' : 'malicious';
      chrome.scripting.executeScript({
        target: { tabId: response.tabId },
        function: updateHelloHtml,
        args: [resultText]
      });
    });
  }
  
  // Function to update hello.html content
  function updateHelloHtml(resultText) {
    // Modify the hello.html content to display the result
    document.body.innerHTML = `<h1>This URL is ${resultText}</h1>`;
  }
  
