import { Component } from '@angular/core';
import { RickAndMortyService } from '../../service/rick-and-morty.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css',
})
export class EpisodesComponent {

  constructor(
    private service: RickAndMortyService,
    private activatedRoute : ActivatedRoute
  ) {}

  nextUrl = '';
  previousUrl = '';
  episodes: any[] = [];
  epId!: number
  episode: any

  form = new FormGroup({
    name: new FormControl(''),
    episode: new FormControl('')
  })


  ngOnInit() {
    this.epId = +this.activatedRoute.snapshot.params['id']
    if (this.epId) {
      this.getEpisode()
      return
    } else {
      this.getEpisodes();
    }
    
  }

  getEpisodes(filter?: any) {
    this.service.getEpisodes(filter).subscribe({
      next: (response) => {
        this.episodes = response.results;
        this.nextUrl = response.info.next;
        console.log(response)
      },
      error: (err) => {
        console.error('Erro ao carregar os episódios', err);
      },
    });
  }

  getEpisode(){
    this.service.getEpisode(this.epId).subscribe({
      next: (response) => {
        this.episode = response
      },
      error : (err) => {
        console.error('Erro ao carregar o episódio.', err)
      }
    })
  }

  anotherPage(page: string) {
    this.service.getNextPage(page).subscribe({
      next: (response) => {
        this.episodes = response.results
        this.nextUrl = response.info.next
        this.previousUrl = response.info.prev
        console.log(response)
      },
      error: (err) => {
        console.error('Erro ao acessar página', err)
      }
    });
  }
}
