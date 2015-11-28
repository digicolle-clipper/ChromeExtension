chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  sendResponse('ok');
  var overlay = document.createElement('div');
  var state = 'start';
  var x, y, w, h;
  overlay.setAttribute('id', 'overlay');
  //overlay.setAttribute('style', 'width: 100%;height: 100%;position: absolute;top: 0;left: 0;background-color: #000000;opacity: 0.5;')
  document.body.appendChild(overlay);
  overlay.addEventListener('click', function(evt) {
    switch(state) {
      case 'start':
        console.log(evt);
        x = evt.clientX * window.devicePixelRatio;
        y = evt.clientY * window.devicePixelRatio;
        state = 'clickedonce';
        break;
      case 'clickedonce':
        w = (evt.clientX * window.devicePixelRatio) - x;
        h = (evt.clientY * window.devicePixelRatio) - y;
        console.log([x,y,w,h]);
        var img = document.createElement('img');
        img.setAttribute('src', request);
        //img.style.visiblity = 'hidden';

        setTimeout(function() {
          var canvas = document.createElement('canvas');
          canvas.setAttribute('width', w + 'px');
          canvas.setAttribute('height', h + 'px');
          var context = canvas.getContext('2d');
          context.fillRect(0, 0, w, h);
          context.drawImage(img, -x, -y);
          document.body.removeChild(document.getElementById('overlay'));
        }, 100);
        break;
      default:
        break;
    }
  });
});
