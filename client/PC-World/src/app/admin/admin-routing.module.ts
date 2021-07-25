import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateMonitorComponent } from "../monitor/create-monitor/create-monitor.component";
import { CreateNotebookComponent } from "../notebook/create-notebook/create-notebook.component";
import { CreateComponent } from "../parts/create/create.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditOrdersComponent } from "./edit-orders/edit-orders.component";
import { OrdersComponent } from "./orders/orders.component";
import { ProductsComponent } from "./products/products.component";
import { PromotionsComponent } from "./promotions/promotions.component";


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
                path: 'monitors/create',
                component: CreateMonitorComponent
            },
            {
                path: 'parts/create',
                component: CreateComponent
            },
            {
                path: 'promotions',
                component: PromotionsComponent
            },
            {
                path: 'edit-products',
                component: ProductsComponent
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
