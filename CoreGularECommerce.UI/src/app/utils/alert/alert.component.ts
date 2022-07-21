import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {AlertService} from './alert.service';
import {Alert} from "./Alert";
import {Subscription} from "rxjs";
import {AlertType} from "./AlertType";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id: string = 'default-alert';
  @Input() fade: boolean = true;

  alerts: Alert[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(
    private router: Router,
    private alertService: AlertService
  ) {
  }


  ngOnInit(): void {
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        if (!alert.message) {
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        this.alerts.push(alert);
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    })
  }


  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      this.alerts.find(x => x === alert).fade = true;
      setTimeout(() =>{
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) { // @ts-ignore
      return;
    }

    const classes = ['alert'];
    const alertTypeClass = {
      [AlertType.Default] : '',
      [AlertType.Success] : 'alert-success',
      [AlertType.Error] : 'alert-error',
      [AlertType.Info] : 'alert-info',
      [AlertType.Warning] : 'alert-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }


}
