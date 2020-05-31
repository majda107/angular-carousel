import { Component, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations"

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

  public images: string[] = ['https://i.chzbgr.com/original/8979973/hFA384455/18-scary-cursed-images-that-are-just-weird-and-awful', 'https://i.ytimg.com/vi/Lb_tQqWr7Rk/maxresdefault.jpg', 'https://i.redd.it/2y3p1u2nb5k11.png'];

  public rolling: boolean = false;

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
  }
}
