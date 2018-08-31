import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../_model/persona';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url: string = `${HOST}/personas`
  personaCambio = new Subject<Persona[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Persona[]>(this.url)
  }

  listarPorId(id: number){
    return this.http.get<Persona>(`${this.url}/${id}`)
  }

  registrar(per: Persona){
    return this.http.post<Persona>(this.url, per);
  }

  modificar(per: Persona){
    return this.http.put<Persona>(this.url, per);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
