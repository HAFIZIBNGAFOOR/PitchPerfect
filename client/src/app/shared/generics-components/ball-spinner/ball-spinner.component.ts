import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-ball-spinner',
  templateUrl: './ball-spinner.component.html',
  styleUrls: ['./ball-spinner.component.css']
})
export class BallSpinnerComponent {
  // @Input()loader!:boolean;
  @Input() showSpinner:boolean = false;

  constructor( private cdRef:ChangeDetectorRef){}
  ngOnInit(): void {
    console.log(' iniside loader');
    this.spinner()
  }

  spinner(){
    console.log( 'loginn user sericeiadfna,knsdfnlknlaknsdn',);
    
    // this.spinnerService.getSpinnerObserver()
    // .subscribe({
    //   next:res=>{
    //     console.log(res,' this is response from spinner service');
    //     this.showSpinner = res;
    //     console.log(this.showSpinner);
        
    //     this.cdRef.detectChanges();
    //   },
    //   error:err=>console.log(' error in get spinner subscription')
      
    // })
  }
  ngAfterViewInit(): void {
    this.spinner()
  }

}
