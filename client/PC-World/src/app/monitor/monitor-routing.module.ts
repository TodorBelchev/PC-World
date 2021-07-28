import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MonitorDetailsComponent } from "./monitor-details/monitor-details.component";
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
            {
                path: ':id',
                component: MonitorDetailsComponent
            },
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MonitorRoutingModule { }
