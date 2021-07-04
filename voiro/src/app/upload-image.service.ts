import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject,Observable} from 'rxjs';
import { retry,catchError, map, tap } from 'rxjs/operators';
import { Image } from './image';
//import * as AWS from 'aws-sdk/global';
//import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  readonly imgBbKey="ee1dbf7276b271f2e338966bc7426022";
  readonly uploadUrl="https://api.imgbb.com/1/upload?expiration=600&key=ee1dbf7276b271f2e338966bc7426022";
  images:BehaviorSubject<Image[]>=new BehaviorSubject<Image[]>([])
  constructor(private http:HttpClient) { }

 
    httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/json'})//header options
  };

  uploadToImgbb(image:any):Observable<Image>{
   

    return this.http.post<Image>(this.uploadUrl,this.imgBbKey,this.httpOptions)
       .pipe(
         map((data: any) => {
             console.log(data);
           }),
         tap(_ => this.log("Upload Done")),
         catchError(this.handleError<Image>('Upload Image'))
         )as Observable<Image>;
     ;
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   */
  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
        // TODO: better job of transforming error for user consumption
        const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `server returned code ${error.status} with body "${error.error}"`;
       
         throw new Error(`${operation} failed: ${message}`);

    };
  }


   /** Log a FindingfalconeService message  */
  private log(message: string) {
   // this.messageService.add(`HeroService: ${message}`);
   console.log(message);

  }

}
