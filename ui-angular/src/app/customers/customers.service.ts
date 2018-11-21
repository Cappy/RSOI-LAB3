import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Customer } from './customer';
 
@Injectable()
export class CustomersService {
 
    private url = "/api/customers";
 
    constructor(private http: HttpClient) {
    }
 
    getCustomers() {
        return this.http.get(this.url);
    }
 
    createCustomer(customer: Customer) {
		return this.http.post(this.url, customer, { observe: 'response' });
    }
    updateCustomer(customer: Customer) {
  
        return this.http.put(this.url + '/' + customer.customerId, customer, { observe: 'response', responseType: 'text' });
    }
    deleteCustomer(customerId: string) {
        return this.http.delete(this.url + '/' + customerId);
    }
}