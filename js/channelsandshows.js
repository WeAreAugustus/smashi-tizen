
function navigateToChannel(channelId) {
	sessionStorage.setItem("ShowAndChannelId", channelId);
	$("<div>").load("components/screens/showdetails.html", function () {
        $("#screen").empty();
        $("#screen").append($(this).html());
        
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
	                    <img class="img-fluid" style="width:332px; height: 488px;" alt="100%x280" src="${channel.background_image}">
	                </div>
                </div>`;
                document.getElementById('channels').insertAdjacentHTML('beforeend', markup);
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
	                      <img class="img-fluid" style="width:332px; height: 488px;" alt="100%x280" src="${channel.background_image}">
	                  </div>
	              </div>`;
                document.getElementById('tvShows').insertAdjacentHTML('beforeend', markup);
            });
        }
    );

