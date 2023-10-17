import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-turf-card',
  templateUrl: './turf-card.component.html',
  styleUrls: ['./turf-card.component.css']
})
export class TurfCardComponent {
  @Input() turfData!:any;

  ngOnInit(): void {
    console.log(this.turfData);
  }
}
