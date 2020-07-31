import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../../services/socketio.service'
import {Message } from '../../models/message.class'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  newMessage: string;
  message: string ;
  users: any ;
  rooms: any;
  msgs = [] ;

  constructor(private socketioservice:SocketioService) { }
 
  ngOnInit(): void {
    // this.socketioservice
    // .getMessages()
    // .subscribe((msg: Message) => {
    //   this.message.push(msg);
    // });
    // var { username,room } = Qs.parse(location.search);
    
    this.showwelcomemsg(this.message);
    this.socketioservice.subject.subscribe(data => {
      // console.log(data)
      this.msgs.push(data.message)
      // console.log(this.msgs)
    }) 
    this.socketioservice.newsubject.subscribe(newdata => {
      // console.log(newdata)
    
      
      //  console.log(newdata)
      //    
      

    })
    
    // this.socketioservice.welcomeapp(this.message)

  }

  showwelcomemsg(message){
    this.socketioservice.welcomeapp(message)
    // console.log(message)
    // this.msgs.push(message)
    // console.log(this.msgs)
    //  const m = this.socketioservice.outputmessage(message);
    //  console.log(m)

    //  this.msgs.push(m);
    //  console.log(this.msgs)

  }

 

  onSend(form:NgForm){
    // console.log(form.value.message)
    this.socketioservice.sendMessagetoServer(form.value.message)
    this.msgs.push(form.value.message);
    form.reset();
    
    // const chat = document.getElementsByClassName('chat-messages');
    // console.log(this.msgs)
  }
}
