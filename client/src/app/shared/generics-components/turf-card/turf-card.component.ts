import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-turf-card',
  templateUrl: './turf-card.component.html',
  styleUrls: ['./turf-card.component.css']
})
export class TurfCardComponent {
  @Input() turfData!:any;
  @Output() submitTurf = new EventEmitter();
  ngOnInit(): void {
    console.log(this.turfData);
  }
  submit(data:any){
    this.submitTurf.emit(data)
  }
}
