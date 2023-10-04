const socket = io();

const myFace = document.querySelector("#myFace");
const muteBtn = document.querySelector("#mute");
const muteIcon = muteBtn.querySelector(".muteIcon");
const unMuteIcon = muteBtn.querySelector(".unMuteIcon");
const cameraBtn = document.querySelector("#camera");
const cameraIcon = cameraBtn.querySelector(".cameraIcon");
const unCameraIcon = cameraBtn.querySelector(".unCameraIcon");
const camerasSelect = document.querySelector("#cameras");
const shareScreenBtn = document.querySelector("#shareScreen");
const screenIcon = shareScreenBtn.querySelector(".screenIcon");
const unScreenIcon = shareScreenBtn.querySelector(".unscreenIcon");
const call = document.querySelector("#call");
const welcome = document.querySelector("#welcome");
const fileInput = document.querySelector("#fileInput");

const HIDDEN_CN = "hidden";

let myStream;
let muted = true;
unMuteIcon.classList.add(HIDDEN_CN);
let cameraOff = false;
unCameraIcon.classList.add(HIDDEN_CN);
let roomName = "";
let nickname = "";
let peopleInRoom = 1;

let PCObject = {
  // remoteSocketId: pc   <- 형식 예시
};

async function getCameras() { // 사용 가능한 카메라 장치 가져오기
  try {
    // 브라우저에서 접근 가능한 모든 미디어 입력 장치
    // (오디오 입력 장치, 비디오 입력 장치 등)에 대한 정보를 Promise 형태로 반환
    // 이 Promise가 완료되면, 각 디바이스의 정보를 담은 MediaDeviceInfo 객체들의 배열이 반환
    const devices = await navigator.mediaDevices.enumerateDevices();
    // 비디오 입력 장치만 필터링
    const cameras = devices.filter((device) => device.kind === "videoinput");
    // 현재 사용 중인 카메라 정보 가져오기
    const currentCamera = myStream.getVideoTracks();
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;

      if (currentCamera.label == camera.label) {
        option.selected = true;
      }

      camerasSelect.appendChild(option);
    });
  } catch (error) {
    console.log(error);
    myStream = new MediaStream();
  }
}

async function getMedia(deviceId) { // 주어진 deviceId에 해당하는 미디어(카메라와 오디오) 가져오기
  // 초기 미디어 요구사항
  const initialConstraints = {
    audio: true,
    video: { facingMode: "user" },
  };
  // 특정 카메라 요구사항
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };

  try {
    // 웹 애플리케이션에 사용자의 오디오와 비디오를 캡처할 수 있는 권한을 요청
    // => 사용자의 미디어 스트림 가져오기
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstraints
    );

    // 실질적으로 사용자의 카메라 영상을 화면에 표시하는 역할
    // srcObject 프로퍼티는 미디어 소스(MediaStream 객체)를 
    // HTML < audio > 나 < video > 요소에 연결할 때 사용
    myFace.srcObject = myStream;
    myFace.classList.add('rotateY');
    // HTML video element를 mute
    // 테스트 위해 잠시 음소거 함
    myFace.muted = true;

    // 미디어 스트림의 오디오 트랙 자체를 비활성
    if (!deviceId) {
      // mute default
      myStream //
        .getAudioTracks()
        .forEach((track) => (track.enabled = false));

      await getCameras();
    }
  } catch (error) {
    console.log(error);
  }
}

function handleMuteClick() { // 오디오 mute
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (muted) {
    unMuteIcon.classList.remove(HIDDEN_CN);
    muteIcon.classList.add(HIDDEN_CN);
    muted = false;
  } else {
    muteIcon.classList.remove(HIDDEN_CN);
    unMuteIcon.classList.add(HIDDEN_CN);
    muted = true;
  }
}

function handleCameraClick() { // 비디오
  myStream //
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraIcon.classList.remove(HIDDEN_CN);
    unCameraIcon.classList.add(HIDDEN_CN);
    cameraOff = false;
  } else {
    unCameraIcon.classList.remove(HIDDEN_CN);
    cameraIcon.classList.add(HIDDEN_CN);
    cameraOff = true;
  }
}

