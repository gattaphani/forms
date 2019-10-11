import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
 

  errmsg: any;
  postlogindata: any;
  token: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private empService: EmpService) { }

  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
  //   this.empService.getToken().subscribe(restoken =>{
  //     this.token = restoken;
  //     for(let i=0;i<=this.token.length;i++) 
  //     {
  //       this.tokenobj = this.token[i];
  //       console.log('tokenobj',this.tokenobj);
  //     }
  //  localStorage.setItem('Token',JSON.stringify(this.token))
  //   })
    // this.onSubmit(this.loginForm);
  }


  
  tokenobj:any;
  Token:any;
  onSubmit(data){
    var logindata={}
    logindata['username']=this.loginForm.get('username').value,
    logindata['password']=this.loginForm.get('password').value,
    this.empService.logIn(logindata).subscribe(res=>{
      this.postlogindata = res;
      console.log('login data',this.postlogindata);
      // if(this.postlogindata.username == this.loginForm.controls.username.value)
      if(this.loginForm.controls.username.value !==""  && this.loginForm.controls.password.value !=="")
    { 
      this.empService.getToken().subscribe(restoken =>{
        this.token = restoken;
        for(let i=0;i<=this.token.length;i++) 
        {
          this.tokenobj = this.token[i];
          console.log('tokenobj',this.token);
        }
     localStorage.setItem('Token',JSON.stringify(this.token))
      })
      this.Token = localStorage.getItem('Token')
      console.log('Token',this.Token);
      alert(this.Token);
      this.router.navigate(['/about/list'])
    }
    else
    {
      alert('Please fill these fields')
    }
   
    },
    error=>{
      this.errmsg = error;
      alert(this.errmsg)
    })
 
    
  }
  // serverName;
  // OnUpdateServerName(event: Event) {  
  //   this.serverName = (<HTMLInputElement>event.target).value;  
  //   console.log(event)
  // } 
}
