var myLanguage = sessionStorage.getItem("locale");
if (!myLanguage) {
    myLanguage = 'en';
}
function changeBanner(bannerURL, title, body){
	document.getElementById('homeBannerImage').style.backgroundImage = "url('" + bannerURL + "')";
	document.getElementById('homeBannerTitle').innerHTML = title;
	if(body != "null"){
		document.getElementById('homeBannerBody').innerHTML = body;
	}
	else{
		document.getElementById('homeBannerBody').innerHTML = "";
	}
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
        	console.log(data.data[0]);
        	document.getElementById('homeBannerImage').style.backgroundImage = "url('" + data.data[0].master_image + "')";
        	document.getElementById('homeBannerTitle').innerHTML = data.data[0].title;
        	if(data.data[0].body != "null"){
        		document.getElementById('homeBannerBody').innerHTML = data.data[0].body;
        	}
        	else{
        		document.getElementById('homeBannerBody').innerHTML = "";
        	}
            data.data.forEach(logo => {
            	var markup = ``;
            	markup = `
        		<div class="card" style="display: inline-block; padding-inline-end: 1rem;">
                    <div class="logocard focusable" tabindex="1" onclick="navigateToChannel(${logo.id})" onfocus="changeBanner('${logo.master_image}', '${logo.title}', '${logo.body}')">
                        <img class="logoimg img-fluid" src="${logo.logo}">
                    </div>
                </div>`;
                if (document.getElementById('logos')) {
                    document.getElementById("logos").innerHTML += markup;
                }
            });
        }
    );