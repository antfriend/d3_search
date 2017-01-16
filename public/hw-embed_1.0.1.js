/*============================================
  === Healthwise Incorporated embed script ===
  ============================================
  html usage example (embeds a new div between the two script tags):
  ============================================
  <script src="hw-embed_1.0.1.js"></script>
  <script type="text/javascript">
    hwembed.embed({id:'975EB147-40D6-58CA-B8ED-CEEE2D5CD87D', ecode:'aGVhbHRod2lzZQ==',width:100,title:false,service:'https://content.test.hwapps.net',loc:'en-us'});
  </script>
  ============================================
  js on dynamically selected element usage example:
  ============================================
  //select the element you want to embed to
  var myelement = document.getElementById("my_element");
  //supply the element to the optional "element" property
  var embeddable = {
    element: myelement,
    id:'975EB147-40D6-58CA-B8ED-CEEE2D5CD87D',
    ecode:'aGVhbHRod2lzZQ==',
    service:'https://content.test.hwapps.net',
    loc:'en-us'
  };
  //call the embed function
  hwembed.embed(embeddable);
  ============================================
*/
var hwembed = hwembed || (function() {
  return {
    embed: function(embeddable) {

      function getTargetElement(element) {
        // create a new div to hold the topic
        var target = document.createElement('div');
        var msg = document.createTextNode("Healthwise");
        target.appendChild(msg);

        if (element) {
          //if a target element was provided, insert the target there
          element.appendChild(target);
        } else {
          //get the currently running script
          var arrScripts = document.getElementsByTagName('script');
          var scriptTag = arrScripts[arrScripts.length - 1];
          //insert the new div into the DOM before the script
          scriptTag.parentNode.insertBefore(target, scriptTag);
        }
        return target;
      }

      function getEmbedUrl(embeddable) {
        // build a url to access the topic
        var url_param = '&url=';
        var url = '';
        var localization = '';
        if (embeddable.loc) {
          localization = embeddable.loc;
        } else {
          localization = 'en-us';
        }
        if (embeddable.service) {
          url_param += embeddable.service + '/v1/topic/' + embeddable.id + '/' + localization;
          url += embeddable.service + '/v1/oembed?ecode=' + embeddable.ecode + url_param;
        } else {
          url_param += 'https://content.healthwise.net/v1/topic/' + embeddable.id + '/' + localization;
          url += 'https://content.healthwise.net/v1/oembed?ecode=' + embeddable.ecode + url_param;
        }
        if (embeddable.width) {
          url += '&maxwidth=' + embeddable.width;
        }
        if (undefined !== embeddable.title) //title is an optional bool :)
        {
          url += '&title=' + embeddable.title;
        }
        return url;
      }

      function get_Topic_From_Url_And_Embed_It_In_The_Target(url, target) {
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
      }

      var target = getTargetElement(embeddable.element);
      var url = getEmbedUrl(embeddable);
      get_Topic_From_Url_And_Embed_It_In_The_Target(url, target);
    }

  };
}());
