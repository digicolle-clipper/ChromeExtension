var overlay = document.createElement('div');
var state = 'start';
var x, y, w, h;
overlay.setAttribute('id', 'overlay');
overlay.setAttribute('style', 'width: 100%;height: 100%;position: absolute;top: 0;left: 0;background-color: #000000;opacity: 0.5;')
document.body.appendChild(overlay);
overlay.addEventListener('click', function(evt) {
  switch(state) {
    case 'start':
      x = evt.clientX;
      y = evt.clientY;
      state = 'clickedonce';
      break;
    case 'clickedonce':
      w = evt.clientX - x;
      h = evt.clientY - y;
      console.log([x,y,w,h]);
      chrome.runtime.sendMessage([x,y,w,h], function(response) {
        console.log(response);
      });
      break;
    default:
      break;
  }
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        sendResponse('hoge');
        console.log(request);
        var img = document.createElement('img');
        img.setAttribute('src', request);
        img.style.visiblity = 'hidden';

        setTimeout(function() {
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          context.fillRect(0, 0, w, h);
          context.drawImage(img, -x, -y);
          document.body.appendChild(canvas);
          document.body.removeChild(document.getElementById('overlay'));
        }, 100);
});
