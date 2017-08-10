
import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { EmotionService } from '../../services/emotion.service';
import { RecommendationService } from '../../services/recommendation.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-emotion-single',
  templateUrl: './emotion-single.component.html',
  styleUrls: ['./emotion-single.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(800, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(400, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class EmotionSingleComponent implements OnInit {

  recomms: any[] = [];
  next: number;
  staggeringrecomms: any[];
  emotion: any;

  constructor(public route: ActivatedRoute, public emotionserv: EmotionService, public recommserv: RecommendationService) {
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getEmotionDetail(params['id']);
    });
  }

  getEmotionDetail(id) {
    this.emotionserv.getEmotion(id)
      .subscribe((emotion) => {
        this.emotion = emotion;
      });
  }

  createEmotionRecomm() {
    this.route.params.subscribe(params => {
      this.createRecommendation(params['id']);
      this.doNext();
    });
  }

  createRecommendation(id) {
    this.recommserv.createRecommendation(id)
      .subscribe(recomm => {
        this.recomms = recomm.recommendations;
        console.log('new recomendation: ', this.recomms);
        // clear vars
        this.staggeringrecomms = [];
        this.next = 0;
        this.doNext();

      });
  }

  doNext() {
    if(this.next < this.recomms.length) {
      this.staggeringrecomms.push(this.recomms[this.next++]);
      console.log('strangerRecomms',this.staggeringrecomms);
    }
  }

  removeMe(i) {
    this.staggeringrecomms.splice(i, 1);
  }


}
