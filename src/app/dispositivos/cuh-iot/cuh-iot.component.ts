import { Component, OnInit } from '@angular/core';
import { Disp} from '../disp.model';
import { DispServices } from '../disp.service';

@Component({
  selector:'app-cuh-iot',
  templateUrl:'./cuh-iot.component.html',
  styleUrls:['./cuh-iot.component.css']
})
export class CuhIotComponent implements OnInit{
  listadoDispositivos:Disp[]=[];

  constructor(public dispService: DispServices){

  }

  ngOnInit(): void {
    this.dispService.getAll().subscribe(r=>{
      this.listadoDispositivos=r;
    });
  }
}
