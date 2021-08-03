import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guards/auth.guard";
import { CartComponent } from "./cart/cart.component";
import { OrdersListComponent } from "./orders-list/orders-list.component";
import { ProfileComponent } from "./profile/profile.component";
import { WarrantiesComponent } from "./warranties/warranties.component";
import { WishlistComponent } from "./wishlist/wishlist.component";


const routes: Routes = [
    {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'wishlist',
                pathMatch: 'full',
                component: WishlistComponent
            },
            {
                path: 'cart',
                pathMatch: 'full',
                component: CartComponent
            },
            {
                path: ':id',
                component: ProfileComponent
            },
            {
                path: ':id/orders',
                component: OrdersListComponent
            },
            {
                path: ':id/warranties',
                component: WarrantiesComponent
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
