import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feeds = []
  constructor(
    public data: DataServiceService
  ) { }

  ngOnInit() {
    this.data.getFeedbacks().$ref.once('value', (snap) => {
      const values = snap.val();
      for (const key in values) {
        if (values[key]) {
          for (const key1 in values[key]) {
            if (values[key][key1]) {
              this.feeds.push({ category: key, text: values[key][key1].text, uid: values[key][key1]['uid'] || null });
            }
          }
        }
      }
    });
  }

}
