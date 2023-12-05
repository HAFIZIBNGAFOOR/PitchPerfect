import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-diolog',
  templateUrl: './confirmation-diolog.component.html',
  styleUrls: ['./confirmation-diolog.component.css']
})
export class ConfirmationDiologComponent {
  title: string='';
  message: string='';
  status:string=''
  constructor(public dialogRef: MatDialogRef<ConfirmationDiologComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.status = data.status
  }
 
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
export class ConfirmDialogModel {

  constructor(public title: string, public message: string,public status:string) {
  }
}
