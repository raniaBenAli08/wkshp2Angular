import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../../core/services/suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css'],
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion: Suggestion | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const numericId = +id;
   this.suggestionService.getSuggestionById(numericId).subscribe({
     next: (data) => {
       console.log('Détails reçus:', data);
       this.suggestion = data; // ← data est directement l'objet Suggestion
     },
     error: (err) => console.error('Erreur chargement détail', err),
   });
      }
    });
  }

  getStatusText(): string {
    if (!this.suggestion) return '';
    const statusMap: { [key: string]: string } = {
      acceptee: 'Acceptée',
      refusee: 'Refusée',
      en_attente: 'En attente',
    };
    return statusMap[this.suggestion.status] || this.suggestion.status;
  }

  getStatusClass(): string {
    if (!this.suggestion) return '';
    const classMap: { [key: string]: string } = {
      acceptee: 'status-accepted',
      refusee: 'status-rejected',
      en_attente: 'status-pending',
    };
    return classMap[this.suggestion.status] || '';
  }

  getCategory(): string {
    return this.suggestion?.category || '';
  }

  getLikes(): number {
    return this.suggestion?.nbLikes ?? 0;
  }

  goBack(): void {
    this.router.navigate(['/suggestions']);
  }

}
