define(['client/shared'], function(shared){
    return {
        getSchedule: function(){
                        var myLanguage = sessionStorage.getItem("locale");
            if(!myLanguage){
                myLanguage = 'en';
            }
            $.ajax({
                url: shared.url['base']+shared.url['schedule'],
                type: 'GET',
                beforeSend: function (xhr){
                    xhr.setRequestHeader("Accept","application/json");
                    xhr.setRequestHeader("X-localization",myLanguage);

                },
                cors: true,
                success: function(response) {
                    response = shared.responseSuccessHandler(response);
                    console.log(typeof response.data)
                    if (response.status == 200) {
                        var dataArr = response.data.schedule_dates;
                        // totalrecord = data.success.totalrecord;
                        var html = "";
                        
                        for (var i = 0; i < dataArr.length; i++) {
                            //print date
                            var list = dataArr[i].date.split('-');
                            const day = new Date(list[0],list[1],list[2]);
                            


                            html += `
                                <div  class="row">
                                    <div class="container-fluid" style="height: 4px; background-color: white; margin-top: 5%; margin-bottom: 5%;"></div>
                                </div>
                                <h4 style="color: grey !important; margin-bottom: 40px;">${day.toDateString()}</h4>
                                
                                `;
                            for (var j = 0; j < dataArr[i].shows.length; j++){
                                var id = shared.zeroPad(j+1, 4);
                                html += `
                                <div  id="${id}0006" class="row">
                                    <div  class="col-6">
                                        <h4 style="color: white !important; margin-bottom: 40px;">${dataArr[i].shows[j].title}</h4>
                                    </div>
                                    <div  class="col-6">
                                        <h3>${dataArr[i].shows[j].start_time} - ${dataArr[i].shows[j].end_time}</h3>
                                    </div>
                                </div>
                                    `;                               
                            }
                        }
                        $("#getSchedule").html(html);
                    }
                },
                error: function(error) {
                    error = shared.responseErrorHandler(error);
                    $('#getSchedule').html('<p>An error has occurred during the request</p>');
                },
            });
        }
    }

});