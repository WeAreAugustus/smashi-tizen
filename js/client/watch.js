require(["router"], function (router) {
	router.showSideBar();
});

function checkLockWatch(checker){
	hasSubscription = sessionStorage.getItem("hasSubscription");
	if(hasSubscription || checker == 1){
		console.log(hasSubscription, checker);
		console.log("Icon removed");
		document.getElementById('lockiconwatch').remove();
	}
}

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
		                        <img class="focusable videocard img-fluid card" src="${video.poster_url}" tabindex="1" onclick="startVideo('${video.video_link}', ${video.is_clip})">
		                        	<img id="lockiconwatch" class="lockicon" src="img/icons/lock_inactive.svg">
		                        </img>
		                        <h4 style="padding-top: 1rem;">Is_clip: ${video.is_clip}</h4>
		                        <h4 style="padding-top: 1rem;">${video.title}</h4>
		                        <p style="font-size: 20px; margin-top:1rem;">${video.created_at}</p>                        
	                        </div>
	                    </div>
                    `; 
            	});
            	document.getElementById("watch").innerHTML += markup;
            });        
        });