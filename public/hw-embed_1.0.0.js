(function() {
  var contentUrl = 'http://localhost:62000/';
  contentUrl = 'https://content.test.hwapps.net/';
  //contentUrl = 'https://content.healthwise.net/';

  // get 'this' script element
  //currentScript doesn't work in IE
  //the second method only works if the script is loaded synchronously
  var script_tag = document.currentScript || (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  // create a new div to hold the topic
  var target = document.createElement('div');

  var msg = document.createTextNode("Loading content from Healthwise");
  target.appendChild(msg);

  //insert the div into the DOM before the script
  script_tag.parentNode.insertBefore(target, script_tag);


  // build a url to access the topic
  var embed_endpoint = contentUrl + 'v1/oembed';
  var ecode_param = 'ecode=' + script_tag.dataset.hw_ecode;
  var width_param = 'maxwidth=' + script_tag.dataset.hw_width;
  var title_param = 'title=' + script_tag.dataset.hw_title;
  var url_param = 'url=' + contentUrl + 'v1/topic/' + script_tag.id + '/en-us';
  var url = embed_endpoint + '?' + ecode_param + '&' + url_param + '&' + width_param + '&' + title_param;

  //get the topic and embed it
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        target.innerHTML = json.html;
      } else {
        target.innerHTML = "<p>Can't retrieve the content.</p>";
      }
    }
  };
  xhr.send();
})();
