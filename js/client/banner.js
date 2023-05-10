var myLanguage = sessionStorage.getItem("locale");
if (!myLanguage) {
    myLanguage = 'en';
}
function changeBanner(bannerURL, title, body){
	if(body == "null"){
		body = "";
	}
	document.getElementById('homeBannerImage').style.backgroundImage = "url('" + bannerURL + "')";
	document.getElementById('homeBannerTitle').innerHTML = title;
	document.getElementById('homeBannerBody').innerHTML = body;
}
function navigateToChannel(channelId) {
	sessionStorage.setItem("ShowAndChannelId", channelId);
	changeScreenGlobal(showdetails);
}
fetch('https://www.smashi.tv/api/shows/banner', {
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
        	document.getElementById('homeBannerImage').style.backgroundImage = "url('" + data.data[0].master_image + "')";
        	document.getElementById('homeBannerTitle').innerHTML = String(data.data[0].title);
        	document.getElementById('homeBannerBody').innerHTML = String(data.data[0].body);
        	for (let i = 0; i < data.data.length; i++){
        		var title = String(data.data[i].title);
        		var body = String(data.data[i].body);
        		title = title.replace(/[\r\n/'"]/g, ' ');
        		body = body.replace(/[\r\n/'"]/g, ' ');
        		var markup = `
        		<div class="card" style="display: inline-block; padding-inline-end: 1rem;">
                    <div class="logocard focusable" tabindex="1" onclick="navigateToChannel(${data.data[i].id})" onfocus="changeBanner('${data.data[i].master_image}', '${title}', '${body}')">
                        <img class="logoimg img-fluid" src="${data.data[i].logo}">
                    </div>
                </div>`;
                if (document.getElementById('logos')) {
                    document.getElementById("logos").innerHTML += markup;
                }
                
        	}
        }
    );