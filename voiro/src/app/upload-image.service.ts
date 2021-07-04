import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject,Observable} from 'rxjs';
import { retry,catchError, map, tap } from 'rxjs/operators';
import { Image } from './image';
import { images } from './imagesList';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  readonly imgBbKey="ee1dbf7276b271f2e338966bc7426022";
  readonly uploadUrl="https://api.imgbb.com/1/upload?expiration=300000&key=ee1dbf7276b271f2e338966bc7426022";
  images:BehaviorSubject<Image[]>=new BehaviorSubject<Image[]>([]);
  constructor(private http:HttpClient) { }

 
    httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/json','Access-Control-Allow-Origin':'*',
                               'Access-Control-Allow-Credentials':'*',
                               'Access-Control-Expose-Headers':'*'})//header options
  };

  uploadToImgbb(form:any):Observable<Image>{
     

    let details= this.http.post<any>(this.uploadUrl,form,this.httpOptions);
    details.subscribe(data=>{
       console.log(data);
       if(data.status==200)
       {
       let imageDetails=this.images.getValue();
        imageDetails.push(data.data);
        this.images.next(imageDetails);
      }
     });
     return details;
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
