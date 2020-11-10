import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from '../service';
import { DeleteService } from '../service/delete.service';


export interface Empty {
    _id: string
}
@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss']
})
export class DeleteItemComponent implements OnInit {


  keyWord: string;
  isValid: boolean = false;

  constructor(public dialogRef: MatDialogRef<DeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public _deleteService: DeleteService) { }

  ngOnInit(): void {
  }

  checkWord(){
   
      this.keyWord == this.data.word ? this.isValid = true : this.isValid = false;
  }

  async delete(){

    try{
      let {_id, model} = this.data;
      console.log(this.data)
      let resObj = await this._deleteService.delete(_id, model);
      if(resObj){
        let evt = {
          data: resObj.data,
          event: true
        }
        this.dialogRef.close(evt);
     }
  
    }catch(error){

        console.warn(error);
        this.dialogRef.close({event:false});
    }

  }

  close(){
    this.dialogRef.close();
  }

}
