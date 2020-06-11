const messageArea = $("#chatroom-message-area");
const sendChatButton = $("#chatroom-send-button");
const exitChatButton = $("#chatroom-exit-button");
const inputField = $("#chatroom-type-input");
const screen = $("chatroom-container");

// FIXME: shift+click does not blit a newline onscreen
const appendMessage = (message) => {
  message.replace(/[\r\n]+/g, "<br>");
  let identifier = "<strong>You: </strong>";
  messageArea
    .append("<p>" + identifier + message + "</p>")
    .children(":last")
    .hide()
    .fadeIn(150);
  messageArea.animate({ scrollTop: messageArea.prop("scrollHeight") });
  console.log(messageArea.scrollTop);
  console.log(messageArea.clientHeight);
};

$(document).ready(() => {
  // TODO: make the web sockets work using the group names
  // TODO: redirect brand button to exit
  // connect to websocket
  var socket = new WebSocket("ws://" + window.location.host + "/ws/chat/");
  console.log("successfully connected to " + socket.url);

  // detect when a message is sent through to the socket
  // the user must be detected and must show which is the current user
  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    appendMessage(data.message);
  };

  // detect when the user clicks enter or escape
  screen.keydown((e) => {
    if (e.key == "Enter") {
      if (e.shiftKey) {
      } else {
        e.preventDefault();
        sendChatButton.click();
      }
    } else if (e.key == "Escape") {
      exitChatButton.click();
    }
  });

  sendChatButton.click(() => {
    console.log("send clicked");
    socket.send(
      JSON.stringify({
        message: inputField.val(),
      })
    );
    inputField.val("");
  });

  //TODO: redirect esc to exit
  exitChatButton.click(() => {
    console.log("exit clicked");
    let exit = window.confirm("Are you sure you want to exit the chat?");
    if (exit) {
      console.log("yo");
      console.log(self.location.protocol + "//" + self.location.host);
      window.location.replace(
        self.location.protocol + "//" + self.location.host
      );
    }
  });
});
