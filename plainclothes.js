var elm_plainclothes_style;

function activate() {
    if (elm_plainclothes_style) { return; }
    chrome.extension.sendRequest({id: "get-css"}, function(response) {
      elm_plainclothes_style = document.createElement("style");
      elm_plainclothes_style.innerText = response.response;
      document.documentElement.insertBefore(elm_plainclothes_style, null);
	});
}

function deactivate() {
    if (!elm_plainclothes_style) { return; }
    elm_plainclothes_style.parentNode.removeChild(elm_plainclothes_style);
    elm_plainclothes_style = null;
}

function refresh() {
    deactivate();
    chrome.extension.sendRequest({id: "is-active", url: location.href}, function(response) {
	    if (response.response) {
		activate();
	    }
	});
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request == "activate") {
	    activate();
	} else if (request == "deactivate") {
	    deactivate();
	} else if (request == "refresh") {
	    refresh();
	}
    });

chrome.extension.sendRequest({id: "is-active", url: location.href}, function(response) {
	if (response.response) {
	    activate();
	}
    });

