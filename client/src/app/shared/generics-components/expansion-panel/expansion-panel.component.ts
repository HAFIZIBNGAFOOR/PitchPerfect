import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.css']
})
export class ExpansionPanelComponent {
  panelOpenState:boolean = false
  @Input() expansionData :any;

  ngOnInit(): void {

    console.log(this.expansionData,' htis isexpansion data');
    
  }
}
