// { path: 'components/:part/:id/edit', component: CreateComponent },

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PartsListComponent } from "./parts-list/parts-list.component";
import { PartsComponent } from "./parts/parts.component";



const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: PartsComponent
            },
            {
                path: 'processors',
                component: PartsListComponent
            },
            {
                path: 'cases',
                component: PartsListComponent
            },
            {
                path: 'coolers',
                component: PartsListComponent
            },
            {
                path: 'hdds',
                component: PartsListComponent
            },
            {
                path: 'ssds',
                component: PartsListComponent
            },
            {
                path: 'memories',
                component: PartsListComponent
            },
            {
                path: 'motherboards',
                component: PartsListComponent
            },
            {
                path: 'psus',
                component: PartsListComponent
            },
            {
                path: 'vgas',
                component: PartsListComponent
            }
        ]
    },

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartsRoutingModule { }
