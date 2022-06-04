import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { SocketioService } from 'src/@dw/services/socketio/socketio.service';
import { DataStorageService } from 'src/@dw/services/store/data-storage.service';

@Component({
    selector: 'app-chatting',
    templateUrl: './chatting.component.html',
    styleUrls: ['./chatting.component.scss']
})
export class ChattingComponent implements OnInit {

    @ViewChild('target') private myScrollContainer: ElementRef;
    
    private socket;
    private unsubscribe$ = new Subject<void>();


    userProfileData;
    userCount;
    currentUser;
    chatContent: any;
    chatData = [];
    logString;

    constructor(
        private socketService: SocketioService,
        private dataStorageService: DataStorageService
    ) { 
        this.socket = socketService.socket;
    }

    ngOnInit(): void {

        this.dataStorageService.userProfile.subscribe(
            (data: any) => {
                this.userProfileData = data;

                if(this.userProfileData._id != undefined) {
                    this.socket.emit('join:room', this.userProfileData);
                }
            }
        );

        
        this.socket.on('userInfo', (data) => {
            this.currentUser = data;
        })
        
        this.socket.on('userCount', (data) => {
            this.userCount = data;
        })

        // chat 보내면 받는 부분
        this.socket.on('receiveChatData', (data) => {
            this.chatData.push(data)
        })
    }


    createChat() {
        
        const createAt = new Date()

        const data = {
            _id : this.userProfileData._id,
            email: this.userProfileData.email,
            name: this.userProfileData.name,
            chatContent: this.chatContent,
            createAt: createAt
        }

        


        this.socket.emit('sendChat', data);

        this.chatContent = '';
    }



    // 마지막 채팅에 스크롤 focus
    // http://daplus.net/scroll-angular-2-%EC%95%84%EB%9E%98%EB%A1%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%B1%84%ED%8C%85-%EC%8A%A4%ED%83%80%EC%9D%BC/
    scrollToBottom(): void {
        try {
            // this.scrolltop = this.myScrollContainer.nativeElement.scrollHeight;
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }
}
