import { NgModule } from '@angular/core';
import { SharedModule, CoreModule } from '@vendure/admin-ui/core';

@NgModule({
    imports: [SharedModule ,CoreModule],
    declarations: [],
    exports: [SharedModule, CoreModule],
})
export class AdminThemeSharedModule {}
