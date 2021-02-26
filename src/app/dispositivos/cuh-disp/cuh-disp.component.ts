import { Component, OnDestroy, OnInit } from '@angular/core';
import { Disp} from '../disp.model';
import { DispServices } from '../disp.service';

@Component({
  selector:'app-cuh-disp',
  templateUrl:'./cuh-disp.component.html',
  styleUrls:['./cuh-disp.component.css']
})
export class CuhDispComponent implements OnInit, OnDestroy{
  listadoDispositivos:Disp[]=[];

  constructor(public dispService: DispServices){

  }

  ngOnInit(): void {
    //this.listadoDispositivos=this.dispService.getAll();
    this.dispService.getAll()
      .subscribe(r=>{
        this.listadoDispositivos=r;
      });
  }
  ngOnDestroy(){

  }
  onDispCreado(){
    //Actualizar el listado
    this.dispService.getAll()
      .subscribe(r=>{
        this.listadoDispositivos=r;
      });
  }
}
