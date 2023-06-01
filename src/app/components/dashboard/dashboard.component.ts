import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from 'src/app/types/currencyIE';
import { currenyData } from 'src/app/currency-json';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  currentRate: any;
  values: any;
  form: FormGroup;
  total?: any;
  currentCurrency: any;
  missingValues: boolean = false;
  constructor(private currencyService: CurrencyService, private fb: FormBuilder) {
    this.form = this.fb.group({
      number: [''],
      currency: ['', [Validators.required]],

    });
  }

  ngOnInit() {
    this.currencyService.getCurrencies('zar').subscribe({
      next: (data: Currency) => {
        this.currentRate = data.rates
        localStorage.setItem('currentRate', JSON.stringify(this.currentRate));
        this.currentCurrency = 'R'

        console.log(this.currentRate)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  calculateRate() {
    const local = localStorage.getItem('currentRate');

    if (local) {
      this.values = JSON.parse(local);
    }
    if (!this.form.value.currency || this.form.value.number) {
      this.missingValues = true;
    }
    for (let x in this.values) {


      if (x == this.form.value.currency) {
        let code;
        currenyData.forEach(item => {
          if (item.code === this.form.value.currency) {
            this.missingValues = false;
            code = item.symbol;
          }
        })
        this.missingValues = false;
        this.total = `${code}${Number(this.form.value.number * this.values[x]).toFixed(2)}`;
      }
    }
  }

}
