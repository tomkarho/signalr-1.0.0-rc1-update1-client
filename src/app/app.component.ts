import {Component} from "@angular/core";
import {SignalrService} from "./signalr.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
  message: string;

  receivedMessages = [];

  constructor(private signalr: SignalrService) {
    signalr.messages.subscribe(message => this.receivedMessages.push(message));
  }

  sendMessage() {
    this.signalr.send(this.message);
  }
}
