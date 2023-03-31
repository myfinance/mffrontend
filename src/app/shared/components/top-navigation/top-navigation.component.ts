import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

  _isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
