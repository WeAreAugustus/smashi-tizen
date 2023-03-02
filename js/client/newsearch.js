function performSearch(){
	var myLanguage = sessionStorage.getItem("locale");
	if (!myLanguage) {
	    myLanguage = 'en';
	}
	var searchKeyword = document.getElementsByClassName("form-control")[0].value;
	var dataHtml = ``;
	dataHtml += `<h1 lang-value="searchresultsfor">Your search was: "${searchKeyword}"</h1>`;
	fetch('https://smashi.tv/api/video/search?q=' + searchKeyword, {
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
	            	const markup = `
	            		<div class="item">
	                        <div class="card">
		                        <img class="focusable videocard img-fluid card" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}', 1)">
		                        <h4 style="padding-top: 1rem;">${item.title}</h4>
		                        <p style="font-size: 20px; margin-top:1rem;">${item.created_at}</p>                        
	                        </div>
	                    </div>`;
	                    document.getElementById("getSearchResults").innerHTML += markup;
	            });
	        }
	    );
}