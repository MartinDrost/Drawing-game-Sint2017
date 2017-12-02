import { Component, OnInit } from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {IPaintStroke} from "../../interfaces/IPaintStroke";
import {IGameState} from "../../interfaces/IGameState";

@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.scss']
})
export class DrawingCanvasComponent implements OnInit {

  constructor(
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.socketService.server.on("stroke", stroke => {
      this.addStroke(stroke);
    });
  }

  private addStroke(stroke: IPaintStroke): void {
  }

  public stroke() {
    this.socketService.paint(<IPaintStroke> {
      x:1,
      y:1,
      color: "#00FFFF"
    });
  }

}
