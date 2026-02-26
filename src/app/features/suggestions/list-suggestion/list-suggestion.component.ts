import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
  ],
})
export class ListSuggestionComponent implements OnInit {
  searchText: string = '';
  favorites: Suggestion[] = [];
  suggestions: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getSuggestionsList().subscribe({
      next: (data) => {
        this.suggestions = data;
      },
      error: (err) => console.error('Erreur chargement suggestions', err),
    });
  }

  likeSuggestion(s: Suggestion): void {
    s.nbLikes++;

    this.suggestionService.updateSuggestion(s.id, s).subscribe({
      next: () => console.log('Like mis à jour'),
      error: (err) => {
        console.error('Erreur mise à jour like', err);
        s.nbLikes--;
      },
    });
  }

  addToFavorites(s: Suggestion): void {
    if (!this.favorites.includes(s)) {
      this.favorites.push(s);
    }
  }

  removeFromFavorites(s: Suggestion): void {
    const index = this.favorites.indexOf(s);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  filteredSuggestions(): Suggestion[] {
    return this.suggestions.filter(
      (s) =>
        s.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.category.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  formatStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      acceptee: 'Acceptée',
      refusee: 'Refusée',
      en_attente: 'En attente',
    };
    return statusMap[status] || status;
  }
  deleteSuggestion(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette suggestion ?')) {
      this.suggestionService.deleteSuggestion(id).subscribe({
        next: () => {
          this.suggestions = this.suggestions.filter((s) => s.id !== id);
          this.favorites = this.favorites.filter((s) => s.id !== id);
        },
        error: (err) => console.error('Erreur suppression', err),
      });
    }
  }
}
