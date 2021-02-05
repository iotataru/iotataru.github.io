"use strict";
// The initialize function must be run each time a new page is loaded
var _dialog;
var _childPageUrl = "https://iotataru.github.io/DialogApi/ChildPage.html";

function getCurentSource() {
  var source;
  if (!document.querySelector('[title="Office Add-in TwoWayMessageDialogTest"]')) {
    source = window.location.hostname;
  } else {
    source = document.querySelector('[title="Office Add-in TwoWayMessageDialogTest"]').src;
  }
  document.getElementById('currentSource').innerText = "SOURCE: " + source;
}

function showNotification(text) {
    document.getElementById('actionResult').innerText += text;
}

function launchDialogCallback(arg) {
    if (arg.status === "failed") {
        showNotification("launch dialog failed");
    }
    else {
        _dialog = arg.value;
        _dialog.addEventHandler(Microsoft.Office.WebExtension.EventType.DialogMessageReceived, addMessageStatus);
        _dialog.addEventHandler(Microsoft.Office.WebExtension.EventType.DialogEventReceived, addCloseStatus);
  setTimeout(messageChildInitial, 2000);
    }
}

function addMessageStatus(arg) {
    showNotification(arg.message);
}

function addCloseStatus(arg) {
    showNotification("dialog closed");
}

function launchInlineDialog() {
    var dialogUrl = !!(document.getElementById("InlineLaunch").value) ? document.getElementById("InlineLaunch").value : _childPageUrl;
    Office.context.ui.displayDialogAsync(dialogUrl,
  {height:80, width:50, hideTitle: false, promptBeforeOpen:false, enforceAppDomain: true, displayInIframe:true},
  launchDialogCallback);
}

function launchWindowDialog() {
    var dialogUrl = !!(document.getElementById("WindowLaunch").value) ? document.getElementById("WindowLaunch").value : _childPageUrl;
    Office.context.ui.displayDialogAsync(dialogUrl,
  {height:80, width:50, hideTitle: false, promptBeforeOpen:false, enforceAppDomain: true},
  launchDialogCallback);
}

function launchInlineDialogFromRibbon(args) {
    Office.context.ui.displayDialogAsync(_childPageUrl, { height: 50, width: 30, promptBeforeOpen:false, displayInIframe: true }, launchDialogCallback);

    args.completed();
}

function launchWindowDialogFromRibbon(args) {
    Office.context.ui.displayDialogAsync(_childPageUrl, { height: 50, width: 30, promptBeforeOpen:false, displayInIframe: false }, launchDialogCallback);

    args.completed();
}

function messageChildInitial() {
    messageChild("Initial message for child upon parent's launchDialogCallback");
}

function messageChild() {
    messageChild("");
}

function messageChild(message) {
    var value = document.getElementById("MessageForChild").value;
    if (!value) {
  value = message;
  if (!value) {
      value = "Message For Child";
  }
    }

    _dialog.messageChild(value);
}

function closeDialog() {
    _dialog.close();
}

function redirect() {
    var value = document.getElementById("RedirectWebsite").value;
    if (!value) {
        console.log("Error: need a website in the textbox.");
        return;
    }
    window.location.href = value;
}
