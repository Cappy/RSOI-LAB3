import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { Customer } from './customer';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [CustomersService]
})
export class CustomersComponent implements OnInit {

  customer: Customer = new Customer();   // изменяемый клиент
  customers: Customer[];                // массив клиентов
  customersCount: number;
  tableMode: boolean = true;          // табличный режим
  page: number = 1;
  size: number = 10;

  
  constructor(private customersService: CustomersService,
  private route: ActivatedRoute, private router: Router,
  private formBuilder: FormBuilder) 
  {
	this.route.queryParams.subscribe(params => {
		if (params['page']>0) {
			this.page = params['page'];
		}
		if (params['size']>0){
			this.size = params['size'];
		}
    });
	
  }

ngOnInit() {
		
        this.loadCustomers();    // загрузка данных при старте компонента
		//this.getCustomersCount();
		
    }

    // получаем данные через сервис
    loadCustomers() {	
		this.getCustomersCount();
        this.customersService.getCustomers(this.page,this.size)
            .subscribe((data: Customer[]) => this.customers = data);
		if (this.page > 0 && this.size > 0)
		{
		this.router.navigate(['/customers'], { queryParams: { page: this.page, size: this.size } });
		}
    }
	
	getCustomersCount() {
        this.customersService.getAllCustomers()
            .subscribe((data: Customer[]) => this.customersCount = data.length);
    }
	
    // сохранение данных
    save() {
        if (this.customer.customerId == null) {
			
			this.customersService.createCustomer(this.customer)
                .subscribe((data: HttpResponse<Customer>) => {
                    console.log(data);
					this.loadCustomers();
                    //this.customers.push(data.body);
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
		this.loadCustomers();
        this.customer = new Customer();
        this.tableMode = true;
    }
	
    delete(c: Customer) {
	  
	  this.customersService.deleteCustomer(c.customerId)
            .subscribe(data => this.loadCustomers());
	this.cancel();
    }
	
    add() {
        this.tableMode = false;
    }
	
}