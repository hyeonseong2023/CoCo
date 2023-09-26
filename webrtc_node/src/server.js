import express from "express";
// import WebSocket from "ws";
import SocketIO from "socket.io";
import http from "http";
import cors from 'cors';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors({
  // 3000
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(bodyParser.json());
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use("/public", express.static(process.cwd() + "/src/public"));

let savedData = null;

// post 요청으로 비공개 데이터를 전송 후 
// 일반적인 웹페이지 로딩인 get 요청으로 데이터를 받아옴.
app.post("/saveData", (req, res) => {
  savedData = req.body;
  res.status(200).send('OK');
});

app.get("/", (req, res) => {
  if (savedData) {
    const { userName, roomName } = savedData;
    console.log(userName, roomName);
    res.render("home", { userName: userName, roomName: roomName });
  } else {
    res.send('No data available');
  }
});

app.get("/*", (req, res) => {
  res.redirect("/");
});

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

let roomObjArr = [
  // {
  //   roomName,
  //   currentNum,
  //   users: [
  //     {
  //       socketId,
  //       nickname,
  //     },
  //   ],
  // },
];
const MAXIMUM = 5;

wsServer.on("connection", (socket) => {
  let myRoomName = null;
  let myNickname = null;

  socket.on("join_room", (roomName, nickname) => {
    myRoomName = roomName;
    myNickname = nickname;

    let isRoomExist = false;
    let targetRoomObj = null;

    // forEach를 사용하지 않는 이유: callback함수를 사용하기 때문에 return이 효용없음.
    for (let i = 0; i < roomObjArr.length; ++i) {
      if (roomObjArr[i].roomName === roomName) {
        // Reject join the room
        if (roomObjArr[i].currentNum >= MAXIMUM) {
          socket.emit("reject_join");
          return;
        }

        isRoomExist = true;
        targetRoomObj = roomObjArr[i];
        break;
      }
    }

    // Create room
    if (!isRoomExist) {
      targetRoomObj = {
        roomName,
        currentNum: 0,
        users: [],
      };
      roomObjArr.push(targetRoomObj);
    }

    //Join the room
    targetRoomObj.users.push({
      socketId: socket.id,
      nickname,
    });
    ++targetRoomObj.currentNum;

    socket.join(roomName);

    const members = targetRoomObj.users.map(user => user.nickname); // 닉네임 배열 얻기

    wsServer.to(roomName).emit('updateMemberList', members); // 모든 클라이언트에게 업데이트된 리스트 보내기

    socket.emit("accept_join", targetRoomObj.users);
  });

  socket.on("offer", (offer, remoteSocketId, localNickname) => {
    socket.to(remoteSocketId).emit("offer", offer, socket.id, localNickname);
  });

  socket.on("answer", (answer, remoteSocketId) => {
    socket.to(remoteSocketId).emit("answer", answer, socket.id);
  });

  socket.on("ice", (ice, remoteSocketId) => {
    socket.to(remoteSocketId).emit("ice", ice, socket.id);
  });

  socket.on("chat", (message, roomName) => {
    socket.to(roomName).emit("chat", message);
  });

  socket.on("chat_file", (arrayBuffer, message, roomName) => {
    socket.to(roomName).emit("chat_file", arrayBuffer, message);
  });

  socket.on("disconnecting", () => {
    socket.to(myRoomName).emit("leave_room", socket.id, myNickname);

    let isRoomEmpty = false;

    for (let i = 0; i < roomObjArr.length; ++i) {
      if (roomObjArr[i].roomName === myRoomName) {
        const newUsers = roomObjArr[i].users.filter(
          (user) => user.socketId != socket.id
        );
        roomObjArr[i].users = newUsers;
        --roomObjArr[i].currentNum;

        if (roomObjArr[i].currentNum == 0) {
          isRoomEmpty = true;
        } else {
          const members = roomObjArr[i].users.map(user => user.nickname); // 닉네임 배열 얻기

          wsServer.to(myRoomName).emit('updateMemberList', members); // 모든 클라이언틀르에게 업데이트된 리스트 보내기

        }
      }
    }

    // Delete room
    if (isRoomEmpty) {
      const newRoomObjArr = roomObjArr.filter(
        (roomObj) => roomObj.currentNum != 0
      );
      roomObjArr = newRoomObjArr;
    }
  });
});

const handleListen = () =>
  // 4000
  console.log(`✅ Listening on http://localhost:${PORT}`);
httpServer.listen(PORT, handleListen);
