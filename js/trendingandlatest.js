
function startVideo(video_url) {
	sessionStorage.setItem("video_url", video_url);
	require(["router"], function (router) {
		router.changeScreen('player');
	});
}

var myLanguage = sessionStorage.getItem("locale");
	if(!myLanguage){
		myLanguage = 'en';
	}
    fetch('http://smashi.tv/api/video', {
		headers: {
			'Accept': 'application/json',
			'X-localization': myLanguage
			}
		})
        .then(
            res => {
                return res.json();
            })
        .then(data => {
                data.data.forEach(item => {
                	const markup = `<div class="item">
                            <div style="position: static; padding: 8px;" class="card">
    	                        <img class="focusable videocard img-fluid card" alt="100%x280" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}')">
    	                        <h4 style="padding-top: 1rem;">${item.title}</h4>
    	                        <p style="font-size: 20px; margin-top:1rem;">${item.created_at}</p>                        
                            </div>
                        </div>`;
                    document.getElementById('latest').insertAdjacentHTML('beforeend', markup);
                });
            }
        )
        .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error)
        });
        fetch('http://smashi.tv/api/video/trending', {
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
                data.data.forEach(item => {
                	const markup = `<div class="item">
                            <div style="position: static; padding: 8px;" class="card">
    	                        <img class="focusable videocard img-fluid card" alt="100%x280" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}')">
    	                        <h4 style="padding-top: 1rem;">${item.title}</h4>
    	                        <p style="font-size: 20px; margin-top:1rem;">${item.created_at}</p>                        
                            </div>
                        </div>`;
                    document.getElementById('trending').insertAdjacentHTML('beforeend', markup);
                });
            }
        );