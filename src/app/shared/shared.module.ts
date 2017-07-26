import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';

// components
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { FooterComponent } from './footer/footer.component';
import { MainPrincipalComponent } from './main-principal/main-principal.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CollapseModule
        ],
    declarations: [
        MenuSuperiorComponent,
        FooterComponent,
        MainPrincipalComponent
        ],
    exports: [
        MenuSuperiorComponent,
        FooterComponent,
        MainPrincipalComponent
        ]
})
export class SharedModule { }
