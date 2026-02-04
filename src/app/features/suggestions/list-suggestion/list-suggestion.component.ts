import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Suggestion } from '../../../models/suggestion';

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
export class ListSuggestionComponent {
  searchText: string = '';
  favorites: Suggestion[] = [];

  suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description:
        "Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l'équipe.",
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10,
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description:
        'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0,
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description:
        "Mise en place d'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.",
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0,
    },
    {
      id: 4,
      title: "Moderniser l'interface utilisateur",
      description:
        "Refonte complète de l'interface utilisateur pour une meilleure expérience utilisateur.",
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0,
    },
  ];

  likeSuggestion(s: Suggestion): void {
    s.nbLikes++;
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
}
