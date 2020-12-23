import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminThemeUiExtensionModule } from './modules/admin-theme/admin-theme-ui-extension.module';

@NgModule({
    imports: [CommonModule,AdminThemeUiExtensionModule],
})
export class SharedExtensionsModule {}
