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
                	const markup = `
                		<div class="item card">
                            <div class="card">
    	                        <img class="focusable videocard img-fluid card" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}', 1)">
    	                        <h4 style="padding-top: 1rem;">${item.title}</h4>
    	                        <p style="font-size: 20px; margin-top:1rem;">${item.created_at}</p>                        
                            </div>
                        </div>`;
                        document.getElementById("latest").innerHTML += markup;
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
                	const markup = `
                		<div class="item">
                            <div class="card">
    	                        <img class="focusable videocard img-fluid card" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}', 1)">
    	                        <h4 style="padding-top: 1rem;">${item.title}</h4>
    	                        <p style="font-size: 20px; margin-top:1rem;">${item.created_at}</p>                        
                            </div>
                        </div>`;
                        document.getElementById("trending").innerHTML += markup;
                });
            }
        );