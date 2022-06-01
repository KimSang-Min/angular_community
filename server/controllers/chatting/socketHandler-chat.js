const url = require('url');





module.exports = function (wsServer, socket, app) {

    const socketCommunity = wsServer.of('/socketCommunity');
    // 룸에 참가.    
    socket.on('join:room', (data) => {
        
        socket.join('chatting');

        console.log(data)

        const userCount = socket.adapter.rooms.get('chatting')?.size;

        // 자기 자신 포함 같은 room에 있는 사람들에게 현재 접속자 수 전달
        socketCommunity.to('chatting').emit("userCount", userCount);
    });




    ////////// 채팅 //////////////// 
    socket.on('sendChat', (data) => {
        // 자기 자신 포함 같은 room (meetingId로 판단)에 있는 사람들
        socketCommunity.to('chatting').emit("receiveChatData", data);
    })


    socket.on('disconnect', () => {
        console.log('a user disconnected!');

        const userCount = socket.adapter.rooms.get('chatting')?.size;

        // 자기 자신 포함 같은 room에 있는 사람들에게 현재 접속자 수 전달
        socketCommunity.to('chatting').emit("userCount", userCount);
    });




}



