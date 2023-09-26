socket.on("offer", async (offer, remoteSocketId, remoteNickname) => {
    try {
        const newPC = createConnection(remoteSocketId, remoteNickname);
        await newPC.setRemoteDescription(offer);
        const answer = await newPC.createAnswer();
        await newPC.setLocalDescription(answer);
        socket.emit("answer", answer, remoteSocketId);
        writeChat(`${remoteNickname} 님이 입장하였습니다!`, NOTICE_CN);
    } catch (err) {
        console.error(err);
    }
});
