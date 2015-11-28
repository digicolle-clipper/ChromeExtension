chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: 'overlay.js'});
  chrome.windows.getCurrent(function (win) {    
    chrome.tabs.captureVisibleTab(win.id,{"format":"png"}, function(imgUrl) {
      chrome.tabs.sendMessage(tab.id, imgUrl, function(response) {});
    });
  });
});
