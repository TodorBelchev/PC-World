import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateMonitorComponent } from "./create-monitor/create-monitor.component";
import { CreateNotebookComponent } from "./create-notebook/create-notebook.component";
import { CreateComponent } from "./create/create.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";
import { ProductsComponent } from "./products/products.component";
import { PromotionsComponent } from "./promotions/promotions.component";
import { StatisticsComponent } from "./statistics/statistics.component";


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'statistics'
    },
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'statistics',
                component: StatisticsComponent
            },
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
                path: 'edit-products/notebooks/:id',
                component: CreateNotebookComponent
            },
            {
                path: 'admin-orders',
                component: AdminOrdersComponent
            },
        ]
    },

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
