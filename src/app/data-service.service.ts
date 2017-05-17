import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { TyComment, TySongData } from './ty-song-data';
import { Http } from '@angular/http';

const googleapikey = 'AIzaSyBdJPFUP27j1kMd09FLbM3xQAK_zZaWQdE';

@Injectable()
export class DataServiceService {

  constructor(
    private afdb: AngularFireDatabase,
    private http: Http
  ) { }

  addResource(songData: TySongData, location: string, comment?: TyComment): firebase.Promise<any> {
    const songRef = this.afdb.database.ref('/songs/' + location).child('data').push();
    const songkey = songRef.key;
    let trackinghead: number;
    return this.afdb.database.ref('/songs/' + location).child('usage').child('last_trackid').transaction((data) => {
      // Update tracking id head
      trackinghead = data - 1;
      return trackinghead;
    }, completed => {
      songData['trackid'] = trackinghead;
      const result = songRef.set(songData);
      if (comment) {
        this.afdb.database.ref('/songs/' + location).child('comments').child(songkey).push(comment);
      }
    });
  }

  updateTrackHead(location: string) {
    this.afdb.database.ref('/songs/' + location).child('usage').child('last_trackid').transaction((data) => {
      return data--;
    });
  }
  getYoutubeVideoDetails(videoid: string) {
    const part = 'snippet';
    return this.http.get('https://www.googleapis.com/youtube/v3/videos?id='
      + videoid +
      '&key=' + googleapikey +
      '&part=' + part +
      '&fields=items(id,snippet)');
  }
  getFeedbacks(){
    return this.afdb.list('/userfeeds');
  }
  // getReports(){
  //   return this.afdb.list('/userfeeds/report');
  // }
  // getRequests(){
  //   return this.afdb.list('/userfeeds/request');
  // }
}
