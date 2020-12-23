import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LanguageCode } from '@vendure/admin-ui/core';

@Component({
    selector: 'vdr-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
    @Input() userName = '';
    @Input() availableLanguages: LanguageCode[] = [];
    @Input() uiLanguage: LanguageCode;
    @Output() logOut = new EventEmitter<void>();
    @Output() selectUiLanguage = new EventEmitter<void>();
}
