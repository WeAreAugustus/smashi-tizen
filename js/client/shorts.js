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
			                    <img class="shortsplayicon" src="img/icons/playicon.svg">
			                   	<h1 class="shortstitle"> ${short.title} </h1>
		                    </img>
	                  </div>
	              </div>`;
	              shorts_id++;
	              document.getElementById("shorts").innerHTML += markup;
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