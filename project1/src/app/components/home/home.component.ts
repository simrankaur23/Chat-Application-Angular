import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // socketsioservice: SocketioService;
  roomUser = [];
  constructor(private router: Router, private socketsioservice:SocketioService) {
    // this.socketsioservice = socketsioservice
   }
  ngOnInit(): void {
  }


  onSubmit(form: NgForm){
    console.log(form.value);
    this.socketsioservice.joinRoom(form.value.username,form.value.room);
    this.roomUser.push(form.value.username,form.value.room)
    console.log(this.roomUser)

    this.router.navigate(['/', 'room'])
    
  }

}
