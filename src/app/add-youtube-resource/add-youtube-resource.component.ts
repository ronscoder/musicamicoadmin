import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { TySongData } from '../ty-song-data';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-add-youtube-resource',
  templateUrl: './add-youtube-resource.component.html',
  styleUrls: ['./add-youtube-resource.component.css']
})
export class AddYoutubeResourceComponent implements OnInit {
  // test video ID: VeZL8SQN1Zk
  sourceType = 'youtube';
  date: number;
  limitTo = 2;
  songs: FirebaseListObservable<any[]>;
  form: FormGroup;
  startAt = 0;
  startAt$: Subject<number>;

  constructor(
    // public fireapp: AngularFireDatabase,
    public db: AngularFireDatabase,
    // public database: database
    public dataService: DataServiceService
  ) {
    this.form = this.createForm();
  }
  createForm() {
    return new FormGroup({
      trackid: new FormControl({value:0, disabled: true }),
      source_type: new FormControl({ value: this.sourceType, disabled: true }, Validators.required),
      source: new FormControl('', Validators.required),
      upload_date: new FormControl(new Date().getTime(), Validators.required),
      title: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      thumbnail: new FormControl('', Validators.required),
      artiste: new FormControl('', Validators.required),
      year: new FormControl(new Date().getFullYear(), Validators.required),
      formatcode_audio: new FormControl('', Validators.required),
      formatcode_video: new FormControl('', Validators.required),
      downloads: new FormControl(0),
      likes: new FormControl(0),
      auth_comment: new FormControl('Download ⬇️, listen  🎧 and enjoy 🎉. Like  👍 and comment 📝 when you come back.'),
      tags: new FormControl(),
      note: new FormControl(),
    });
  }
  ngOnInit() {
    this.date = (new Date()).getTime();
    console.log(this.date);
    // this.getData();
    this.startAt$ = new Subject<number>();
    this.db.object('/songs/manipuri/usage/last_trackid').$ref.on('value', (snap) => {
      this.startAt = +snap.val();
      console.log(this.startAt);
      this.startAt$.next(this.startAt);
    });
  }

  getPrevious() {
    // console.log(this.startAt);
    this.startAt -= this.limitTo;
    console.log(this.startAt);
    this.startAt$.next(this.startAt);

  }
  getNext() {
    // console.log(this.startAt);
    this.startAt += this.limitTo;
    console.log(this.startAt);
    this.startAt$.next(this.startAt);

  }

  submitResource() {
    const songData = this.form.getRawValue();
    // console.log(songData);
    this.addSong(songData);
  }

  addSong(songData) {
    const comments = {
      'comment': songData['auth_comment'],
      'displayName': 'Musiclub',
      'photo': 'assets/icon/favicon.ico',
      'userid': '112237211925136350331'
    };
    this.dataService.addResource(songData, 'manipuri', comments).then(res => {
      // console.log(res);
      this.form = this.createForm();
      console.log('resource added');
      // this.form.reset({
      //   downloads: 0, likes: 0, formatcode_audio: '140|mp3', formatcode_video: '22,18,36',
      //   upload_date: this.date, source_type: 'youtube'
      // });
    }, reject => {
      console.log(reject.message);
    });
  }

  loadYTData(videoid: string) {
    console.log(videoid);
    this.dataService.getYoutubeVideoDetails(videoid).subscribe(res => {
      this.enterYoutubeData(res.json().items[0]);
    });
    // console.log(this.form.getRawValue());
  }

  enterYoutubeData(youtubedata) {
    const snippet = youtubedata['snippet'];
    // console.log(youtubedata);
    this.form.patchValue({
      title: snippet.title,
      thumbnail: snippet.thumbnails.default.url,
      formatcode_audio: 140,
      formatcode_video: 22
    })
    // this.form.setValue({
    //   title: snippet.title,
    //   thumbnail: snippet.thumbnails.default.url
    // });
  }
}


