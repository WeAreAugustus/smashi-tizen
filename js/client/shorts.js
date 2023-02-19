function startVideo(video_url) {
	sessionStorage.setItem("video_url", video_url);
	require(["router"], function (router) {
		router.changeScreen('player');
	});
}

var myLanguage = sessionStorage.getItem("locale");
fetch('https://smashi.tv/api/video/shorts', {
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