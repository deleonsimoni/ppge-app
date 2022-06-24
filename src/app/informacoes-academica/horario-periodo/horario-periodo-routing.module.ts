import { RouterModule, Routes } from "@angular/router";
import { HorarioPeriodoComponent } from "./horario-periodo.component";

const routes: Routes = [
    {
        path: '',
        component: HorarioPeriodoComponent,
    },
];

export const HorarioPeriodoRoutingModule = RouterModule.forChild(routes);