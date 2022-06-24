import { RouterModule, Routes } from "@angular/router";
import { NormaPosGraduacaoComponent } from "./normas-pos-graduacao.component";

const routes: Routes = [
    {
        path: '',
        component: NormaPosGraduacaoComponent,
    },
];

export const NormaPosGraduacaoRoutingModule = RouterModule.forChild(routes);