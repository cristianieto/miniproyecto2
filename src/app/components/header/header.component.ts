import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Registro } from 'src/app/modelos/registro';
import { RegistrosService } from 'src/app/services/registros.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private userService: UserService, private dataService: RegistrosService, private router: Router){

  }

  reiniciar(){
    this.dataService.get_registros().subscribe((datos)=>{
      let registros = datos as Registro[];
      for (const i in registros) {
        this.dataService.delete_registro(registros[i]);
      }
    });

    this.dataService.update_presupuesto({id: '1', monto:0, divisa:''}).then(()=>{
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['aplicacion']));
    });
    
  }

  salir(){
    this.userService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
