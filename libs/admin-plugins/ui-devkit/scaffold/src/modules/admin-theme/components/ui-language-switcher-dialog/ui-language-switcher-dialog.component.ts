import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LanguageCode,Dialog } from '@vendure/admin-ui/core';

@Component({
    selector: 'vdr-ui-language-switcher',
    templateUrl: './ui-language-switcher-dialog.component.html',
    styleUrls: ['./ui-language-switcher-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLanguageSwitcherDialogComponent implements Dialog<LanguageCode> {
    resolveWith: (result?: LanguageCode) => void;
    currentLanguage: LanguageCode;
    availableLanguages: LanguageCode[] = [];

    setLanguage(languageCode: LanguageCode) {
        this.resolveWith(languageCode);
    }
}
