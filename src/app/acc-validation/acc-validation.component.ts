import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { AlertService } from '../alert';

@Component({
  selector: 'app-acc-validation',
  templateUrl: './acc-validation.component.html',
  styleUrls: ['./acc-validation.component.scss']
})
export class AccValidationComponent implements OnInit {

  token:string;

  constructor(  
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    protected alertService: AlertService
  ) { }

  ngOnInit() {
    // Subscribed
    this.route.paramMap.subscribe(params => {
      this.token = params.get("token");
      
      if( ! this.token ) {  alert('no params ')};

      let result = this.authService.validation( this.token )

      result.then( (data:any) => {
        //si l'update n'a pas fonctionné 
        console.log('from acc-vali node side => ' , data );


        if(  ! data[0] ){
          this.alertService.error( 'Une erreur est survenue lors de la validation email'  );
          setTimeout( ()=>{
            alert('redirection => ');
            this.router.navigate([ "auth" ]);
          } , 2000  )

        }else{
          //is the user auth ? 
          console.log(  this.authService.isAuth );
          this.alertService.success(`Confirmation depuis ${ data[0].email } effectuée avec succes ! `);
          setTimeout( ()=>{
            alert('redirection => ');
            this.router.navigate([ "auth" ]);
          } , 2000  )
        }
      })


    });



  }

}
