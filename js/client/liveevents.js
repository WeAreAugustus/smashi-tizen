var myLanguage = sessionStorage.getItem("locale");
if(!myLanguage){
	myLanguage = 'en';
}
//https://www.smashi.tv/api/webinar/scheduled/event
//https://api.jsonbin.io/v3/b/64074044ebd26539d08aa16f
function fetchLive(){
    	fetch('https://www.smashi.tv/api/webinar/scheduled/event', {
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
            		var index = 0;
            		var response = data.data;
            		if (response == ""){
            			document.getElementById("eventstitle").style.display = "none";
            			return;
            		}
            		response.forEach(item => {
                    	const markup = `
                    		<div class="item card">
                                <div class="card">
        	                        <img id="event" class="focusable videocard img-fluid card" src="${item.poster}" tabindex="1" onclick="startVideo('${item.live_url}', 0, ${item.is_live})">
        	                        <h4 id="upcomingtag" style="color: black; background-color: white;" class="overthumbnail upcomingtag" lang-value="upcoming"> Upcoming </h4>
        	                        <h4 id="livetag" style="color: white; background-color: #E50201;" class="overthumbnail livetag" lang-value="live"> Live </h4>
        	                        <h4 style="padding-top: 1rem;">${item.title}</h4>
        	                        <h4 class="eventdate" style="opacity: 50%;">${item.start_date_string}</h4>
                                </div>
                            </div>`;
                            //Remove live/upcoming tag according to the state of the event
                            document.getElementById("events").innerHTML += markup;
                            //Add the starting date of the event
                            const timestamp = item.start_date_mill_sec;

                            const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
                            const formattedDate = date.toLocaleDateString('en-US');
                            const formattedTime = date.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            });
                            var currnetDate = formattedDate + " " + formattedTime;
                            if (item.is_live){
                            	var livenow = ``;
                            	if (myLanguage == 'en') livenow = `Live now`;
                            	else livenow = `مباشر الأن`;
                            	
                            	document.getElementsByClassName("eventdate")[index].innerHTML = livenow;
                            	document.getElementsByClassName("upcomingtag")[index].style.display = "none";
                            }
                            else{
                            	document.getElementsByClassName("eventdate")[index].innerHTML = currnetDate;
                            	document.getElementsByClassName("livetag")[index].style.display = "none";
                            }
                            index++;
                    });
                }
            )
            .catch((error) => {
            	console.error('There has been a problem with your [events] fetch operation:', error)
            });
    		
    }
fetchLive();

