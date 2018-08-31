import { PersonaEdicionComponent } from './pages/persona/persona-edicion/persona-edicion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaComponent } from './pages/persona/persona.component';
import { MascotaComponent } from './pages/mascota/mascota.component';

const routes: Routes = [
  {
    path : 'persona', component: PersonaComponent, children: [
      { path: 'nuevo', component: PersonaEdicionComponent},
      { path: 'editar/:id', component: PersonaEdicionComponent}
    ]
  },
  {
    path : 'mascota', component: MascotaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
