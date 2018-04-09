import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/rx';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma:FormGroup;
  usuario:Object = {
    nombrecompleto: {
      nombre: 'david',
      apellido: 'rodriguez'
    },
    correo: 'david.rodriguez@prueba.es',
    pasatiempos: []
  };
  constructor() {
    console.log(this.usuario);

    this.forma = new FormGroup(
      {
        'nombrecompleto': new FormGroup({
          'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
          'apellido': new FormControl('',  [Validators.required, Validators.minLength(3), this.validarApellido])
        }),
        'correo': new FormControl('', [
            Validators.required,
            Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$$")]),
        'pasatiempos': new FormArray([
          new FormControl('correr', Validators.required),
        ]),
        'username': new FormControl('', Validators.required, this.existeUsuario), //Validador asincrono
        'password1': new FormControl('', Validators.required),
        'password2': new FormControl('')
      }
    );

    //this.forma.setValue(this.usuario);

    this.forma.controls['password2'].setValidators([Validators.required, this.noIgual.bind(this.forma)]);

    /*this.forma.valueChanges.subscribe(
      data => {
        console.log(data);
      }
    );*/

    this.forma.controls['username'].valueChanges.subscribe(
      data => {
        console.log(data);
      }
    );

    this.forma.controls['username'].statusChanges.subscribe(
      data => {
        console.log(data);
      }
    );

  }

  ngOnInit() {
  }

  guardar(){
    this.forma.reset({
      nombrecompleto:{
        nombre:'',
        apellido:''
      },
      correo: ''
    });
    this.forma.reset(this.usuario);
  }

  agregarPasatiemo(){
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('dormir', Validators.required));
  }

  validarApellido(control: FormControl):{[s: string]:boolean}{
    if(control.value === 'rodriguez'){
      return {
        valida:true
      };
    }
    return null;
  }

  noIgual(control: FormControl):{[s: string]:boolean}{
    let forma:any = this;
    if(control.value !== forma.controls['password1'].value){
      return {
        valida:true
      };
    }
    return null;
  }

  existeUsuario(control: FormControl):Promise<any>|Observable<any>{
    let promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if(control.value === "david"){
            resolve({ existe: true });
          }
          else{
            resolve(null);
          }
        }, 3000);
      }
    );

    return promesa;
  }


}
