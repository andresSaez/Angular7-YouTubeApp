import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  // "uploads": "UUAMKTtcWpjjeKJnmWytLfZQ"
  // api_key: AIzaSyDYuCpQ4wwgC17rxcdP4fcoWhnTrWaPHQA

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyDYuCpQ4wwgC17rxcdP4fcoWhnTrWaPHQA';
  private palylist = 'UUAMKTtcWpjjeKJnmWytLfZQ';

  private nextPageToken  = '';

  constructor(
    private http: HttpClient
  ) { }

  getVideos() {

    let url = `${ this.youtubeUrl }/playlistItems`;
    let params = new HttpParams().set( 'part', 'snippet')
      .set( 'maxResults', '10 ')
      .set( 'maxResults', '10' )
      .set( 'playlistId', this.palylist )
      .set( 'key', this.apiKey );

    if ( this.nextPageToken ) {
      params = params.set( 'pageToken', this.nextPageToken )
    }

    return this.http.get( url , { params: params } )
      .pipe(map( (res: any ) => {
        this.nextPageToken = res.nextPageToken;

        let videos: any[] = [];

        for (const video of res.items) {
          const snippet = video.snippet;
          videos.push( snippet );
        }

        return videos;
      }));
  }
}
