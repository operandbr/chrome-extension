(function(window, document) {

    window.onload = function() {
        refresh();
        notification();
    };

    setInterval(function() {
        refresh();
    }, 5000);

    var refresh = function() {
        var linkUrl = 'http://192.168.100.253:8030/';
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                updateCount(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open("GET", linkUrl + "componentes/header/getTasks", true);
        xhttp.send();
    };

    var updateCount = function(json) {
        chrome.browserAction.setBadgeText({
            text: json.length.toString()
        });
    };

    var notification = function() {
        var notif = webkitNotifications.createNotification(
            'favicon-64.png', // icon url - can be relative
            'Hello!', // notification title
            'Lorem ipsum...' // notification body text
        );
        notif.show();
    };

})(window, document);