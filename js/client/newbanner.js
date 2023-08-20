var myLanguage = sessionStorage.getItem("locale");
if (!myLanguage) {
    var myLanguage = 'en';
}
fetch('https://api.smashi.tv/api/shows/banner', {
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
            data.data.forEach(banner => {
            	if(banner.body == null){
            		banner.body = "";
            	}
            	const markup = `
            	<div id="homeBannerSection" class="swiper-slide" onclick="navigateToChannel(${banner.id})">
		                <div id="titleandbody" style="position: absolute; padding-inline-start: 4rem; padding-inline-end: 34rem; padding-block-start: 12rem;">
		                    <h1 id="homeBannerTitle" style="color:white; font-size: 48px; font-weight: 700;">${banner.title}</h1>
		                    <span id="homeBannerBody" style="color:white; font-size: 32px; width: 60%;">${banner.body}</span>
		                </div>
	                <img id="homeBannerImage" loading="lazy" src="${banner.master_image}">
                </div>
            	`;
                if(document.getElementById('banner')){
                	document.getElementById("banner").innerHTML += markup;
                }
            });
        }
    );


