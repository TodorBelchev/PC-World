import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MonitorsListComponent } from "./monitors-list/monitors-list.component";


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: MonitorsListComponent
            },
            // {
            //     path: ':id',
            //     component: DetailsComponent
            // },
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MonitorRoutingModule { }
