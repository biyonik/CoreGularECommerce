import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, alertifyOptions: Partial<AlertifyOptions>) {
    alertify.set('notifier', 'position', alertifyOptions.position);
    alertify.set('notifier', 'delay', alertifyOptions.delay);
    alertify.set('notifier', 'type', alertifyOptions.messageType);
    const msg = alertify[alertifyOptions.messageType](message);
    if (alertifyOptions.dismissOthers) {
      msg.dismissOthers();
    }
  }

  dismiss() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Notify;
  position: Position = Position.TopCenter;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum MessageType {
  Error= "error",
  Message = "message",
  Success = "success",
  Notify = "notify",
  Warning = "warning"
}

export enum Position {
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  TopCenter = "top-center"
}
