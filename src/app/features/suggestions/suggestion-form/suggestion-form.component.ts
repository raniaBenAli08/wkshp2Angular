import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css'],
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre',
  ];

  private static nextId = 5;
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.suggestionForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[A-Z][a-zA-Z]*$'),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: this.getCurrentDate(), disabled: true }],
      status: [{ value: 'en attente', disabled: true }],
    });
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.getRawValue();

      const newSuggestion: Suggestion = {
        id: SuggestionFormComponent.nextId++,
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        date: new Date(),
        status: 'en attente',
        nbLikes: 0,
      };

      console.log('Nouvelle suggestion ajoutée:', newSuggestion);

      this.router.navigate(['/suggestions']);
    }
  }

  get title() {
    return this.suggestionForm.get('title');
  }
  get description() {
    return this.suggestionForm.get('description');
  }
  get category() {
    return this.suggestionForm.get('category');
  }
  getInvalidFieldsCount(): number {
    let count = 0;
    if (this.title?.invalid) count++;
    if (this.description?.invalid) count++;
    if (this.category?.invalid) count++;
    return count;
  }
}
