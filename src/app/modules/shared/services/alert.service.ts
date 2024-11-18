import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

constructor() { }

success(msaage:string){
  this.showAlert(msaage,"Success!","success",'Okay')
}
Failed(msaage:string){
  this.showAlert(msaage,"Failed!","error",'Close')
}
Warning(msaage:string){
  this.showAlert(msaage,"Warning!","warning",'Close')
}

showAlert(message:string,title:string,icon:any,confirmButtonText:string): void {
  Swal.fire({
    title: title,
    text: message,
    icon: icon,
    confirmButtonText: confirmButtonText
  });
}

}
