import {Injectable} from '@angular/core';
import {Alert} from './Alert';
import {Subject, Observable, filter} from 'rxjs';
import {AlertType} from "./AlertType";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'alert-info';

  constructor() {
  }

  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable()
      .pipe(filter(
        x => x && x.id === id
      ));
  }

  success(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Success, message}))
  }

  error(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Error, message}))
  }

  info(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Info, message}))
  }

  warning(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Warning, message}))
  }

  default(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Default, message}))
  }

  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
    console.log(alert);
  }

  clear(id = this.defaultId) {
    this.subject.next(new Alert({id}));
  }
}
