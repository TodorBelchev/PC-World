import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PartDetailsComponent } from "./part-details/part-details.component";
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
                path: 'processors/:id',
                component: PartDetailsComponent
            },
            {
                path: 'cases',
                component: PartsListComponent
            },
            {
                path: 'cases/:id',
                component: PartDetailsComponent
            },
            {
                path: 'coolers',
                component: PartsListComponent
            },
            {
                path: 'coolers/:id',
                component: PartDetailsComponent
            },
            {
                path: 'hdds',
                component: PartsListComponent
            },
            {
                path: 'hdds/:id',
                component: PartDetailsComponent
            },
            {
                path: 'ssds',
                component: PartsListComponent
            },
            {
                path: 'ssds/:id',
                component: PartDetailsComponent
            },
            {
                path: 'memories',
                component: PartsListComponent
            },
            {
                path: 'memories/:id',
                component: PartDetailsComponent
            },
            {
                path: 'motherboards',
                component: PartsListComponent
            },
            {
                path: 'motherboards/:id',
                component: PartDetailsComponent
            },
            {
                path: 'psus',
                component: PartsListComponent
            },
            {
                path: 'psus/:id',
                component: PartDetailsComponent
            },
            {
                path: 'vgas',
                component: PartsListComponent
            },
            {
                path: 'vgas/:id',
                component: PartDetailsComponent
            }
        ]
    },

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartsRoutingModule { }
