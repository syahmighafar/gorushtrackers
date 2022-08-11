document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("trackbutton").addEventListener("click", tracknumber);

    function tracknumber() {
        document.getElementById("trackingresultarea").style.display = 'block';

        var jobidentitynum = '';
        jobidentitynum = document.getElementById("jobid").value.trim();
        document.getElementById('jobid').value = '';

        var responsejd = '';
        var json_responsejd = '';
        var responseo = '';
        var json_responseo = '';
        var responsefp = '';
        var json_responsefp = '';
        var counttaskhistory = 0;

        var finaldate = '';
        var finalday = '';

        var request = new XMLHttpRequest();

        document.getElementById("trackinghistorydetails").innerHTML = "";
        document.getElementById("trackingresultbox").style.display = 'none';
        document.getElementById("trackingresultbox2").style.display = 'none';
        document.getElementById("wronginput").style.display = 'none';

        document.getElementById("loading").style.display = 'inline';

        request.open('POST', 'https://api.tookanapp.com/v2/get_job_details');

        request.setRequestHeader('Content-Type', 'application/json');

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);
                responsejd = this.responseText;
                json_responsejd = JSON.parse(responsejd);

                if (json_responsejd.status != 404) {
                    request.open('POST', 'https://api.tookanapp.com/v2/get_job_details_by_order_id');

                    request.setRequestHeader('Content-Type', 'application/json');

                    request.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            console.log('Status:', this.status);
                            console.log('Headers:', this.getAllResponseHeaders());
                            console.log('Body:', this.responseText);
                            responseo = this.responseText;
                            json_responseo = JSON.parse(responseo);

                            if (json_responsejd.message = "Successful") {
                                request.open('POST', 'https://api.tookanapp.com/v2/view_fleet_profile');

                                request.setRequestHeader('Content-Type', 'application/json');

                                request.onreadystatechange = function () {
                                    if (this.readyState === 4) {
                                        console.log('Status:', this.status);
                                        console.log('Headers:', this.getAllResponseHeaders());
                                        console.log('Body:', this.responseText);
                                        responsefp = this.responseText;
                                        json_responsefp = JSON.parse(responsefp);

                                        var agentname = '';

                                        if (json_responsefp.status == 100) {
                                            agentname = "Not yet assigned";
                                        }

                                        if (json_responsefp.status != 100) {
                                            agentname = json_responsefp.data.fleet_details[0].username;
                                        }

                                        var finalstatus = '';
                                        var finaldatewithtime = '';
                                        var imguploaded = '';

                                        document.getElementById("laststatusdetails").style.color = "#000000";

                                        document.getElementById("loading").style.display = 'none';
                                        document.getElementById("trackingagentname").innerHTML = agentname;
                                        document.getElementById("trackingnumberdetails").innerHTML = json_responsejd.data[0].job_id;

                                        counttaskhistory = json_responsejd.data[0].task_history["length"];

                                        var countassign = 0;
                                        var countassigned = 0;
                                        var countaccept = 0;
                                        var countfacility = 0;
                                        var counts = 0;

                                        for (let i = 0; i < counttaskhistory; i++) {

                                            var d = new Date(json_responsejd.data[0].task_history[i].creation_datetime);
                                            var ampm = '';
                                            var ampmhour = '';
                                            var ampmmin = '';

                                            function getTime() {
                                                if (d.getHours() < 12) {
                                                    ampm = 'am';
                                                    ampmhour = d.getHours();
                                                }

                                                if (d.getHours() == 12) {
                                                    ampm = 'pm';
                                                    ampmhour = d.getHours();
                                                }

                                                if (d.getHours() > 12) {
                                                    ampm = 'pm';
                                                    ampmhour = d.getHours() - 12;
                                                }

                                                if (d.getMinutes() < 10) {
                                                    ampmmin = "0" + d.getMinutes();
                                                }

                                                if (d.getMinutes() >= 10) {
                                                    ampmmin = d.getMinutes();
                                                }

                                                return (ampmhour + ":" + ampmmin + " " + ampm);
                                            }

                                            function getFullDate() {
                                                return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
                                            }

                                            function getFullDateWithDay() {
                                                if (d.getDay() == 1) {
                                                    finalday = "Monday"
                                                }

                                                if (d.getDay() == 2) {
                                                    finalday = "Tuesday"
                                                }

                                                if (d.getDay() == 3) {
                                                    finalday = "Wednesday"
                                                }

                                                if (d.getDay() == 4) {
                                                    finalday = "Thursday"
                                                }

                                                if (d.getDay() == 5) {
                                                    finalday = "Friday"
                                                }

                                                if (d.getDay() == 6) {
                                                    finalday = "Saturday"
                                                }

                                                if (d.getDay() == 0) {
                                                    finalday = "Sunday"
                                                }

                                                return finalday + ", " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                                            }

                                            function getFullDateWithDayandTime() {
                                                if (d.getDay() == 1) {
                                                    finalday = "Monday"
                                                }

                                                if (d.getDay() == 2) {
                                                    finalday = "Tuesday"
                                                }

                                                if (d.getDay() == 3) {
                                                    finalday = "Wednesday"
                                                }

                                                if (d.getDay() == 4) {
                                                    finalday = "Thursday"
                                                }

                                                if (d.getDay() == 5) {
                                                    finalday = "Friday"
                                                }

                                                if (d.getDay() == 6) {
                                                    finalday = "Saturday"
                                                }

                                                if (d.getDay() == 0) {
                                                    finalday = "Sunday"
                                                }

                                                return finalday + ", " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " at " + getTime();
                                            }

                                            function checkDate() {
                                                if (getFullDate() != finaldate) {
                                                    finaldate = getFullDate();
                                                    var para = document.createElement("Pd" + i);
                                                    para.innerHTML = "<br><b>" + getFullDateWithDay() + "</b><hr>";
                                                    document.getElementById("trackinghistorydetails").appendChild(para);
                                                }
                                            }

                                            if (json_responsejd.data[0].task_history[i].label_description.includes('Status updated from')) {

                                                if (json_responsejd.data[0].task_history[i].description.includes('to Failed')) {
                                                    checkDate()

                                                    var para = document.createElement("P" + i);
                                                    para.setAttribute("id", "faileddelivery2" + i);
                                                    para.innerHTML = getTime() + " - " + "<b>Failed</b>" + "<br><br>";
                                                    document.getElementById("trackinghistorydetails").appendChild(para);
                                                    document.getElementById("faileddelivery2" + i).style.color = "#b30000";

                                                    var para = document.createElement("P" + i + "ff");
                                                    para.innerHTML = "<b>Reason: </b>" + json_responsejd.data[0].task_history[i].reason + "<br><br>";
                                                    document.getElementById("trackinghistorydetails").appendChild(para);

                                                    finaldatewithtime = getFullDateWithDayandTime();
                                                    finalstatus = "Failed";
                                                }

                                                if (json_responsejd.data[0].task_history[i].description.includes('to Successful')) {
                                                    checkDate()

                                                    var para = document.createElement("P" + i);
                                                    para.innerHTML = getTime() + " - " + "<b>Successful</b>" + "<br><br>";
                                                    document.getElementById("trackinghistorydetails").appendChild(para);

                                                    finaldatewithtime = getFullDateWithDayandTime();
                                                    finalstatus = "Successful";
                                                }

                                                if (json_responsejd.data[0].task_history[i].description.includes('to Unassigned')) {
                                                    checkDate()

                                                    var para = document.createElement("P" + i);
                                                    para.innerHTML = getTime() + " - " + "<b>Processing</b>" + "<br><br>";
                                                    document.getElementById("trackinghistorydetails").appendChild(para);

                                                    finaldatewithtime = getFullDateWithDayandTime();
                                                    finalstatus = "Processing";
                                                }

                                                if (json_responsejd.data[0].task_history[i].description.includes('to Started')) {
                                                }
                                            }

                                            // if (json_responsejd.data[0].task_history[i].description.includes('Modified')) {

                                            // 	if (json_responsejd.data[0].job_status == 2) {
                                            // 		checkDate()

                                            // 		var para = document.createElement("P" + i);
                                            // 		para.innerHTML = getTime() + " - " + "<b>Successful</b>" + "<br><br>";
                                            // 		document.getElementById("trackinghistorydetails").appendChild(para);

                                            // 		finaldatewithtime = getFullDateWithDayandTime();
                                            // 		finalstatus = "Successful";
                                            // 	}

                                            // 	if (json_responsejd.data[0].job_status == 3) {
                                            // 		checkDate()

                                            // 		var para = document.createElement("P" + i);
                                            // 		para.setAttribute("id", "faileddelivery3" + i);
                                            // 		para.innerHTML = getTime() + " - " + "<b>Failed</b>" + "<br><br>";
                                            // 		document.getElementById("trackinghistorydetails").appendChild(para);
                                            // 		document.getElementById("faileddelivery3" + i).style.color = "#b30000";

                                            // 		var para = document.createElement("P" + i + "fff");
                                            // 		para.innerHTML = "<b>Reason: </b>" + json_responsejd.data[0].task_history[i].reason + "<br><br>";
                                            // 		document.getElementById("trackinghistorydetails").appendChild(para);

                                            // 		finaldatewithtime = getFullDateWithDayandTime();
                                            // 		finalstatus = "Failed";
                                            // 	}
                                            // }

                                            if (json_responsejd.data[0].task_history[i].description.includes('Created By')) {
                                                checkDate()

                                                var para = document.createElement("P" + i);
                                                para.innerHTML = getTime() + " - " + "<b>Processing</b>" + "<br><br>";
                                                document.getElementById("trackinghistorydetails").appendChild(para);

                                                finaldatewithtime = getFullDateWithDayandTime();
                                                finalstatus = "Processing";

                                            }

                                            if ((json_responsejd.data[0].task_history[i].description.includes('task via bulk')) && (countassign < 1) && (countassigned < 1)) {

                                                countassign = countassign + 1;
                                                countassigned = countassigned + 1;

                                            }

                                            if ((json_responsejd.data[0].task_history[i].description.includes('Assigned')) && (countassign < 1) && (countassigned < 1)) {

                                                countassign = countassign + 1;
                                                countassigned = countassigned + 1;

                                            }

                                            if (json_responsejd.data[0].task_history[i].description.includes('Accepted at')) {

                                                if (countaccept < 1) {

                                                    countaccept = countaccept + 1;
                                                    countassign = countassign + 1;
                                                    countassigned = countassigned + 1;

                                                }

                                                if (countfacility < 1) {
                                                    countfacility = countfacility + 1;
                                                }
                                            }

                                            if (json_responsejd.data[0].task_history[i].description.includes('Started at')) {
                                                checkDate()

                                                var para = document.createElement("P" + i);
                                                para.innerHTML = getTime() + " - " + "<b>Out For Delivery</b>" + "<br><br>";
                                                document.getElementById("trackinghistorydetails").appendChild(para);

                                                countfacility = 0;

                                                finaldatewithtime = getFullDateWithDayandTime();
                                                finalstatus = "Out For Delivery";
                                            }

                                            if (json_responsejd.data[0].task_history[i].description.includes('Arrived at')) {

                                                countfacility = 0;

                                                finaldatewithtime = getFullDateWithDayandTime();

                                            }

                                            if (json_responsejd.data[0].task_history[i].type.includes('signature_image_added')) {

                                                imguploaded = json_responsejd.data[0].task_history[i].description;

                                                countfacility = 0;
                                            }

                                            if (json_responsejd.data[0].task_history[i].description.includes('Successful at')) {
                                                checkDate()

                                                var para = document.createElement("P" + i);
                                                para.setAttribute("id", "successdelivery" + i);
                                                para.innerHTML = getTime() + " - " + "<b>Successful</b>" + "<br><br>";
                                                document.getElementById("trackinghistorydetails").appendChild(para);
                                                document.getElementById("successdelivery" + i).style.color = "#009933";

                                                finaldatewithtime = getFullDateWithDayandTime();
                                                finalstatus = "Successful";
                                                counts = counts + 1;
                                            }

                                            if (json_responsejd.data[0].task_history[i].description.includes('Failed at')) {
                                                checkDate()

                                                var para = document.createElement("P" + i);
                                                para.setAttribute("id", "faileddelivery" + i);
                                                para.innerHTML = getTime() + " - " + "<b>Failed</b>" + "<br><br>";
                                                document.getElementById("trackinghistorydetails").appendChild(para);
                                                document.getElementById("faileddelivery" + i).style.color = "#b30000";

                                                var para = document.createElement("P" + i + "f");
                                                para.innerHTML = "<b>Reason: </b>" + json_responsejd.data[0].task_history[i].reason + "<br><br>";
                                                document.getElementById("trackinghistorydetails").appendChild(para);

                                                finaldatewithtime = getFullDateWithDayandTime();
                                                finalstatus = "Failed";
                                            }
                                        }

                                        if ((json_responsejd.data[0].job_status == 2) && (counts == 0)) {
                                            checkDate()
                                            var para = document.createElement("P");
                                            para.setAttribute("id", "successdelivery");
                                            para.innerHTML = getTime() + " - " + "<b>Successful</b>" + "<br><br>";
                                            document.getElementById("trackinghistorydetails").appendChild(para);
                                            document.getElementById("successdelivery").style.color = "#009933";
                                            counts = 1;
                                            finaldatewithtime = getFullDateWithDayandTime();
                                            finalstatus = "Successful";
                                        }

                                        if (counts == 1) {
                                            document.getElementById("laststatusdetails").style.color = "#009933";
                                            document.getElementById("addressdetails").innerHTML = json_responsejd.data[0].job_address;
                                            document.getElementById("consigneedetails").innerHTML = json_responsejd.data[0].customer_username;
                                            var img = document.createElement('img');
                                            img.setAttribute("id", "imguploadedsign");
                                            img.src = imguploaded;
                                            document.getElementById('imguploadedp').appendChild(img);

                                            document.getElementById("successfuldeliveryarea").style.display = 'block';
                                        }

                                        if (finalstatus == "Failed Delivery") {
                                            document.getElementById("laststatusdetails").style.color = "#b30000";
                                        }

                                        document.getElementById("laststatusdetails").innerHTML = finalstatus;
                                        document.getElementById("lastdaydatetimedetails").innerHTML = finaldatewithtime;
                                        document.getElementById("trackingresultbox").style.display = 'block';
                                        document.getElementById("trackingresultbox2").style.display = 'block';

                                        document.getElementById("trackagain").style.display = 'block';
                                    }
                                };

                                var body = {
                                    'api_key': '51676580f24b091114132d38111925401ee4c2f328d978375e1f03',
                                    'fleet_id': [json_responsejd.data[0].fleet_id],
                                };

                                request.send(JSON.stringify(body));
                            }
                        }
                    };

                    var body = {
                        'api_key': '51676580f24b091114132d38111925401ee4c2f328d978375e1f03',
                        'order_ids': [json_responsejd.data[0].job_id],
                        'include_task_history': 1
                    };

                    request.send(JSON.stringify(body));
                }

                if (json_responsejd.status == 404) {
                    document.getElementById("loading").style.display = 'none';
                    document.getElementById("wronginput").style.display = 'block';
                    document.getElementById("trackingnumberarea").style.display = 'block';
                }
            }
        };

        var body = {
            'api_key': '51676580f24b091114132d38111925401ee4c2f328d978375e1f03',
            'job_ids': [jobidentitynum],
            'include_task_history': 1
        };

        request.send(JSON.stringify(body));
    }
});
