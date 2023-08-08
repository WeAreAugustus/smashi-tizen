var myLanguage = sessionStorage.getItem("locale");
	if(!myLanguage){
		myLanguage = 'en';
	}
	var latest_index = 1, latest_id = 1;
    function fetchLatest(){
    	fetch('https://www.smashi.tv/api/video?page=' + latest_index, {
    		headers: {
    			'Access-Control-Allow-Origin': '*',
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
        	                        <img id="latest${latest_id}" class="focusable videocard img-fluid card" loading="lazy" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}', 1, 1)">
        	                        <h4 class="video-duration">${item.video_duration}</h4>
        	                        <h4 class="two-line-truncate" style="margin-top: 0.5rem;">${item.title}</h4>
        	                        <p style="font-size: 20px; margin-top:1rem; opacity: 50%;">${item.created_at}</p>                        
                                </div>
                            </div>`;
                            latest_id++;
                            if(document.getElementById("latest")){
                            	document.getElementById("latest").innerHTML += markup;
                             }
                            
                            //Pagination
                            var lastElement = document.getElementById("latest" + data.pagination.to);
                            if(lastElement && data.pagination.has_more_pages){
                            	lastElement.addEventListener("focus", (event) => {
	                              	  latest_index = data.pagination.current_page + 1;
	                              	  fetchLatest();
	                              	  lastElement.focus();
	                              	  console.log("Fetching latest...");
                              });
                            }
                    });
                }
            )
            .catch((error) => {
            	console.error('There has been a problem with your fetch operation:', error)
            });
    }
    fetchLatest();
    var trending_index = 1, trending_id = 1;
    function fetchTrending(){
    	fetch('https://www.smashi.tv/api/video/trending?page=' + trending_index, {
    		headers: {
    			'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
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
        	                        <img id="trending${trending_id}" class="focusable videocard img-fluid card" loading="lazy" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}', 1, 1)">
        	                        <h4 class="video-duration">${item.video_duration}</h4>
        	                        <h4 class="two-line-truncate" style="margin-top: 0.5rem;">${item.title}</h4>
        	                        <p style="font-size: 20px; margin-top:1rem; opacity: 50%;">${item.created_at}</p>                        
                                </div>
                            </div>`;
                            trending_id++;
                            if (document.getElementById("trending")){
                            	document.getElementById("trending").innerHTML += markup;                            	
                            }
                            
                            var lastElement = document.getElementById("trending" + data.pagination.to);
                            if(lastElement && data.pagination.has_more_pages){
                            	lastElement.addEventListener("focus", (event) => {
                            	  trending_index = data.pagination.current_page + 1;
                              	  fetchTrending();
                              	  lastElement.focus();
                              	  console.log("Fetching trending...");
                              });
                            }
                    });
                }
            );
    }
    fetchTrending();