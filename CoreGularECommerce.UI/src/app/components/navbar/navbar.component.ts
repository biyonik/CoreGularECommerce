import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isAdmin: boolean = false;
  public title: string = 'CoreGularECommerce';
  constructor(
    private route: Router
  ) {

  }

  ngOnInit(): void {
    this.route.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url.includes('admin')) {
          this.title = 'CoreGularECommerce Admin';
          this.isAdmin = true;
        } else {
          this.title = 'CoreGularECommerce';
          this.isAdmin = false;
        }
      }
    })
  }


}
