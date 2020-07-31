import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from '../models/message.class'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  msg:Message;
  constructor(public socket: Socket) { }

  public subject = new Subject<any>();
  public newsubject = new Subject<any>();
  currentMessage = this.socket.fromEvent<Message>('message');

  //   public sendMessage(message) {
  //     this.socket.emit('new-message', message);
  //   }

  //   public getMessages = () => {
  //     return Observable.create((observer) => {
  //             this.socket.on('new-message', (message) => {
  //                 observer.next(message);
  //             });
  //     });
  // }

  public welcomeapp(message) {
    this.socket.on('message', message => {
      // console.log(message)
      // this.outputmessage(message);
      this.subject.next({ message });
    })
  }

  public sendMessagetoServer(message){
    // console.log(message)
    this.socket.emit('chatMessage',message)
  }


  public outputmessage(message){
    console.log(message)  
    return message;
  }

  public joinRoom(username,room){
    console.log(username,room)
    this.socket.emit('joinRoom',{
      username,room
    })
  }

  // Get room and users
  public getRoomandUsers(room,users){
    this.socket.on('roomUsers', ({ room,users }) => {
      // this.outputRoomsName(room);
      // this.outputUsersName(users);
      console.log({room,users})
    
    })
  }

  public outputRoomsName(room){
    // this.newsubject.next({ room });
    console.log(room)
   
    // return room;
  }
  public outputUsersName(users){
    console.log(users)


  }

  // public outputUsers(users){
  //   this.newsubject.next({ users });

    
  // }



}
