import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailsComponent } from "./details/details.component";
import { NotebooksListComponent } from "./notebooks-list/notebooks-list.component";


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: NotebooksListComponent
            },
            {
                path: ':id',
                component: DetailsComponent
            },
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotebookRoutingModule { }
