import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currenyApi: String = 'http://api.exchangerate-api.com/v4/latest'
 ;


  constructor(private http: HttpClient) { }
  getCurrencies(currency : String){
    return this.http.get(`${this.currenyApi}/${currency}`)
  }
}
