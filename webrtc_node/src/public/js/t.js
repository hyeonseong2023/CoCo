const socket = io();

const myFace = document.querySelector("#myFace");
const muteBtn = document .querySelector("#mute");
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

let pcObj = {
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

            if (currentCamera && currentCamera.label == camera.label) {
                option.selected = true;
            }

            camerasSelect.appendChild(option);
        });
    } catch (error) {
        console.log("No cameras available:", error);
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
        // myFace.muted = true;

        // 미디어 스트림의 오디오 트랙 자체를 비활성
        if (!deviceId) {
            // mute default
            try {
                myStream.getAudioTracks().forEach((track) => (track.enabled = false));
            } catch (error) {
                console.log("No microphone available:", error);
            }

            await getCameras();
        }
    } catch (error) {
        // If the user does not have a camera or microphone, create an empty stream.
        console.log("Creating empty media stream due to error:", error);
        myStream = new MediaStream();
        if (!deviceId && !myFace.srcObject) {
            // Add a black screen to the stream if no camera is available.
            const canvasElem = document.createElement('canvas');
            canvasElem.width = 640;
            canvasElem.height = 480;
            const ctx = canvasElem.getContext('2d');
            ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);
            const blackScreenTrack = canvasElem.captureStream().getVideoTracks()[0];
            myStream.addTrack(blackScreenTrack);
            myFace.srcObject = myStream;
        }
    }
}

