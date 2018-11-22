import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { Customer } from './customer';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [CustomersService]
})
export class CustomersComponent implements OnInit {

  customer: Customer = new Customer();   // изменяемый клиент
  customers: Customer[];                // массив клиентов
  tableMode: boolean = true;          // табличный режим
  
  constructor(private customersService: CustomersService) { }

ngOnInit() {
        this.loadCustomers();    // загрузка данных при старте компонента  
    }
    // получаем данные через сервис
    loadCustomers() {
        this.customersService.getCustomers()
            .subscribe((data: Customer[]) => this.customers = data);
    }
    // сохранение данных
    save() {
        if (this.customer.customerId == null) {
			
			this.customersService.createCustomer(this.customer)
                .subscribe((data: HttpResponse<Customer>) => {
                    console.log(data);
                    this.customers.push(data.body);
                });
            // this.customersservice.createcustomer(this.customer)
				// .subscribe((data: customer) => this.customers.push(data));
        } else {
            this.customersService.updateCustomer(this.customer)
                .subscribe(data => this.loadCustomers());
        }
        this.cancel();
    }
    editCustomer(c: Customer) {
        this.customer = c;
    }
    cancel() {
        this.customer = new Customer();
        this.tableMode = true;
    }
    delete(c: Customer) {
        this.customersService.deleteCustomer(c.customerId)
            .subscribe(data => this.loadCustomers());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
}