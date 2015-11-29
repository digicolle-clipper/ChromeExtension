

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
          var png = canvas.toDataURL();
          console.log(png);
          
          var currentURL = location.href;
          var id = currentURL.split('/').pop();
          
          AWS.config.accessKeyId = 'X';
          AWS.config.secretAccessKey = 'X';
          
          // AWS.config.accessKeyId = window.settings['accessKeyId'];
          // AWS.config.secretAccessKey = window.settings['secretAccessKey'];

          var pngBinary = dataURItoBlob(png);
          var upload = new AWS.S3.ManagedUpload({
						params: {Bucket: 'digicolle-clipper', Key: id + '_' + Date.now() + '.png', Body: pngBinary}
					});
          
          upload.send(function(err, data) {
						if(err) return;
            var api_endpoint = "X";
            // var api_endpoint = window.settings['endpoint'];
            var xhr = new XMLHttpRequest();
            xhr.open("POST", api_endpoint+"/upload", true);
            xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
            xhr.send("ndl_id=" + id + "&photo="+data.Location);            
					});
          
          document.body.removeChild(document.getElementById('overlay'));
          
        }, 100);
        break;
      default:
        break;
    }
  });
});

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/png'});
}