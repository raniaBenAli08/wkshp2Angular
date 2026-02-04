import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css'],
})
export class SuggestionDetailsComponent implements OnInit {
  suggestionId: string | null = null;

  suggestionDetails: any = {
    title: '',
    description: '',
    date: '',
    status: '',
    category: '',
    likes: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.suggestionId = params.get('id');
      this.loadSuggestionDetails();
    });
  }

  loadSuggestionDetails(): void {
    if (this.suggestionId) {
      const suggestionsData = {
        '1': {
          title: 'Organiser une journée team building',
          description:
            "Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l'équipe.",
          date: '20/01/2025',
          status: 'acceptee',
          category: 'Événements',
          likes: 10,
        },
        '2': {
          title: 'Améliorer le système de réservation',
          description:
            'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
          date: '15/01/2025',
          status: 'refusee',
          category: 'Technologie',
          likes: 0,
        },
        '3': {
          title: 'Créer un système de récompenses',
          description:
            "Mise en place d'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.",

            date: '25/01/2025',
          status: 'refusee',
          category: 'Ressources Humaines',
          likes: 0,
        },
        '4': {
          title: "Moderniser l'interface utilisateur",
          description:
            "Refonte complète de l'interface utilisateur pour une meilleure expérience utilisateur.",

            date: '30/01/2025',
          status: 'en_attente',
          category: 'Technologie',
          likes: 0,
        },
      };

      if (suggestionsData[this.suggestionId as keyof typeof suggestionsData]) {
        this.suggestionDetails =
          suggestionsData[this.suggestionId as keyof typeof suggestionsData];
      } else {
        // si id n existe pas
        this.suggestionDetails = {
          title: `Suggestion ${this.suggestionId}`,
          description: `Description détaillée de la suggestion ${this.suggestionId}`,
          date: new Date().toLocaleDateString(),
          status: 'en_attente',
          category: 'Général',
          likes: Math.floor(Math.random() * 20),
        };
      }
    }
  }

  getStatusText(): string {
    const statusMap: { [key: string]: string } = {
      acceptee: 'Acceptée',
      refusee: 'Refusée',
      en_attente: 'En attente',
    };
    return (
      statusMap[this.suggestionDetails.status] || this.suggestionDetails.status
    );
  }

  getStatusClass(): string {
    const classMap: { [key: string]: string } = {
      acceptee: 'status-accepted',
      refusee: 'status-rejected',
      en_attente: 'status-pending',
    };
    return classMap[this.suggestionDetails.status] || '';
  }

  getStatusBadge(): boolean {
    return !!this.suggestionDetails.status;
  }

  getCategory(): string {
    return this.suggestionDetails.category || '';
  }

  getLikes(): number {
    return this.suggestionDetails.likes ?? 0;
  }


}
