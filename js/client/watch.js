require(["router"], function (router) {
	router.showSideBar();
});

var hasSubscription = sessionStorage.getItem("hasSubscription");
fetch('https://smashi.tv/api/watch', {
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
        	var i = 0;
        	var allShows = data.data; 
            allShows.forEach(show => {
            	var markup = `
            	<div class="container-fluid">
            		<h1 class="title">${show.title}</h1>
            	</div>
            	`;
            	var videosOfShow = show.videos;
            	videosOfShow.forEach(video => {
            		markup += `
	            		<div class="item">
	                        <div class="card">
		                        <img id="watchthumb${video.is_clip}" class="focusable videocard img-fluid card watchvideo" src="${video.poster_url}" tabindex="1" onclick="startVideo('${video.video_link}', ${video.is_clip}, 1)">
		                        <h4 class="video-duration">${video.video_duration}</h4>
		                        <img id="lockiconwatch${i}" class="lockicon" src="img/icons/lock_inactive.svg">
		                        <h4 class="two-line-truncate" style="margin-top: 0.5rem;">${video.title}</h4>
		                        <p style="font-size: 20px; margin-top:1rem; opacity: 50%;">${video.created_at}</p>                        
	                        </div>
	                    </div>
                    `; 
                    i++;
//                    <img id="lockiconwatch" class="lockicon" src="img/icons/lock_inactive.svg">
            	});
            	document.getElementById("watch").innerHTML += markup;
            });    
            var allWatchVideos = document.getElementsByClassName("watchvideo");
            for (let i = 0; i < allWatchVideos.length; i++) {
            	  if(allWatchVideos[i].id == 'watchthumb1' || hasSubscription == "true"){
            		  document.getElementById("lockiconwatch" + i).remove();
            	  }
            }
            allWatchVideos[allWatchVideos.length - 1].onfocus = scrollToRight;
        });
