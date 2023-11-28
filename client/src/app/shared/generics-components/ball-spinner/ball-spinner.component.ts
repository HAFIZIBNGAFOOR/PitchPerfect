import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ball-spinner',
  templateUrl: './ball-spinner.component.html',
  styleUrls: ['./ball-spinner.component.css']
})
export class BallSpinnerComponent {
  @Input()loader!:boolean;
  // laoding:boolean=false
  ngOnInit(): void {
    console.log(this.loader,' iniside loader');
    
  }

}
