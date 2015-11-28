 console.log("Start");
 
  chrome.windows.getCurrent(function (win) {    
    chrome.tabs.captureVisibleTab(win.id,{"format":"png"}, function(imgUrl) {
      console.log(imgUrl)
      var img = document.getElementById('myImg');
      img.setAttribute('src', imgUrl);
      img.style.visiblity = 'hidden';

      setTimeout(function() {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        context.fillRect(0, 0, 100, 100);
        context.drawImage(img, 0, 20);
        document.body.removeChild(img);
      }, 100);
    });
  }); 