import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable,of,Subscription } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { UploadImageService } from '../upload-image.service';
import { Image } from '../image';
import { TruncateNamePipe } from '../truncate-name.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  imageList:Observable<Image[]>=of([]);
  images: Subscription;
  display=true;
  constructor(
    private uploadImageService:UploadImageService) 
  {
    this.images=this.uploadImageService.images.subscribe(data=>{
      this.imageList=of(data);
      if(data.length==0)
        this.display=false;
      else
        this.display=true;
    });
   
  }

 

  ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.images.unsubscribe();
}
}