import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Customer } from './customer';
import { HttpResponse } from '@angular/common/http';
 
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [DataService]
})
export class AppComponent implements OnInit {
	
    customer: Customer = new Customer();   // изменяемый клиент
    customers: Customer[];                // массив клиентов
    tableMode: boolean = true;          // табличный режим
 
    constructor(private dataService: DataService) { }
 
    ngOnInit() {
        this.loadCustomers();    // загрузка данных при старте компонента  
    }
    // получаем данные через сервис
    loadCustomers() {
        this.dataService.getCustomers()
            .subscribe((data: Customer[]) => this.customers = data);
    }
    // сохранение данных
    save() {
        if (this.customer.customerId == null) {
			
			this.dataService.createCustomer(this.customer)
                .subscribe((data: HttpResponse<Customer>) => {
                    console.log(data);
                    this.customers.push(data.body);
                });
            //this.dataService.createCustomer(this.customer)
			//	.subscribe((data: Customer) => this.customers.push(data));
        } else {
            this.dataService.updateCustomer(this.customer)
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
        this.dataService.deleteCustomer(c.customerId)
            .subscribe(data => this.loadCustomers());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
}