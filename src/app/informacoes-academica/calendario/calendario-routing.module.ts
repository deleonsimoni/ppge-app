import { RouterModule, Routes } from "@angular/router";
import { CalendarioComponent } from "./calendario.component";

const routes: Routes = [
    {
        path: '', 
        component: CalendarioComponent,
    },
];

export const CalendarioRoutingModule = RouterModule.forChild(routes);