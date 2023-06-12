require(["router"], function (router) {
	router.hideSideBar();
});
function checkLock(){
	var hasSubscription = sessionStorage.getItem("hasSubscription");
	if(hasSubscription == "true"){
		document.getElementById('lockicon').remove();
	}
}
		var showId = sessionStorage.getItem('ShowAndChannelId');
		
		var episodes_index = 1, episodes_id = 1;
  		
  		var clips_index = 1, clips_id = 1;
    	
    	var showshorts_index = 1, showshorts_id = 1;
    	
    	var firstVideo = null, firstVideoIsClip = null;
    	
    	var myLanguage = sessionStorage.getItem("locale");
            if (!myLanguage) {
                myLanguage = 'en';
            }
        function  fetchEpisodes(){
        	var episodesURL = 'https://smashi.tv/api/video/shows/' + showId + '/details?page=' + episodes_index;
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
                    
                    if (videodetails.length > 0){
                    	firstVideo = videodetails[0].video_link;
                    	firstVideoIsClip = videodetails[0].is_clip;
                    }
                    else{
                    	console.log("No eps");
                    }
                    
                    var markup = `
                    <div style="background-image: url(${details.master_image}); background-repeat: no-repeat; background-size: cover; height: 37rem;"> 
                        <div style="padding: 11rem 4rem;">
                            <h1 style="color:white; font-size: 48px; font-weight: 700;"> ${details.title} </h1>
                            <p id="bannerBody" style="color:white; font-size: 32px; width:50%;"> ${details.body} </p>
    						<button class="focusable newbutton watchlivebutton" id="watchnowbutt" lang-value="watch" onclick="startVideo(firstVideo, firstVideoIsClip, 1)" onfocus="scrollToTop()"></button>
                        </div>
                    </div>` 
                    ;
                    
                    if(document.getElementById('showDetailsBanner')){
                        if (document.getElementById('showDetailsBanner').innerHTML.trim() == ''){
                        	document.getElementById('showDetailsBanner').innerHTML += markup;
                        	if(myLanguage == 'en'){
                            	document.getElementById('watchnowbutt').innerHTML += 'Watch now';
                            }
                            else{
                            	document.getElementById('watchnowbutt').innerHTML += 'شاهد الأن';
                            }
                        }
                    }
                    
                    
                    if (!details.body){
    		            document.getElementById('bannerBody').remove();
    				}
                    videodetails.forEach(item => {
                    	markup = `
                		<div class="item card">
                            <div class="card">
    	                        <img id="episode${episodes_id}" class="focusable videocard img-fluid card" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}', ${item.is_clip}, 1)">
    	                        <h4 class="video-duration">${item.video_duration}</h4>
    	                        <img id="lockicon" class="lockicon" src="img/icons/lock_inactive.svg" onload="checkLock()"> 
    	                        <h4 class="two-line-truncate" style="margin-top: 0.5rem;">${item.title}</h4>
    	                        <p style="font-size: 20px; margin-top:1rem; opacity: 50%;">${item.created_at}</p>                        
                            </div>
                        </div>
                        `;
                        episodes_id++;
                        if(document.getElementById("episodes")){
                        	document.getElementById("episodes").innerHTML += markup;
                        }
                        
                        var lastElement = document.getElementById("episode" + data.data.pagination.to);
                        if(lastElement && data.data.pagination.has_more_pages){
                        	lastElement.addEventListener("focus", (event) => {
                        		episodes_index = data.data.pagination.current_page + 1;
                                fetchEpisodes();
                                lastElement.focus();
                            	console.log("Fetching episodes...");
                          });
                        }
                });
                if (videodetails.length == 0) {
                    document.getElementById('episodesrow').remove();
					}
                }
            );
        }
        fetchEpisodes();
        function fetchClips(){
        	var clipsURL = 'https://smashi.tv/api/video/shows/' + showId + '/clips/videos?page=' + clips_index;
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
                    if (!firstVideo && clipsdetails.length > 0){
                    	firstVideo = clipsdetails[0].video_link;
                    	firstVideoIsClip = clipsdetails[0].is_clip;
                    }
                    var markup = ``;
                    clipsdetails.forEach(item => {
                    	markup = `
                		<div class="item card">
                            <div class="card">
    	                        <img id="clips${clips_id}" class="focusable videocard img-fluid card" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}', 1, 1)">
    	                        <h4 class="video-duration">${item.video_duration}</h4>
    	                        <h4 class="two-line-truncate" style="margin-top: 0.5rem;">${item.title}</h4>
    	                        <p style="font-size: 20px; margin-top:1rem; opacity: 50%;">${item.created_at}</p>                        
                            </div>
                        </div>`;
                        clips_id++;
                        if(document.getElementById("clips")){
                        	document.getElementById("clips").innerHTML += markup;
                        }
                        
                        var lastElement = document.getElementById("clips" + data.data.pagination.to);
                        	if(lastElement && data.data.pagination.has_more_pages){
                        		lastElement.addEventListener("focus", (event) => {
      	                  		clips_index = data.pagination.current_page + 1;
      	                        fetchClips();
      	                        lastElement.focus();
      	                        console.log("Fetching clips...");
                        		});
                        }
                });
                if (clipsdetails.length == 0) {
                    	document.getElementById('clipsrow').remove();
                    }
                }
            );
        }
        fetchClips();
        function fetchShowShorts(){
        	var shortsUrl = 'https://smashi.tv/api/video/shorts?show_id=' + showId + '&page=' + showshorts_index;
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
                    if (!firstVideo && shorts.length > 0){
                    	firstVideo = shorts[0].video_link;
                    	firstVideoIsClip = 1;
                    }
                    else{
                    	document.getElementById("watchnowbutt").setAttribute("disabled", true);
                    }
                    shorts.forEach(short => {
                    	const markup = `
                        <div style="width:332px;" class="item">
        	                  <div id="showshort${showshorts_id}" tabindex="1" class="focusable card" onclick="startVideo('${short.video_link}', 1, 1)">
        		                    <img class="img-fluid vertical-card" src="${short.poster_url}" style="background: linear-gradient(#ececec00, #000000); z-index=-1;">
						                    <svg class="shortsplayicon" width="30" height="38" viewBox="0 0 30 38" fill="none" xmlns="http://www.w3.org/2000/svg">
						                    	<path d="M0.333252 3.89147V34.1081C0.333252 36.4123 2.87075 37.8123 4.82492 36.5581L28.5666 21.4498C30.3749 20.3123 30.3749 17.6873 28.5666 16.5206L4.82492 1.44147C2.87075 0.187299 0.333252 1.5873 0.333252 3.89147Z" fill="white"/>
						                    </svg>
        			                   	<h1 class="two-line-truncate shortstitle"> ${short.title} </h1>
        		                    </img>
        	                  </div>
        	              </div>`;
        	              showshorts_id++;
        	              if(document.getElementById("shorts")){
        	            	  document.getElementById("shorts").innerHTML += markup;
        	              }
        	              
        	              var lastElement = document.getElementById("showshort" + data.pagination.to);
        	              if(lastElement && data.pagination.has_more_pages){
                      		lastElement.addEventListener("focus", (event) => {
                      			showshorts_index = data.pagination.current_page + 1;
                      			fetchShowShorts();
                      			lastElement.focus();
    	                        console.log("Fetching show shorts...");
                      		});
                      }
                    });
                    if (shorts.length == 0) {
                    	document.getElementById('ShortsMainSection').remove();
                    }
                }
            );
        }
        fetchShowShorts();
        
            