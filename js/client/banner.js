var myLanguage = sessionStorage.getItem("locale");
if (!myLanguage) {
    var myLanguage = 'en';
}
function changeBanner(bannerURL, title, body){
	if(body == "null"){
		body = "";
	}
//	document.getElementById('homeBannerImage').style.backgroundImage = "url('" + bannerURL + "')";
	document.getElementById('homeBannerImage').src = bannerURL;
	document.getElementById('homeBannerTitle').innerHTML = title;
	document.getElementById('homeBannerBody').innerHTML = body;
}
fetch("https://smashi.tv/api/shows/banner", {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-localization': myLanguage
        }
    })
    .then(
        res => {
        	if (!res.ok) {
                throw new Error('Network response was not OK');
            }
            return res.json()
        })
    .then(
    		data => {
//        	document.getElementById('homeBannerImage').style.backgroundImage = "url('" + data.data[0].master_image + "')";
    		document.getElementById('homeBannerImage').src = data.data[0].master_image;
    		document.getElementById('homeBannerTitle').innerHTML = String(data.data[0].title);
        	document.getElementById('homeBannerBody').innerHTML = String(data.data[0].body);
        	for (let i = 0; i < data.data.length; i++){
        		var title = String(data.data[i].title);
        		var body = String(data.data[i].body);
        		title = title.replace(/[\r\n/'"]/g, ' ');
        		body = body.replace(/[\r\n/'"]/g, ' ');
//        		onclick="navigateToChannel(${data.data[i].id})"
        		var markup = `
        		<div class="card" style="display: inline-block; padding-inline-end: 1rem;">
                    <div class="logocard focusable" tabindex="1" onclick="changeBanner('${data.data[i].master_image}', '${title}', '${body}')">
                        <img class="logoimg img-fluid" src="${data.data[i].logo}" loading="lazy">
                    </div>
                </div>`;
                if (document.getElementById('logos')) {
                    document.getElementById("logos").innerHTML += markup;
                }
        	}
        }
    )
    
