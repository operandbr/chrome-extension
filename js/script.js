(function(window, document) {

    window.onload = function() {
        refresh();
    };

    setInterval(function() {
        refresh();
    }, 10000);

    var linkUrl = 'http://sol:8030/';
    var refresh = function() {
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
        chrome.browserAction.setBadgeBackgroundColor({
            color: "#FF0000"
        });
        verifyStorage(json);
    };

    var verifyStorage = function(json) {
        var arrData = [];
        for (var i = 0; i < json.length; i++) {
            arrData.push(json[i].Tasks.iTask);
        }

        chrome.storage.local.get('Tasks', function(arrTask) {
            if (arrTask.Tasks !== undefined && arrTask.Tasks.length > 0) {
                for (var i = 0; i < arrData.length; i++) {
                    if (arrTask.Tasks.indexOf(arrData[i]) === -1) {
                        var body = json[i].Tasks.sTask;
                        var description = 'Job: ' + json[i].ViewCmpRelatedDocuments.sDocumentNumber + ' ' + json[i].ViewCmpRelatedDocuments.sDocument;

                        notifyMe('Nova Tarefa', body + '\n' + description, 'task_' + arrData[i], linkUrl + json[i].Tasks.sDoc + '/' + json[i].Tasks.iDoc);
                        delete arrTask[arrTask.Tasks.indexOf(arrData[i])];
                    }
                }
            }
        });
        addOnStorage(arrData);
    };

    var addOnStorage = function(data) {
        chrome.storage.local.set({
            'Tasks': data
        });
    };

    var notifyMe = function(sTitle, sBody, sTag, sUrl) {
        if ("Notification" in window) {
            if (Notification.permission === "granted") {
                var notification = new Notification(sTitle, {
                    icon: 'img/favicon-96.png',
                    body: sBody,
                    tag: sTag
                });
                if (sUrl !== undefined) {
                    notification.onclick = function() {
                        event.preventDefault();
                        window.open(sUrl, '_blank');
                        notification.close();
                    }
                }

            }
        }
    }

})(window, document);