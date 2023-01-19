function navigateToChannel(channelId) {
	sessionStorage.setItem("ShowAndChannelId", channelId);
	$("<div>").load("components/screens/showdetails.html", function () {
        $("#screen").empty();
        $("#screen").append($(this).html());
    });
}
fetch('https://smashi.tv/api/video/shows/channel')
    .then(
        res => {
            return res.json();
        })
    .then(
        data => {
//            console.log(data.data);
            var id = 10004;
            var i = 0;
            var pre = '000';
            data.data.forEach(channel => {
                let newid = pre + id;
                i++;
                id += 10000;
                const markup = `
                	<div id="${channel.id}" style="width:332px;" class="item">
                        <a id="${newid}" class="card" tabindex="1" onkeypress="navigateToChannel(${channel.id})">
                            <img class="img-fluid" style="width:332px; height: 488px;" alt="100%x280" src="${channel.background_image}">
                        </a>
                    </div>`;
                document.getElementById('channels').insertAdjacentHTML('beforeend', markup);
                if (i === 9) {pre = '00';}
            });
        }
    );
fetch('https://smashi.tv/api/video/shows')
    .then(
        res => {
            return res.json();
        })
    .then(
        data => {
            var id = 10005;
            var i = 0;
            var pre = '000';
            data.data.forEach(channel => {
                let newid = pre + id;
                i++;
                id += 10000;
                const markup = `<div style="width:332px;" class="item">
	                  <div id="${newid}" class="card" tabindex="1" onkeypress="navigateToChannel(${channel.id})">
	                      <img class="img-fluid" style="width:332px; height: 488px;" alt="100%x280" src="${channel.background_image}">
	
	                  </div>
	              </div>`;
                document.getElementById('tvShows').insertAdjacentHTML('beforeend', markup);
                if (i === 9) {pre = '00';}
            });
        }
    );

