// popup.js

chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  const activeTab = tabs[0];
  const url = activeTab.url;
  const resultElement = document.getElementById('resultText');

     // Simulating an API response for demonstration purposes
     fetch('https://super02.me/predict?url=' + url, {method: 'POST'}).then(function(response) {
      if(response.ok) {
        response.json().then(function(data) {
          const isMalicious = data;
          console.log(isMalicious)

          const result = isMalicious ? 'Benign' : 'Malicious';
          console.log(result)

          resultElement.textContent = result;
        });
        } else {
          resultElement.textContent = "Error";
        }
    });
});
