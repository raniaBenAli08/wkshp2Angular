import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';


@NgModule({
  declarations: [
    SuggestionsComponent,
    SuggestionDetailsComponent,
    ListSuggestionComponent,
  ],
  imports: [CommonModule, FormsModule, SuggestionsRoutingModule],
})
export class SuggestionsModule {}
