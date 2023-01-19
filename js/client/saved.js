define(['client/shared','js/cdn/paginationmin.js'], function (shared, pagination) {
    return {
        datacontainer: function (user_id, device_id) {
                        var myLanguage = sessionStorage.getItem("locale");
            if(!myLanguage){
                myLanguage = 'en';
            }

            let container = $('#pagination');
            container.pagination({
                dataSource: 'https://smashi.tv/api/saved/video/list?user_id='+user_id+'&device_id=sss',
                locator: 'data',
                ajax: {
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Accept", "application/json");
                        xhr.setRequestHeader("X-localization",myLanguage);
                    },
                },
                data: {
                    user_id: user_id,
                    device_id: device_id
                },
                cors: true,
                showPageNumbers: true,
                callback: function (data, pagination) {
                    mytoken = sessionStorage.getItem("token");

                    if(mytoken == null){
                        document.getElementById("containerme").style.display = "none";
                        document.getElementById("containerme2").style.display = "";
                        //alert("You don't have saved videos yet");
                    } else {
                    // console.log(data);
                    var savedVideosList = JSON.stringify(data);
                    sessionStorage.setItem("savedVideoList", savedVideosList);
                    console.log(data.length);
                    if(data.length == 0){
                        document.getElementById('noSavedVideos').style.display = "";
                        // document.getElementById('savedVideoWatch').style.display = "none";
                    }else{
                        // document.getElementById('savedVideoWatch').style.display = "none";
                    }
                    var dataHtml = ``;
                    // var row_vendor = []; // empty array
                    $.each(data, function (index, item) {

                        
                        var id = shared.zeroPad(index + 1, 4);
                        dataHtml += `

                    <div  id="`+ item.video_link + `" onkeypress="myFunction(this.id, this.textContent);" style="height: 380px;display: inline-bock;cursor: pointer !important;" class="item">
                        <div  class="card" id="${id}0004" tabindex="1">
                            <img class="img-fluid" alt="100%x280" src="${item.poster_url}">
                            <div>
                                <h4 id="demo" class="entry-title">${item.title}</h4> 
                            </div> 
                        </div>
                    </div>
                    <script>
                    document.getElementsByName("video")[0].src = "${item.video_link}";
                    document.getElementsByName("savedVideoTitle")[0].innerHTML = "${item.title}";

                        function myFunction(vendor, cute){


                            var video = document.querySelector('#saved_page_player');
                            if (Hls.isSupported()) {
                                var hls = new Hls();
                                hls.loadSource(vendor);
                                hls.attachMedia(video);
                                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                                video.play();
                                });
                            }

                            
                            document.getElementById("savedVideoWatch").style.display = "";
                            document.getElementById("savedVideoTitle").style.display = "";
                            document.getElementsByName("savedVideoTitle")[0].innerHTML = cute;
                        }
                    </script>
                    `;
                    });
                    $("#datacontainer").html(dataHtml);
                    }
                }
            });
        },
        savedVideoWatch: function(){
            var dataHtml = "";
            dataHtml += `         
            <div class="row">
                <div class="col">
                    <video name="video" preload="none" id="saved_page_player" autoplay controls crossorigin style="width: 100%;margin: auto"></video>
                </div>
            </div>
            `;
            $("#savedVideoWatch").html(dataHtml);
        }
    }

});