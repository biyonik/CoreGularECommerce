import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(
    private toastrService: ToastrService
  ) { }

  message(message: string, title: string, toastrOptions: Partial<CustomToastrOptions>) {
    this.toastrService[toastrOptions.messageType](message, title, {
      positionClass: toastrOptions.position
    });
  }
}

export class CustomToastrOptions {
  messageType: ToastrMessageType;
  position: ToastrPosition;
}

export enum ToastrMessageType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning'
}

export enum ToastrPosition {
  TopRight = 'toast-top-right',
  BottomRight = 'toast-bottom-right',
  BottomLeft = 'toast-bottom-left',
  TopLeft = 'toast-top-left',
  TopCenter = 'toast-top-center',
  BottomCenter = 'toast-bottom-center',
  TopFullWidth = 'toast-top-full-width',
  BottomFullWidth = 'toast-bottom-full-width'
}
