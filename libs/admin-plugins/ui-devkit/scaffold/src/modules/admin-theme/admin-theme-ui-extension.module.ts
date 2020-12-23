import { NgModule } from '@angular/core';
import { AdminThemeSharedModule } from './admin-theme-shared.module';
import { AppShellComponentCustom } from './components/app-shell/app-shell.component';
import { SharedModule, AppComponentModule} from '@vendure/admin-ui/core';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ChannelSwitcherComponent } from './components/channel-switcher/channel-switcher.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { NotificationComponent } from './components/notification/notification.component';
import { OverlayHostComponent } from './components/overlay-host/overlay-host.component';
import { UiLanguageSwitcherDialogComponent } from './components/ui-language-switcher-dialog/ui-language-switcher-dialog.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

@NgModule({
    imports: [SharedModule],
    exports: [AppShellComponentCustom],
    declarations: [
        AppShellComponentCustom,
        UserMenuComponent,
        MainNavComponent,
        BreadcrumbComponent,
        OverlayHostComponent,
        NotificationComponent,
        UiLanguageSwitcherDialogComponent,
        ChannelSwitcherComponent,
    ],
})
export class AdminThemeUiExtensionModule {}
