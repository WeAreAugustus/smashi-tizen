require(["router"], function (router) {
	router.hideSideBar();
});

function checkLock(){
	hasSubscription = sessionStorage.getItem("hasSubscription");
	if(hasSubscription){
		document.getElementById('lockicon').remove();
	}
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
                    var firstVideoLink = videodetails[0].video_link;
                    var markup = `
                    <div style="background-image: url(${details.master_image}); background-repeat: no-repeat; background-size: cover; height: 37rem;"> 
                        <div style="padding: 11rem 4rem;">
                            <h1 style="color:white; font-size: 48px; font-weight: 700;"> ${details.title} </h1>
                            <p id="bannerBody" style="color:white; font-size: 32px; width:50%;"> ${details.body} </p>
    						<button class="focusable newbutton watchlivebutton" id="watchnowbutt" lang-value="watch" onclick="startVideo('${videodetails[0].video_link}', ${videodetails[0].is_clip})"></button>
                        </div>
                    </div>
                    ` 
                    ;
                    document.getElementById('showDetailsBanner').innerHTML += markup;
                    
                    if(myLanguage == 'en'){
                    	document.getElementById('watchnowbutt').innerHTML += 'Watch now';
                    }
                    else{
                    	document.getElementById('watchnowbutt').innerHTML += 'شاهد الأن';
                    }
                    
                    if (!details.body){
    		            document.getElementById('bannerBody').remove();
    				}
                    videodetails.forEach(item => {
                    	markup = `
                		<div class="item card">
                            <div class="card">
    	                        <img class="focusable videocard img-fluid card" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}', ${item.is_clip})">
    	                        	<img id="lockicon" class="lockicon" src="img/icons/lock_inactive.svg" onload="checkLock()"> 
    	                        </img>
    	                        <h4 style="padding-top: 1rem;">${item.title}</h4>
    	                        <p style="font-size: 20px; margin-top:1rem;">${item.created_at}</p>                        
                            </div>
                        </div>
                        `;
                        document.getElementById("episodes").innerHTML += markup;
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
                    	markup = `
                		<div class="item card">
                            <div class="card">
    	                        <img class="focusable videocard img-fluid card" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}', 1)">
    	                        <h4 style="padding-top: 1rem;">${item.title}</h4>
    	                        <p style="font-size: 20px; margin-top:1rem;">${item.created_at}</p>                        
                            </div>
                        </div>`;
                        document.getElementById("clips").innerHTML += markup;
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
                	var shorts = data.data;
                    shorts.forEach(short => {
                    	const markup = `
                        <div style="width:332px;" class="item">
        	                  <div tabindex="1" class="focusable card" onclick="startVideo('${short.video_link}', 1)">
        		                    <img class="img-fluid vertical-card" src="${short.poster_url}" style="background: linear-gradient(#ececec00, #000000); z-index=-1;">
        			                    <img class="shortsplayicon" src="img/icons/playicon.svg">
        			                   	<h1 class="shortstitle"> ${short.title} </h1>
        		                    </img>
        	                  </div>
        	              </div>`;
        	              document.getElementById("shorts").innerHTML += markup;
                    });
                    if (shorts.length == 0) {
                    	document.getElementById('ShortsMainSection').remove();
                    }
                }
            );
            