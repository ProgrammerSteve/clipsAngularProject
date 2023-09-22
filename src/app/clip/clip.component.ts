import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import IClip from '../models/clip.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class ClipComponent implements OnInit {
  // id = ''
  player?: Player
  clip?: IClip
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement)
    this.route.data.subscribe(data => {
      this.clip = data.clip as IClip
      this.player?.src({
        src: this.clip.url,
        type: 'video/mp4'
      })
    })
    // this.route.params.subscribe((params: Params) => {
    //   this.id = params.id
    // })
  }


}