async function handleCameraChange() { // 카메라 변경 시 새로운 카메라로 재호출
  try {
    await getMedia(camerasSelect.value);
    if (peerConnectionObjArr.length > 0) {
      const newVideoTrack = myStream.getVideoTracks()[0];
      peerConnectionObjArr.forEach((peerConnectionObj) => {
        const peerConnection = peerConnectionObj.connection;
        const peerVideoSender = peerConnection
          // sender : RTCPeerConnection 인터페이스의 메소드
          //         특정 미디어 트랙의 데이터를 다른 피어(Peer)에게 전송하는 역할
          .getSenders()
          .find((sender) => sender.track.kind == "video");
        peerVideoSender.replaceTrack(newVideoTrack);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);

// @Screen Sharing

// 처음에는 화면 공유가 되지 않은 상태이므로 "화면 공유 취소" 아이콘을 숨깁니다.
unScreenIcon.classList.add(HIDDEN_CN);

let isSharing = false;

async function handleShareClick() { // 화면 공유 시작/종료
  if (!isSharing) {
    await startCapture();
    isSharing = true;
    screenIcon.classList.add(HIDDEN_CN);
    unScreenIcon.classList.remove(HIDDEN_CN);

    if (cameraOff) {
      handleCameraClick();
    }
  } else {
    stopCapture();
    isSharing = false;
    unScreenIcon.classList.add(HIDDEN_CN);
    screenIcon.classList.remove(HIDDEN_CN);

    if (cameraOff) {
      handleCameraClick();
    }
  }
}

shareScreenBtn.addEventListener("click", handleShareClick);

let captureStream = null;

async function addStreamToPeers() { // 스트림 추가
  const newVideoTrack = captureStream.getVideoTracks()[0];
  Object.values(PCObject).forEach((peerConnection) => {
    const peerVideoSender = peerConnection.getSenders().find(
      (sender) => sender.track.kind === "video"
    );
    peerVideoSender.replaceTrack(newVideoTrack);
  });
}

async function startCapture() { // 화면 공유 시작
  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });

    const screenVideo = document.querySelector("#myFace");
    screenVideo.srcObject = captureStream;

    screenVideo.onloadedmetadata = () => { // 스트림 로드 완료 시점에서 클래스 변경
      screenVideo.classList.remove('rotateY');
      socket.emit('screen-sharing', true, roomName);
      console.log('[Client] Sent screen sharing start event to server');
    };
    await addStreamToPeers();
  } catch (error) {
    console.error(error);
  }
}

async function stopCapture() { // 화면 공유 중지
  captureStream.getTracks().forEach((track) => track.stop());
  captureStream = null;

  // 원래의 카메라 비디오로 전환
  await getMedia();
  const myFaceVideo = document.querySelector("#myFace");

  myFaceVideo.onloadedmetadata = () => { // 스트림 로드 완료 시점에서 클래스 변경
    myFaceVideo.classList.add('rotateY');
    socket.emit('screen-sharing', false, roomName);
    console.log('[Client] Sent screen sharing stop event to server');
  };

  // 화면 공유 종료 후 새로운 미디어 스트림(카메라 비디오)을 PeerConnection에 추가
  const newVideoTrack = myStream.getVideoTracks()[0];
  Object.values(PCObject).forEach((peerConnection) => {
    const peerVideoSender = peerConnection.getSenders().find(
      (sender) => sender.track.kind === "video"
    );
    peerVideoSender.replaceTrack(newVideoTrack);
  });
}

// @Welcome Form (choose room)
async function initCall() { // 호출 초기화 및 사용자 미디어 스트림 가져오기
  await getMedia();
}

const nicknameContainer = document.querySelector("#userNickname");
nicknameContainer.innerText = callUserName;  // 서버에서 받아온 userName 사용

socket.emit("join_room", callRoomName, callUserName);  // 서버에서 받아온 roomName과 userName 사용

// @Chat Form

const chatForm = document.querySelector("#chatForm");
const chatBox = document.querySelector("#chatBox");

const MYCHAT_CN = "myChat";
const NOTICE_CN = "noticeChat";

chatForm.addEventListener("submit", handleChatSubmit);

const chatInput = chatForm.querySelector("input");

fileInput.addEventListener("change", function () {
  if (this.files && this.files.length > 0) {
    chatInput.value = this.files[0].name;
  }
});

function handleChatSubmit(event) { // 채팅 메세지 제출
  event.preventDefault();
  const chatInput = chatForm.querySelector("input");
  const message = chatInput.value;
  // home.pug에서 받아온 roomName과 userName 사용
  roomName = callRoomName;
  nickname = callUserName;

  if (fileInput.files.length > 0) { // 파일 첨부가 있는 경우
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onloadend = (event) => {
      const arrayBuffer = event.target.result;
      console.log("Sending file:", file.name)

      const blobUrl = URL.createObjectURL(file);

      socket.emit("chat_file", arrayBuffer, `${nickname}: <a href="${blobUrl}" download="${file.name}">${file.name}</a>`, roomName);

      writeChat(`<a href="${blobUrl}" download="${file.name}">${file.name}</a>`, MYCHAT_CN);
    };
    reader.readAsArrayBuffer(file);

    fileInput.value = "";
  } else { // 파일 첨부가 없는 경우 (일반 메세지)
    console.log(`Sending chat to room: ${roomName}`);
    socket.emit("chat", ` ${nickname}:${message}`, roomName);
    writeChat(`${message}`, MYCHAT_CN);
  }

  chatInput.value = "";
}

function writeChat(message, className = "a") { // 채팅 메세지를 화면에 표시
  const li = document.createElement("li");
  const span = document.createElement("span");
  console.log('className:', className);
  if (className) {
    span.classList.add(className);
    li.classList.add(className + 'Container');
  }

  console.log('Message:', message);

  const isFileMessageRegex = /<a href="(.*)" download="(.*)">(.*)<\/a>/;

  if (isFileMessageRegex.test(message)) {
    span.innerHTML = message;
  } else {
    span.textContent = message;
  }

  li.appendChild(span);
  chatBox.append(li);
}

// @Leave Room

const leaveBtn = document.querySelector("#leave");

function leaveRoom() { // 소켓 연결을 끊고 UI를 초기 상태로 되돌린 후 방에서 나가기
  socket.disconnect();

  call.classList.add(HIDDEN_CN);

  peerConnectionObjArr = [];
  peopleInRoom = 1;
  nickname = "";

  myStream.getTracks().forEach((track) => track.stop());
  const nicknameContainer = document.querySelector("#userNickname");
  nicknameContainer.innerText = "";

  myFace.srcObject = null;
  clearAllVideos();
  clearAllChat();

  window.close();
}

function removeVideo(leavedSocketId) { // 지정된 id의 비디오 요소를 화면에서 제거
  const streams = document.querySelector("#streams");
  const streamArr = streams.querySelectorAll("div");
  streamArr.forEach((streamElement) => {
    if (streamElement.id === leavedSocketId) {
      streams.removeChild(streamElement);
    }
  });
}

function clearAllVideos() { // 모든 비디오를 화면에서 제거
  const streams = document.querySelector("#streams");
  const streamArr = streams.querySelectorAll("div");
  streamArr.forEach((streamElement) => {
    if (streamElement.id != "myStream") {
      streams.removeChild(streamElement);
    }
  });
}

function clearAllChat() { // 모든 채팅을 화면에서 제거
  const chatArr = chatBox.querySelectorAll("li");
  chatArr.forEach((chat) => chatBox.removeChild(chat));
}

leaveBtn.addEventListener("click", leaveRoom);

// @Modal code

const modal = document.querySelector(".modal");
const modalText = modal.querySelector(".modal__text");
const modalBtn = modal.querySelector(".modal__btn");

function paintModal(text) {
  modalText.innerText = text;
  modal.classList.remove(HIDDEN_CN);

  modal.addEventListener("click", removeModal);
  modalBtn.addEventListener("click", removeModal);
  document.addEventListener("keydown", handleKeydown);
}

function removeModal() {
  modal.classList.add(HIDDEN_CN);
  modalText.innerText = "";
}

function handleKeydown(event) {
  if (event.code === "나가기" || event.code === "전송") {
    removeModal();
  }
}

// @Socket code

socket.on("reject_join", () => {
  // Paint modal
  paintModal("❗ 회의는 최대 5인까지 가능합니다 ❗");

  // Erase names
  const nicknameContainer = document.querySelector("#userNickname");
  nicknameContainer.innerText = "";
  roomName = "";
  nickname = "";
});

socket.on("accept_join", async (userObjArr) => {
  await initCall();
  const length = userObjArr.length;
  if (length === 1) {
    return;
  }
  for (let i = 0; i < length - 1; ++i) {
    try {
      const newPC = createConnection(
        userObjArr[i].socketId,
        userObjArr[i].nickname
      );
      const offer = await newPC.createOffer();
      await newPC.setLocalDescription(offer);
      console.log("Sending offer to:", userObjArr[i].nickname);
      socket.emit("offer", offer, userObjArr[i].socketId, userObjArr[i].nickname);
      writeChat(`${userObjArr[i].nickname} 님이 입장하였습니다`, NOTICE_CN);
    } catch (err) {
      console.error(err);
    }
  }
});

// 다른 유저가 방에 들어올 때마다 호출
socket.on("offer", async (offer, remoteSocketId, remoteNickname) => {
  try {
    const newPC = createConnection(remoteSocketId, remoteNickname);
    await newPC.setRemoteDescription(offer);
    const answer = await newPC.createAnswer();
    await newPC.setLocalDescription(answer);
    socket.emit("answer", answer, remoteSocketId);
    writeChat(`${remoteNickname} 님이 입장하였습니다`, NOTICE_CN);
  } catch (err) {
    console.error(err);
  }
});

socket.on("answer", async (answer, remoteSocketId) => {
  await PCObject[remoteSocketId].setRemoteDescription(answer);
});

socket.on("ice", async (ice, remoteSocketId) => {
  await PCObject[remoteSocketId].addIceCandidate(ice);
});

socket.on('screen-sharing', (isSharing) => {
  if (isSharing) {
    myFace.classList.remove('rotateY');
  } else {
    myFace.classList.add('rotateY');
  }
});

socket.on("chat", (message) => {
  writeChat(message);
});

socket.on("chat_file", (arrayBuffer, message) => {
  writeChat(message);
});

socket.on('updateMemberList', (members) => {

  const memberBox = document.querySelector("#memberBox");
  const memberCount = document.querySelector("#memberCount");

  memberBox.innerHTML = "";
  memberCount.innerText = members.length;
  // 각 멤버를 목록에 추가
  members.forEach(member => {
    let li = document.createElement("li");
    li.textContent = member;
    memberBox.appendChild(li);
  });

});

socket.on("leave_room", (leavedSocketId, nickname) => {
  removeVideo(leavedSocketId);
  writeChat(`${nickname} 님이 퇴장하였습니다`, NOTICE_CN);
  --peopleInRoom;
  sortStreams();
});

// @RTC code

function handleIce(event, remoteSocketId) { // ICE 후보가 생성될 때 해당 후보 정보 전송
  if (event.candidate) {
    socket.emit("ice", event.candidate, remoteSocketId);
  }
}

function handleAddStream(event, remoteSocketId, remoteNickname) { // 원격 스트림 추가 시 요소 생성 후 화면 출력
  const peerStream = event.stream;
  paintPeerFace(peerStream, remoteSocketId, remoteNickname);
}

function createConnection(remoteSocketId, remoteNickname) { // WebRTC 연결 생성
  // STUN 서버 정보와 함께 PeerConextion 객체 생성
  const myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
        ],
      },
    ],
  });
  myPeerConnection.addEventListener("icecandidate", (event) => {
    handleIce(event, remoteSocketId);
  });
  myPeerConnection.addEventListener("addstream", (event) => {
    handleAddStream(event, remoteSocketId, remoteNickname);
  });
  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));

  PCObject[remoteSocketId] = myPeerConnection;

  ++peopleInRoom;

  sortStreams();
  return myPeerConnection;
}

// 원격 사용자의 비디오, 닉네임 정보를 받아 DOM에 생성
function paintPeerFace(peerStream, id, remoteNickname) {
  const streams = document.querySelector("#streams");
  const div = document.createElement("div");
  div.id = id;
  const video = document.createElement("video");
  video.classList.add('rotateY');
  video.autoplay = true;
  video.playsInline = true;
  video.width = "400";
  video.height = "400";
  video.srcObject = peerStream;

  const nicknameContainer = document.createElement("h3");
  nicknameContainer.id = "userNickname";
  nicknameContainer.innerText = remoteNickname;

  div.appendChild(video);
  div.appendChild(nicknameContainer);
  streams.appendChild(div);
  sortStreams();
}

function sortStreams() { // 현재 방에 있는 사람 수에 따라 클래스 이름 변경하고 그리드 레이아웃 조절
  const streams = document.querySelector("#streams");
  const streamArr = streams.querySelectorAll("div");
  streamArr.forEach((stream) => (stream.className = `people${peopleInRoom}`));
}