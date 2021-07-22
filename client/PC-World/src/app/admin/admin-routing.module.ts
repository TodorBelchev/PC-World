import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateNotebookComponent } from "../notebook/create-notebook/create-notebook.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditOrdersComponent } from "./edit-orders/edit-orders.component";
import { OrdersComponent } from "./orders/orders.component";


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
    },
    {
        path: 'dashboard', component: DashboardComponent, children: [
            {
                path: 'notebooks/create',
                component: CreateNotebookComponent
            },
            {
                path: 'orders',
                component: OrdersComponent
            },
            {
                path: 'orders/:id/edit',
                component: EditOrdersComponent
            },
        ]
    },

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
