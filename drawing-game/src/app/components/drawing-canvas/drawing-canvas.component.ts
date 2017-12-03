import {Component, OnInit, ElementRef, HostListener, ViewChild, Renderer} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {IPaintStroke} from "../../interfaces/IPaintStroke";
import {IGameState} from "../../interfaces/IGameState";
import {GameService} from "../../services/game.service";
import {RoleEnum} from "../../interfaces/RoleEnum";

@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.scss']
})
export class DrawingCanvasComponent implements OnInit {

  private gameState: IGameState = <IGameState>{};

  @ViewChild('canvas')
  public canvasRef: ElementRef;
  public canvas: HTMLCanvasElement = <HTMLCanvasElement>{};
  private context: CanvasRenderingContext2D;

  public color: string = "#FF0000";
  public sizePercentage = 100;

  constructor(
    private socketService: SocketService,
    private gameService: GameService,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>this.canvasRef.nativeElement;
    this.context = this.canvas.getContext("2d");
    this.socketService.server.on("stroke", stroke => {
      this.drawStroke(stroke);
    });
    this.socketService.server.on("gameState", gameState => {
      this.newGameState(gameState);
    });

    this.canvas.width = 950;
    this.canvas.height = 600;
    this.handleResize();
  }

  @HostListener('window:resize', ['$event'])
  public handleResize() {
    this.sizePercentage = 100 / this.canvas.width * this.canvas.clientWidth;
  }

  private newGameState(gameState: IGameState): void {
    if(this.gameState == null || this.gameState.word != gameState.word) {
      this.clearCanvas();
    }
    this.gameState = gameState;
  }

  private clearCanvas() {
    this.context.fillStyle = "#ffffff";
    this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
    console.log("cleared");
  }


  @HostListener('touchmove', ['$event'])
  @HostListener('mousemove', ['$event'])
  private addStroke(event: MouseEvent): void {
    let isTouch = event.type == "touchmove";
    if(!isTouch && (this.gameState.player.token != this.gameService.getSession().token || event.which != 1)) {
      return;
    }
    event.preventDefault();

    // todo make up for skipped pixels

    let offsets = this.canvas.getBoundingClientRect();
    let x = (isTouch ? event['touches'][0].pageX : event.pageX) - (offsets.left + window.scrollX);
    let y = (isTouch ? event['touches'][0].pageY : event.pageY) - (offsets.top + window.scrollY);
    if(x > 0 && x < this.canvas.width &&
       y > 0 && y < this.canvas.height) {
      let stroke = <IPaintStroke> {
        x: this.toActualCoord(x),
        y: this.toActualCoord(y),
        color: this.color
      };
      this.drawStroke(stroke);
      this.socketService.paint(stroke);
    }
  }

  private drawStroke(stroke: IPaintStroke): void {
    this.context.beginPath();
    this.context.fillStyle = stroke.color;
    this.context.arc(stroke.x , stroke.y, 5, 0 ,2*Math.PI);
    this.context.fill();
  }

  public isArtist(): boolean {
    return this.gameService.getSession().role == RoleEnum.Artist;
  }

  private toActualCoord(coord: number): number {
    return coord * (100 / this.sizePercentage);
  }


}
