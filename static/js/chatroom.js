const messageArea = $("#chatroom-message-area");
const sendChatButton = $("#chatroom-send-button");
const exitChatButton = $("#chatroom-exit-button");
const inputField = $("#chatroom-type-input");
const screen = $("body");

// TODO
// blit the message on the screen
const appendMessage = (message) => {
  messageArea.append("<p>" + message + "</p>");
};

$(document).ready(() => {
  // TODO: make the web sockets work using the group names
  // TODO: make the brand button clickable which shows an alert if they wanted to leave
  // connect to websocket
  var socket = new WebSocket("ws://" + window.location.host + "/ws/chat/");
  console.log("successfully connected to " + socket.url);

  // detect when a message is sent through to the socket
  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    appendMessage(data.message);
  };

  // detect when the user clicks enter or escape
  screen.keyup((e) => {
    if (e.key == "Enter") {
      sendChatButton.click();
    } else if (e.key == "Escape") {
      exitChatButton.click();
    }
  });

  //TODO
  sendChatButton.click(() => {
    console.log("send clicked");
    socket.send(
      JSON.stringify({
        message: inputField.val(),
      })
    );
    inputField.val("");
  });

  //TODO
  exitChatButton.click(() => {
    console.log("exit clicked");
    // window.location.href = "../";
  });
});
