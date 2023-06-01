import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '../types/currencyIE';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currenyApi: String = 'https://api.exchangerate-api.com/v4/latest'
    ;


  constructor(private http: HttpClient) { }
  getCurrencies(currency: String): Observable<Currency> {
    return this.http.get<Currency>(`${this.currenyApi}/${currency}`)
  }
}
