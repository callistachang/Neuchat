messageArea = $("#message-area");
sendChatButton = $("#chatroom-send-button");
exitChatButton = $("#chatroom-exit-button");
screen = $("body");

$(document).ready(() => {
  var socket = new WebSocket("ws://" + window.location.host + "/ws/chat/");
  console.log("Successfully connected to " + socket.url);

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    print(data);
  };

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
  });

  //TODO
  exitChatButton.click(() => {
    console.log("exit clicked");
  });
});
