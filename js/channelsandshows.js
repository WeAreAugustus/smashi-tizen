

	function navigateToChannel(channelId) {
		sessionStorage.setItem("ShowAndChannelId", channelId);
		require(["router"], function (router) {
			router.changeScreen('showdetails');
		});
	}

var myLanguage = sessionStorage.getItem("locale");
if (!myLanguage) {
    myLanguage = 'en';
}
fetch('https://smashi.tv/api/video/shows/channel', {
	    headers: {
	        'Accept': 'application/json',
	        'X-localization': myLanguage
	    }
	})
    .then(
        res => {
            return res.json();
        })
    .then(
        data => {
            data.data.forEach(channel => {
            	const markup = `<div style="width:332px;" class="item">
	                <div tabindex="1" class="focusable card" tabindex="1" onclick="navigateToChannel(${channel.id})">
	                    <img class="img-fluid vertical-card" loading="lazy" src="${channel.background_image}">
	                </div>
                </div>`;
                if(document.getElementById('channels')){
                	document.getElementById("channels").innerHTML += markup;
                }
            });
        }
    );
fetch('https://smashi.tv/api/video/shows', {
		headers: {
        'Accept': 'application/json',
        'X-localization': myLanguage
		}
	})
    .then(
        res => {
            return res.json();
        })
    .then(
        data => {
            data.data.forEach(channel => {
                const markup = `<div style="width:332px;" class="item">
	                  <div tabindex="1" class="focusable card" tabindex="1" onclick="navigateToChannel(${channel.id})">
	                      <img class="img-fluid vertical-card" loading="lazy" src="${channel.background_image}">
	                  </div>
	              </div>`;
	              if( document.getElementById("shows")){
	            	  document.getElementById("shows").innerHTML += markup;
	               }
            });
        }
    );

