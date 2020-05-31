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
      transition('static => rolling', animate('600ms ease-out'))
    ])
  ]
})
export class CarouselComponent implements OnInit {

  @Input() images: string[];

  public rolling: boolean = false;
  
  @Output() imageChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  get getRolling() {
    return this.rolling ? 'rolling' : 'static'
  }

  moveNext() {
    if(this.rolling) return;
    this.rolling = !this.rolling;
  }

  carouselAnimationCallback(event: AnimationEvent) {
    if (!this.rolling) return;

    this.rolling = false;
    this.images.push(this.images.shift())

    this.imageChange.emit(this.images[0]);
  }
}
