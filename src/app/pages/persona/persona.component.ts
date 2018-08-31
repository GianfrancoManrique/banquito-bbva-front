import { PersonaService } from './../../_service/persona.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Persona } from '../../_model/persona';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  displayedColumns = ['id', 'nombres', 'apellidos', 'pais', 'edad', 'acciones'];
  dataSource: MatTableDataSource<Persona>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private personaService : PersonaService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.personaService.personaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.personaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      })
    });

    this.personaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(valor : string){
    valor = valor.trim();
    valor = valor.toLocaleLowerCase();
    this.dataSource.filter = valor;
  }

  eliminar(persona: Persona): void {
    this.personaService.eliminar(persona.id).subscribe(data => {
      if (data === 1) {
        this.personaService.listar().subscribe(data => {
          this.personaService.personaCambio.next(data);
          this.personaService.mensajeCambio.next("Se eliminó");
        });
      }
    });
  }
}
