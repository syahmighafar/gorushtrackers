document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("trackbutton").addEventListener("click", tracknumber);

    function tracknumber() {

        var jobidentitynum = '';
        jobidentitynum = document.getElementById("jobid").value.trim();

        var request = new XMLHttpRequest();

        request.open('POST', 'https://app.detrack.com/api/v2/dn/jobs/search');

        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('X-API-KEY', 'd4dfab3975765c8ffa920d9a0c6bda0c12d17a35a946d337');

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);

                responsejd = this.responseText;
                json_responsejd = JSON.parse(responsejd);

                window.open(json_responsejd.data[0].tracking_link)
            }
        };

        var body = {
            'data': {
                'do_number': jobidentitynum
            }
        };

        request.send(JSON.stringify(body));
    }
});
