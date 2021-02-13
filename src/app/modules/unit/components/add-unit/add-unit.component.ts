import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Unit, UnitService } from '../../unit.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent implements OnInit {

  unitForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddUnitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private unitService: UnitService,    private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
      this.loadForm();
      if(this.data){
        this.loadEditForm(this.data)
      }
  }

  loadForm(){
      this.unitForm = this.fb.group({
        name: new FormControl('', Validators.required),
        stat: new FormControl('', Validators.required),
      })
  }

  loadEditForm(data: Unit){
    this.unitForm = this.fb.group({
      id: data.id,
      name: new FormControl(data.name, Validators.required),
      stat: new FormControl(data.stat, Validators.required)
    })
  }

  async saveUnit(){
    this.ngxService.start();
    try{
      let result;
      if(this.data){
        result = await this.unitService.updateItem(this.unitForm.value);
      }else{
         result = await this.unitService.addItem(this.unitForm.value);
      }
      console.log(result)
      if(result.status== 201 || result.status== 200 ){
        this.dialogRef.close({success: true});
      }
    }catch(e){
      console.error(e);
    }finally{
      this.ngxService.stop();
    }
  }

  close(){
 
    this.dialogRef.close();
  
 }

}
