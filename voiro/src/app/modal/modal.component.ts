import { Component,ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { UploadImageService } from '../upload-image.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  uploadForm = this.fb.group({
    
  });
  files: File[] = [];

  
  constructor(private fb: FormBuilder, private uploadImageService:UploadImageService) {}
   // cropperSettings: CropperSettings;  
  
   imageChangedEvent: any = '';
  
   croppedImage: any = '';

   allowDrop(ev:any) {
      ev.preventDefault();
  }

 drag(ev:any) {
  ev.dataTransfer.setData("text", ev.target.id);
 }

 drop(ev:any) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
 }
  
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
    imageLoaded() {
        /* show cropper */
    }
    cropperReady() {
        /* cropper ready */
    }
    loadImageFailed() {
        /* show message */
    }


    onSelect(event:any) {
       // console.log(event);
        this.files.push(...event.addedFiles);
        this.imageChangedEvent = event;
  
        const formData = new FormData();
    
        for (var i = 0; i < this.files.length; i++) { 
          formData.append("file[]", this.files[i]);
        }
   
       
    }
  
    onRemove(event:any) {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    }

  onSave(): void {
      let imageBlob=this.dataURItoBlob(this.croppedImage);
    let data=this.uploadImageService.uploadToImgbb(imageBlob);
    data.subscribe(details=>{
        console.log(details);
    })
   
  }

  dataURItoBlob(dataURI:any) {
    console.log(dataURI);

    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
  }

}
