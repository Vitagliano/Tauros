// const blobCursor = (() => {
//   const CURSOR = document.querySelector("#cursorBlob");
//   const LINKS = document.querySelectorAll("a");
//   // const TITLE = document.querySelectorAll('.botname');
//   const BTN = document.querySelectorAll("button");
//   const setCursorPos = e => {
//     const { pageX: posX, pageY: posY } = e;
//     CURSOR.style.top = `${posY - CURSOR.offsetHeight / 2}px`;
//     CURSOR.style.left = `${posX - CURSOR.offsetWidth / 2}px`;
//   };
//   document.addEventListener("mousemove", setCursorPos);

//   const setCursorHover = () => (CURSOR.style.transform = "scale(1.5)");
//   const removeCursorHover = () => (CURSOR.style.transform = "");
//   LINKS.forEach(link => link.addEventListener("mouseover", setCursorHover));
//   LINKS.forEach(link => link.addEventListener("mouseleave", removeCursorHover));
//   // TITLE.forEach(link => link.addEventListener('mouseover', setCursorHover));
//   // TITLE.forEach(link => link.addEventListener('mouseleave', removeCursorHover));
//   BTN.forEach(link => link.addEventListener("mouseover", setCursorHover));
//   BTN.forEach(link => link.addEventListener("mouseleave", removeCursorHover));
// })();

const icons = document.querySelectorAll(".icon");
icons.forEach(icon => {
  icon.addEventListener("click", event => {
    icon.classList.toggle("open");
  });
});

$("#select-channel-btn").on("click", function (e) {
  console.log("sent");
  const selected = $("select#select-channel").children("option:selected");
  console.log("selected vale:", selected, selected.val());
  const element = document.createElement("div");
  element.id = "selected-channel";
  element.setAttribute("data-channel-id", selected.value);
  document.getElementById("selected-channel-list").appendChild(element);
});

$("#save").on("submit", function(e) { // n usa var pelo amor de deus precisa ser var
  function getCommandChannels() {
    const channelList = document.getElementById("selected-channel-list");
    const children = channelList.childNodes;
    const channels = [];
    for (var i = 0; i < children.length; i++) {
      const node = children[i];
      if ((node.nodeType == Node.TEXT_NODE) || node.getAttribute("data-created"))
        continue;

      var id = node.getAttribute("data-channel-id");
      if (!id) {
        console.warn("Channel id not found")
        continue;
      }
      channels.push(id);
    }

    return channels;
  }

  e.preventDefault();

  $.ajax({
    type: "POST",
    url: window.location.toString(),
    data: {
      prefix: $("#prefix").val(),
      config: {
        deleteMessage: $("#delete-message-after-command").is(":checked"),
        cmdChannels: getCommandChannels()
      }
    },
    success: function(data) {
      if (data.status === "ok") {
        // window.location.reload();
      }
    },
    error: function(xhr, status, error) {
      console.log("Deu errado =(");
      console.log("XHR:", xhr);
      console.log("Status: " + status, error);
    }
  });
});