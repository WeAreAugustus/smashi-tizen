var myLanguage = sessionStorage.getItem("locale");
if(!myLanguage){
	myLanguage = 'en';
}
//https://smashi.tv/api/webinar/scheduled/event
//https://api.jsonbin.io/v3/b/64074044ebd26539d08aa16f
function fetchLive(){
    	fetch('https://smashi.tv/api/webinar/scheduled/event', {
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
        	                        <h4 class="eventdate" style="">${item.start_date_string}</h4>
                                </div>
                            </div>`;
                            //Remove live/upcoming tag according to the state of the event
                            document.getElementById("events").innerHTML += markup;
                            
                            //Add the starting date of the event
                            var dateStr = item.start_date_string;
                            var dateObj = new Date(dateStr);
                            var year = dateObj.getFullYear().toString().substr(-2);
                            var month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObj);
                            var day = dateObj.getDate();
                            var hour = dateObj.getHours();
                            var minute = dateObj.getMinutes();
                            var formattedDate = `${day} ${month} ${hour}:${minute}`;
                            if (item.is_live){
                            	var livenow = ``;
                            	if (myLanguage == 'en') livenow = `Live now`;
                            	else livenow = `مباشر الأن`;
                            	
                            	document.getElementsByClassName("eventdate")[index].innerHTML = livenow;
                            	document.getElementsByClassName("upcomingtag")[index].style.display = "none";
                            }
                            else{
                            	document.getElementsByClassName("eventdate")[index].innerHTML = formattedDate;
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

