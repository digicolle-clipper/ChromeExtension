chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: 'overlay.js'});
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  sendResponse('hoge');
  capture(request);
});
function capture(rect) {
  console.log(rect);
  chrome.windows.getCurrent(function (win) {    
    chrome.tabs.captureVisibleTab(win.id,{"format":"png"}, function(imgUrl) {
      chrome.tabs.query(
        { currentWindow: true, active: true },
        function (tabArray) { chrome.tabs.sendMessage(tabArray[0].id, imgUrl, function(response) {
        }); }
      );
    });
  }); 
}
