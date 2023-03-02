var myLanguage = sessionStorage.getItem("locale");
if(!myLanguage){
	myLanguage = 'en';
}
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
        }
    );