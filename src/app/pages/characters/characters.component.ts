import { Component } from '@angular/core';
import { RickAndMortyService } from '../../service/rick-and-morty.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent {
  charactersData: any[] = [];

  constructor(
    private service: RickAndMortyService,
    private activatedRoute : ActivatedRoute
  ) {}

  nextUrl: string = '';
  previousUrl: string = '';
  characterId!: number
  character: any

  statusList: string[] = ['Alive', 'Dead', 'Unknown'];
  genderList: string[] = ['Female', 'Male', 'Genderless', 'Unknown'];

  form = new FormGroup({
    name: new FormControl(''),
    status: new FormControl(''),
    species: new FormControl(''),
    gender: new FormControl(''),
  });

  ngOnInit() {
    this.characterId = +this.activatedRoute.snapshot.params['id']
    if (this.characterId) {
      this.getCharacter()
      return
    } else {
      this.getCharacters();
    }
  }

  getCharacters(filter?: any) {
    this.service.getCharacters(filter).subscribe({
      next: (response) => {
        this.charactersData = response.results;
        this.nextUrl = response.info.next;
      },
      error: (err) => {
        console.error('Erro ao carregar dados:', err);
      },
    });
  }

  getCharacter(){
    this.service.getCharacter(this.characterId).subscribe({
      next: (response) => {
        this.character = response
        console.log(this.character)
        console.log(response)
      },
      error : (err) => {
        console.error('Erro ao carregar personagem', err)
      }
    })
  }


  anotherPage(page: string) {
    this.service.getNextPage(page).subscribe({
      next: (response) => {
        this.charactersData = response.results;
        this.nextUrl = response.info.next;
        this.previousUrl = response.info.prev;
        console.log(response);
      },

      error: (err) => {
        console.error('Erro ao carregar dados:', err);
      },
    });
  }
}