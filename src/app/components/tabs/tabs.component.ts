import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Presupuesto } from 'src/app/modelos/presupuesto';
import { Registro } from 'src/app/modelos/registro';
import { RegistrosService } from 'src/app/services/registros.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})

export class TabsComponent implements OnInit {
  formPresupuesto! : FormGroup;
  formRegistro! : FormGroup;
  presupuesto! : Presupuesto;
  registros : Registro[] = [];
  tabSelected = 0;
  columnas: string[] = ['nombre', 'categoria', 'monto', 'acciones'];
  colsBalance: string[] = ['Elemento', 'valor'];

  constructor(private dataService: RegistrosService) {
    this.formPresupuesto = new FormGroup({
      monto: new FormControl(),
      divisa: new FormControl()
    });

    this.formRegistro = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      monto: new FormControl(),
      categoria: new FormControl()
    });
  }

  ngOnInit(): void {
    
    this.dataService.get_presupuesto('1').then((docSnap) => {
      this.presupuesto = docSnap.data() as Presupuesto;
      this.presupuesto.id = '1';

    });

    this.cargarRegistros();
  }

  cargarRegistros(){
    this.dataService.get_registros().subscribe((all_registros) => {
      this.registros =  all_registros as Registro[];
      
    });
  }

  submitPresupuesto(){
    this.dataService.update_presupuesto(this.presupuesto).then(() =>{
      this.tabSelected = 1;
    });
  }

  submitRegistro(){
    let objeto = this.formRegistro.value;
    if(objeto.id == null){
      this.dataService.add_registro(objeto).then(() => {
        this.cargarRegistros();
        this.formRegistro.reset();
      });
    }else{
      this.dataService.update_registro(objeto).then(() => {
        this.cargarRegistros();
        this.formRegistro.reset();
      });
    }
  }

  editarRegistro(registro: Registro){
    this.formRegistro.get('id')?.setValue(registro.id);
    this.formRegistro.get('categoria')?.setValue(registro.categoria);
    this.formRegistro.get('monto')?.setValue(registro.monto);
    this.formRegistro.get('nombre')?.setValue(registro.nombre);
  }

  borrarRegistro(registro: Registro){
    this.dataService.delete_registro(registro).then(() =>{
      this.cargarRegistros();
    });
  }

  calcularBalance(){
    let suma = 0;
    for (const i in this.registros) {
      suma = suma + this.registros[i].monto;
    }

    return this.presupuesto.monto - suma;
  }
}
