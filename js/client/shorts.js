var myLanguage = sessionStorage.getItem("locale");
if(!myLanguage){
	myLanguage = 'en';
}
var shorts_index = 1, shorts_id = 1;
function fetchShorts(){
	fetch('https://smashi.tv/api/video/shorts?page=' + shorts_index, {
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
	                  <div id="shorts${shorts_id}" tabindex="1" class="focusable card" onclick="startVideo('${short.video_link}', 1, 1)">
		                    <img class="img-fluid vertical-card" src="${short.poster_url}">
				                    <svg class="shortsplayicon" width="30" height="38" viewBox="0 0 30 38" fill="none" xmlns="http://www.w3.org/2000/svg">
				                    	<path d="M0.333252 3.89147V34.1081C0.333252 36.4123 2.87075 37.8123 4.82492 36.5581L28.5666 21.4498C30.3749 20.3123 30.3749 17.6873 28.5666 16.5206L4.82492 1.44147C2.87075 0.187299 0.333252 1.5873 0.333252 3.89147Z" fill="white"/>
				                    </svg>
			                   	<h1 class="shortstitle" style="opacity: 75%;"> ${short.title} </h1>
		                    </img>
	                  </div>
	              </div>`;
	              shorts_id++;
	              if (document.getElementById("shorts")){
	            	  document.getElementById("shorts").innerHTML += markup;
	              }
            });
            var lastElement = document.getElementById("shorts" + data.pagination.to);
            if(lastElement && data.pagination.has_more_pages){
            		lastElement.addEventListener("focus", (event) => {
                		shorts_index = data.pagination.current_page + 1;
                      fetchShorts();
                      
                      console.log("Fetching shorts...");
            	});
            }
        }
    );
}
fetchShorts();