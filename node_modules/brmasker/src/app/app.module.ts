import { MaskerModule } from './components/masker/masker.module';
import { NgModule, ModuleWithProviders } from '@angular/core';


@NgModule({
    imports: [
        MaskerModule
    ],
    exports: [
        MaskerModule
    ]
})

export class AppMaskerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MaskerModule
        };
    }
}