function handleMuteClick() { // 오디오 mute
    const audioTracks = myStream.getAudioTracks();
    if (audioTracks.length > 0) {
        audioTracks.forEach((track) => (track.enabled = !track.enabled));
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
}

function handleCameraClick() { // 비디오
    const videoTracks = myStream.getVideoTracks();
    if (videoTracks.length > 0) {
        videoTracks.forEach((track) => (track.enabled = !track.enabled));
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
}

async function handleCameraChange() { // 카메라 변경 시 새로운 카메라로 재호출
    try {
        await getMedia(camerasSelect.value);
        if (myStream.getVideoTracks().length > 0 && peerConnectionObjArr.length > 0) {
            const newVideoTrack = myStream.getVideoTracks()[0];
            peerConnectionObjArr.forEach((peerConnectionObj) => {
                const peerConnection = peerConnectionObj.connection;
                const peerVideoSender = peerConnection
                    // sender : RTCPeerConnection 인터페이스의 메소드
                    //         특정 미디어 트랙의 데이터를 다른 피어(Peer)에게 전송하는 역할
                    .getSenders()
                    .find((sender) => sender.track.kind == "video");
                if (peerVideoSender) {
                    peerVideoSender.replaceTrack(newVideoTrack);
                }
            });
        }
    } catch (error) {
        console.log("No camera available for change:", error);
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
    Object.values(pcObj).forEach((peerConnection) => {
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
        };
        if (myStream) {
            await addStreamToPeers();
        }
    } catch (error) {
        console.error(error);
    }
}

async function stopCapture() { // 화면 공유 중지
    captureStream.getTracks().forEach((track) => track.stop());
    captureStream = null;

    // 원래의 카메라 비디오로 전환
    if (myStream) {
        await getMedia();
        const myFaceVideo = document.querySelector("#myFace");
        myFaceVideo.onloadedmetadata = () => { // 스트림 로드 완료 시점에서 클래스 변경
            myFaceVideo.classList.add('rotateY');
        };

        // 화면 공유 종료 후 새로운 미디어 스트림(카메라 비디오)을 PeerConnection에 추가
        const newVideoTrack = myStream.getVideoTracks()[0];
        Object.values(pcObj).forEach((peerConnection) => {
            const peerVideoSender = peerConnection.getSenders().find(
                (sender) => sender.track.kind === "video"
            );
            peerVideoSender.replaceTrack(newVideoTrack);
        });
    }
}

// @Welcome Form (choose room)

call.classList.add(HIDDEN_CN);
// welcome.hidden = true;

const welcomeForm = welcome.querySelector("form");

async function initCall() { // 호출 초기화 및 사용자 미디어 스트림 가져오기
    welcome.hidden = true;
    call.classList.remove(HIDDEN_CN);
    await getMedia();
}

async function handleWelcomeSubmit(event) { // 방 입장 요청 처리
    // 기본 동작 방지(form 제출에 따른 페이지 리로드)
    event.preventDefault();

    // 이미 소켓 연결이 끊어진 경우 다시 연결
    if (socket.disconnected) {
        socket.connect();
    }

    const welcomeRoomName = welcomeForm.querySelector("#roomName");
    const welcomeNickname = welcomeForm.querySelector("#nickname");
    const nicknameContainer = document.querySelector("#userNickname");
    roomName = welcomeRoomName.value;
    welcomeRoomName.value = "";
    nickname = welcomeNickname.value;
    welcomeNickname.value = "";
    nicknameContainer.innerText = nickname;
    socket.emit("join_room", roomName, nickname);
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// @Chat Form

const chatForm = document.querySelector("#chatForm");
const chatBox = document.querySelector("#chatBox");

const MYCHAT_CN = "myChat";
const NOTICE_CN = "noticeChat";

chatForm.addEventListener("submit", handleChatSubmit);

function handleChatSubmit(event) {
    event.preventDefault();
    const chatInput = chatForm.querySelector("input");
    const message = chatInput.value;

    if (fileInput.files.length > 0) { // 파일 첨부가 있는 경우
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onloadend = (event) => {
            const arrayBuffer = event.target.result;
            console.log("Sending file:", file.name)
            socket.emit("chat_file", arrayBuffer, file.name, roomName);

            socket.emit("chat", `${nickname}: You sent a file: ${file.name}`, roomName);

            const blobUrl = URL.createObjectURL(file);

            writeChat(`You: <a href="${blobUrl}" download="${file.name}">You sent a file: ${file.name}</a>`, MYCHAT_CN);
        };
        reader.readAsArrayBuffer(file);

        fileInput.value = "";
    } else { // 파일 첨부가 없는 경우 (일반 메세지)
        socket.emit("chat", `${nickname}: ${message}`, roomName);
        writeChat(`You: ${message}`, MYCHAT_CN);
    }

    chatInput.value = "";
}

function writeChat(message, className = null) {
    const li = document.createElement("li");

    if (className) {
        li.classList.add(className);
    }

    const isFileMessageRegex = /You sent a file: (.+)/;

    console.log('Message:', message); // Add this line for debugging.

    if (isFileMessageRegex.test(message)) {
        const [, fileName] = message.match(isFileMessageRegex);

        // 실질적으로 채팅창에 표시되는 내용
        li.innerHTML = `<a href="${fileName}" download="${fileName}">"${fileName}"</a>`;

        console.log('Processed message:', li.innerHTML); // Add this line for debugging.

    } else {
        li.textContent = message;
    }

    chatBox.prepend(li);
}



// @Leave Room

const leaveBtn = document.querySelector("#leave");

function leaveRoom() { // 소켓 연결을 끊고 UI를 초기 상태로 되돌린 후 방에서 나가기
    socket.disconnect();

    call.classList.add(HIDDEN_CN);
    welcome.hidden = false;

    peerConnectionObjArr = [];
    peopleInRoom = 1;
    nickname = "";

    myStream.getTracks().forEach((track) => track.stop());
    const nicknameContainer = document.querySelector("#userNickname");
    nicknameContainer.innerText = "";

    myFace.srcObject = null;
    clearAllVideos();
    clearAllChat();
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

function clearAllChat() { // // 모든 채팅을 화면에서 제거
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

    writeChat("Notice!", NOTICE_CN);
    for (let i = 0; i < length - 1; ++i) {
        try {
            const newPC = createConnection(
                userObjArr[i].socketId,
                userObjArr[i].nickname
            );
            const offer = await newPC.createOffer();
            await newPC.setLocalDescription(offer);
            socket.emit("offer", offer, userObjArr[i].socketId, nickname);
            writeChat(`__${userObjArr[i].nickname}__`, NOTICE_CN);
        } catch (err) {
            console.error(err);
        }
    }
    writeChat(" 님이 입장하였습니다.", NOTICE_CN);
});

socket.on("offer", async (offer, remoteSocketId, remoteNickname) => {
    try {
        const newPC = createConnection(remoteSocketId, remoteNickname);
        await newPC.setRemoteDescription(offer);
        const answer = await newPC.createAnswer();
        await newPC.setLocalDescription(answer);
        socket.emit("answer", answer, remoteSocketId);
        writeChat(`notice!`, NOTICE_CN);
        writeChat(`__${remoteNickname}__ 님이 입장하였습니다.`, NOTICE_CN);
    } catch (err) {
        console.error(err);
    }
});

socket.on("answer", async (answer, remoteSocketId) => {
    await pcObj[remoteSocketId].setRemoteDescription(answer);
});

socket.on("ice", async (ice, remoteSocketId) => {
    await pcObj[remoteSocketId].addIceCandidate(ice);
});

socket.on("chat", (message) => {
    writeChat(message);
});

socket.on("chat_file", (arrayBuffer, fileName) => {
    const blob = new Blob([new Uint8Array(arrayBuffer)]);
    const url = URL.createObjectURL(blob);

    writeChat(`<a href="${url}" download="${fileName}">${fileName}</a>`);
});


// @RTC code

function handleIce(event, remoteSocketId) { // ICE 후보가 생성될 때 해당 후보 정보 전송
    if (event.candidate) {
        socket.emit("ice", event.candidate, remoteSocketId);
    }
}

function handleAddStream(event, remoteSocketId, remoteNickname) {
    const peerStream = event.stream;
    console.log("peerStream.getVideoTracks :", peerStream.getVideoTracks());
    if (peerStream.getVideoTracks()[0] && peerStream.getVideoTracks()[0].readyState === 'ended') {
        const canvasElem = document.createElement('canvas');
        canvasElem.width = 640;
        canvasElem.height = 480;
        const ctx = canvasElem.getContext('2d');
        ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);

        const blackScreenTrack = canvasElem.captureStream().getVideoTracks()[0];
        peerStream.addTrack(blackScreenTrack);
    }

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
    // myPeerConnection.addEventListener(
    //   "iceconnectionstatechange",
    //   handleConnectionStateChange
    // );
    myStream //
        .getTracks()
        .forEach((track) => myPeerConnection.addTrack(track, myStream));

    pcObj[remoteSocketId] = myPeerConnection;

    ++peopleInRoom;

    sortStreams();
    return myPeerConnection;
}

// 원격 사용자의 비디오, 닉네임 정보를 받아 DOM에 생성
function paintPeerFace(peerStream, id, remoteNickname) {
    console.log("Setting up peer stream", peerStream);
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

    const videoElement = document.querySelector("#myFace");
    console.log("Video Element:", videoElement);

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
/*
function handleConnectionStateChange(event) {
  console.log(`${pcObjArr.length - 1} CS: ${event.target.connectionState}`);
  console.log(`${pcObjArr.length - 1} ICS: ${event.target.iceConnectionState}`);

  if (event.target.iceConnectionState === "disconnected") {
  }
}
*/
