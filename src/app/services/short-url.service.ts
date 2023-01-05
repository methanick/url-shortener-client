import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IShortUrl } from '../models/short-url.interface';

@Injectable({
  providedIn: 'root'
})
export class ShortUrlService {

  constructor(private http:HttpClient) { }

  generateShortUrl(fullUrl:string):Observable<IShortUrl>{
    const url = 'https://lonely-elk-fashion.cyclic.app/shorturl'
    return this.http.post<IShortUrl>(url,{fullUrl}).pipe(
      map((resp:IShortUrl)=>{
        if(!resp){
          throwError(resp)
        }
        return resp
      })
    )
  }

  getShortUrlHistory():Observable<IShortUrl[]>{
    const url = 'https://lonely-elk-fashion.cyclic.app/shorturls'
    return this.http.get<IShortUrl[]>(url).pipe(
      map((resp:IShortUrl[])=>{
        if(!resp){
          throwError(resp)
        }
        return resp
      })
    )
  }
}
