import { RouterModule, Routes } from "@angular/router";
import { ProcessoSeletivoComponent } from "./processo-seletivo.component";

const routes: Routes = [
    {
        path: '',
        component: ProcessoSeletivoComponent,
    },
];

export const ProcessoSeletivoRoutingModule = RouterModule.forChild(routes);