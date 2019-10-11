import { Component, OnInit } from '@angular/core';
import { EmpService } from '../emp.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';
// import 'rxjs/add/operator/takeWhile';
// import 'rxjs/add/observable/timer'

import { Employee } from '../employee.model';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-listemp',
  templateUrl: './listemp.component.html',
  styleUrls: ['./listemp.component.css']
})
export class ListempComponent implements OnInit {
  employees: any=[];
  id: number;
  getById:any;
  delobj:any;
  editdata:any;
  addForm: FormGroup;
  empid: string;
  empId: any;
  errorMsg: any;
  alive = true;

  constructor(private empService: EmpService,private formBuilder: FormBuilder, private router: Router, 
    private activatedrout:ActivatedRoute ) { }

  ngOnInit() 
  {
    // this.getById = this.activatedrout.params.subscribe(params =>{
    //   this.id =  +params['id'];
    //   console.log('empId',this.getById);
    // })
   
    // Observable.timer(0,10000).takeWhile(() => this.alive).subscribe(() => {
    //   this.empService.getEmployees().subscribe(data=> {
    //     console.log(data);
    //   })
    // });
      this.getAllEmp();
  }



  

  getAllEmp()
  {
    this.empService.getEmployees().subscribe(data => {

        this.employees = data;
        console.log('getAll',this.employees);
      },
      error => 
      {
      this.errorMsg = error;
      alert(this.errorMsg);
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Error',
        showConfirmButton: false,
        timer: 1500
      })
      }, 
       ()=>
       { 
         if(this.errorMsg === undefined)
         {
         alert('observable response completed');
         }
        
       } );
  }

  deleteEmp(employee) 
  {
    
    this.empService.deleteEmployees(employee.id).subscribe(data => {
      this.delobj = data;
      //console.log('after delete',this.delobj);
      if(this.delobj !='') {
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'successfully deleted',
          text:'deleted',
          showConfirmButton: false,
          timer: 1500
        })
        }
      console.log('delobj',this.delobj);
      // var index:number
      // index = this.employees.indexOf(employee);
      //   this.employees.splice(index, 1);
        this.getAllEmp();
      },
      error => 
      {
      this.errorMsg = error;
      alert(this.errorMsg);
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Error',
        showConfirmButton: false,
        timer: 1500
      })
      });
      
    
      
  }
  

  addEmp() {
    this.router.navigate(['/about/add']);
  }



  getByEmpId(employees)
  {
    
    console.log(employees);
    var getId = employees.id
    localStorage.setItem('id', employees.id); 
    console.log(employees.id);
    this.router.navigate(['/about/update/:id']);
  }
}
