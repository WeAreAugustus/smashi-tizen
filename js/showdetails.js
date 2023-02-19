function startVideo(video_url) {
	sessionStorage.setItem("video_url", video_url);
	require(["router"], function (router) {
		router.changeScreen('player');
	});
}

var showId = sessionStorage.getItem('ShowAndChannelId');
    	var episodesURL = 'https://smashi.tv/api/video/shows/' + showId + '/details';
    	var clipsURL = 'https://smashi.tv/api/video/shows/' + showId + '/clips/videos';
    	var shortsUrl = 'https://smashi.tv/api/video/shorts?show_id=' + showId;
    	var myLanguage = sessionStorage.getItem("locale");
            if (!myLanguage) {
                myLanguage = 'en';
            }
        fetch(episodesURL, {
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
                    var details = data.data.showVideo;
                    var videodetails = data.data.relatedShowVideos;
                    var markup = `
                    <div style="background-image: url(${details.master_image}); background-repeat: no-repeat; background-size: cover; height: 37rem;"> 
                        <div style="padding: 11rem 4rem;">
                            <h1 style="color:white; font-size: 48px; font-weight: 700;"> ${details.title} </h1>
                            <p id="bannerBody" style="color:white; font-size: 32px; width:50%;"> ${details.body} </p>
    						<button class="focusable newbutton watchlivebutton" lang-value="watch" style="font-weight: 700; font-size: 32px; width: 25%" autofocus>Watch Live</button>
                        </div>
                    </div>
                    ` 
                    ;
                    document.getElementById('showDetailsBanner').insertAdjacentHTML('beforeend', markup);
                    if (!details.body){
    		            document.getElementById('bannerBody').remove();
    				}
                    videodetails.forEach(item => {
                    markup = `<div class="item">
			                    <div style="position: static; padding: 8px;" class="card">
			                    <img class="focusable img-fluid card" alt="100%x280" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}')" style="width: 471px; height: 264px; object-fit: contain;">
			                    <h4 style="padding-top: 1rem;">${item.title}</h4>
			                    <p style="font-size: 20px; margin-top:1rem;">${item.created_at}</p>                        
			                    </div>
			                  </div>`;
                    document.getElementById('episodes').insertAdjacentHTML('beforeend', markup);
                });
                if (videodetails.length == 0) {
                    document.getElementById('episodesrow').remove();
					}
                }
            );
            fetch(clipsURL, {
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
                    var clipsdetails = data.data.relatedShowVideos;
                    var markup = ``;
                    clipsdetails.forEach(item => {
                    	markup = `<div class="item">
	                    <div style="position: static; padding: 8px;" class="card">
	                    <img class="focusable img-fluid card" alt="100%x280" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}')" style="width: 471px; height: 264px; object-fit: contain;">
	                    <h4 style="padding-top: 1rem;">${item.title}</h4>
	                    <p style="font-size: 20px; margin-top:1rem;">${item.created_at}</p>                        
	                    </div>
	                  </div>`;
                    document.getElementById('clips').insertAdjacentHTML('beforeend', markup);
                });
                if (clipsdetails.length == 0) {
                    	document.getElementById('clipsrow').remove();
                    }
                }
            );
            fetch(shortsUrl, {
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
                    data.data.forEach(short => {
                        const markup = `<div style="width:332px;" class="item">
        	                  <div tabindex="1" class="focusable card" onclick="startVideo('${short.video_link}')">
        	                      <img class="img-fluid vertical-card" src="${short.poster_url}">
        	                  </div>
        	              </div>`;
                        document.getElementById('shorts').insertAdjacentHTML('beforeend', markup);
                    });
                }
            );
            