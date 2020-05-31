import { Component, OnInit, Input, Output } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations"
import { Observable, Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { inherits } from 'util';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass'],
  animations: [
    trigger('carouselState', [
      state('rolling', style({
        transform: 'translateX(-100%)'
      })),
      state('static', style({
        transform: 'translateX(0)'
      })),
      transition('rolling => static', animate('0ms')),
      transition('static => rolling', animate('600ms ease-in-out'))
    ])
  ]
})
export class CarouselComponent implements OnInit {

  @Input() images: string[];
  public dots: object[];

  public selected: number = 0;
  public rolling: boolean = false;

  @Output() imageChange = new EventEmitter();

  @Input() time: number = -1;

  constructor() {
    // setInterval(() => {
    //   this.moveNext();
    // }, 10000);
  }

  ngOnInit(): void {
    this.dots = new Array(this.images.length);

    if(this.time <= 0) return;
    setInterval(() => {
      this.moveNext();
    }, this.time)
  }

  get getRolling() {
    return this.rolling ? 'rolling' : 'static'
  }

  moveNext() {
    if (this.rolling) return;
    this.rolling = true;

    this.selected = this.selected >= this.images.length - 1 ? 0 : this.selected + 1;
  }

  carouselAnimationCallback(event: AnimationEvent) {
    if (!this.rolling) return;

    this.rolling = false;
    this.images.push(this.images.shift())
    // let sources = this.images.slice(0);
    // sources.push(sources.shift());
    // this.images = sources;

    this.imageChange.emit(this.images[0]);
  }
}
