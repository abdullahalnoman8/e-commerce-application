import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CheckoutFormServiceService} from "../../services/checkout-form-service.service";
import {Country} from "../../common/country";
import {State} from "../../common/state";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup:FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder, private checkoutFormService: CheckoutFormServiceService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email:['']
      }),
      shippingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:[''],
      }),
      billingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:[''],
      }),
      creditCard: this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:[''],
      })
    });

    // populate credit card months

    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth " + startMonth);

    this.checkoutFormService.getCreditCardMonths(startMonth).subscribe(
      data =>{
        console.log("Retrieved Credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
    // populate credit card years

    this.checkoutFormService.getCreditCardYears().subscribe(
       data=>{
         console.log("Retrieve credit card years" + JSON.stringify(data));
         this.creditCardYears = data;
       }
    )

    // populates the countries
    this.checkoutFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    )
  }

  onSubmit(){
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("The email address is "+ this.checkoutFormGroup.get('customer').value.email);

    console.log("The shipping address country is "+ this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("The shipping address state is "+ this.checkoutFormGroup.get('shippingAddress').value.state.name);

  }

  copyShippingAddressToBillingAddress(event) {
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls["shippingAddress"].value);

      // bug fix for states
      this.billingAddressStates = this.shippingAddressStates;
    }else{
      this.checkoutFormGroup.controls["billingAddress"].reset();

      // bug fix for states
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    console.log('selected year, current year', selectedYear, currentYear);


    // if the current year equals the selected year, then start with the current month
    let startMonth: number;
    if(currentYear == selectedYear){
      startMonth = new Date().getMonth()+ 1;
    }else {
      startMonth = 1;
    }
    this.checkoutFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit cart months" + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  }

  getStates(formGroupName: string) {
    const  formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.checkoutFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }else {
          this.billingAddressStates = data;
        }
        // select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );

  }
}
