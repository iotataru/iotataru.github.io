"use strict";
// The initialize function must be run each time a new page is loaded
window.Office.initialize = function (reason) {
    debugger;
    console.log("window.Office.initialize called");
    RegisterMessageChild();
}

function mockSubmitCredentials() {
  var token = "SecretToken";
  Office.context.ui.messageParent(token);
}

//*********************message parent
function messageParent() {
  var value = document.getElementById("MessageForParent").value;
    if (!value) {
        value = "Message For Parent";
    }

    Office.context.ui.messageParent(value);
}

function showNotification(text) {
    if (text === "action:deleteUser") document.getElementById('actionResult').innerText += "-User Deleted-";
    else document.getElementById('actionResult').innerText += text;
}

function addMessageStatus(arg) {
    showNotification(arg.message);
}

function RegisterMessageChild() {
  Office.context.ui.addHandlerAsync(Office.EventType.DialogParentMessageReceived, addMessageStatus, onRegisterMessageComplete);
}

function onRegisterMessageComplete(asyncResult) {
  document.getElementById('actionResult').innerText += asyncResult.status;
  if(asyncResult.status != Office.AsyncResultStatus.Succeeded) {
    document.getElementById('actionResult').innerText += asyncResult.error.message;
  }
}

function redirect() {
    var value = document.getElementById("RedirectWebsite").value;
    if (!value) {
        console.log("Error: need a website in the textbox.");
        return;
    }
    window.location.href = value;
}