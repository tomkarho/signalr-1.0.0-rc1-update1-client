import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from "@aspnet/signalr";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private connection: HubConnection;

  public messages: Subject<any> = new Subject<any>();

  constructor() {
    this.connection = (new HubConnectionBuilder()).withUrl('http://localhost:5000/messages').build();

    this.connection.on('ReceiveMessage', message => {
      console.log(message);
      this.messages.next(message);
    });

    this.startConnection();
  }

  private startConnection() {
    this.connection.start().then(_ => {
      console.log(_);
      console.log('connection established');

    }).catch(error => {
      console.log(error);
    });
  }

  public send(message: string) {
    console.log(message);
    const clone = JSON.stringify(message);
    this.connection.send('SendMessage', clone);
  }
}
