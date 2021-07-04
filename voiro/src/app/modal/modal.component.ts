import { Component,ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { ImageCroppedEvent, ImageCropperComponent,base64ToFile  } from 'ngx-image-cropper';
import { UploadImageService } from '../upload-image.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  uploadForm = this.fb.group({
    
  });
  files: any[] = [];
  fileToBeSaved:any;
  fileName="";

  
  constructor(private fb: FormBuilder, private uploadImageService:UploadImageService) {}
   // cropperSettings: CropperSettings;  
  
   imageChangedEvent: any = '';
  
   croppedImage: any = '';


    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.fileName=event.currentTarget.files[0].name;

    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.fileToBeSaved = base64ToFile(this.croppedImage);
        
    }
    
    onReset(){
        this.imageChangedEvent="";
        this.croppedImage="";
        this.fileName="";
        this.files=[];
        this.fileToBeSaved="";
    }


 
 onSave(){
     const fileToUpload: File = new File([this.fileToBeSaved], this.fileName);
     const form = new FormData();
     form.append('image', fileToUpload);
     this.uploadImageService.uploadToImgbb(form);

 }


  /*------------------------------*/

     onFileDropped($event:any) {
    this.imageChangedEvent =$event;
    this.fileName=$event.currentTarget.childNodes[0].files[0].name;
    this.prepareFilesList($event);
  }


  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }

   // this.uploadFilesSimulator(0);
  }



     /**
   * handle file from browsing
   */
  fileBrowseHandler(files:any) {
    this.prepareFilesList(files);
  }

}
