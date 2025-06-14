import { Component, input, output } from "@angular/core";
import { IconComponent } from "../../../shared/components/icon/icon.component";
import { NoResults } from "../../../shared/models/no-results";
import { Translation } from "../../../shared/models/translation";
import { TranslationLanguage } from "../../../shared/models/translation-language";
import { TranslationsTableItemComponent } from "./item/translations-table-item.component";


@Component({
    selector: "app-translations-table",
    templateUrl: "./translations-table.component.html",
    styleUrl: "./translations-table.component.scss",
    imports: [TranslationsTableItemComponent, IconComponent]
})
export class TranslationsTableComponent {
    languages = input.required<TranslationLanguage[]>();
    translations = input.required<Translation[]>()
    loading = input(false);
    noResults = input<NoResults>({
        label: "Sem resultados"
    })

    edit = output<{ translation: Translation, language: TranslationLanguage }>();
    reset = output<{ path: string, language: string }>();
    remove = output<string>();
    revertTranslation = output<string>();
}
