import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  videoSel: any;

  constructor(
    public _yts: YoutubeService
  ) {
    this._yts.getVideos().subscribe(
      videos => {
        console.log(videos);
        this.videos = videos;
      }
    );
  }

  ngOnInit() {
  }

  cargarMas() {
    this._yts.getVideos()
      .subscribe( videos => this.videos.push.apply( this.videos, videos ));
  }

  verVideo( video: any ) {
    this.videoSel = video;

    $('#exampleModal').modal();
  }

  cerrarModal() {
    this.videoSel = null;
    $('#exampleModal').modal('hide');
  }

}
