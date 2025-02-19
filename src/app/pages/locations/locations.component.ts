import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RickAndMortyService } from '../../service/rick-and-morty.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsComponent {
 
  constructor(
    private service: RickAndMortyService,
    private activatedRoute : ActivatedRoute
  ) {}

  locations: any[] = [];
  nextUrl = '';
  previousUrl = '';
  location: any
  locationId!: number

  form = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    dimension: new FormControl('')
  })


  ngOnInit() {
    this.locationId = +this.activatedRoute.snapshot.params['id']
    if(this.locationId){
      this.getLocation()
      return
    } else
    this.getLocations();
  }

  getLocations(filter?: any) {
    this.service.getLocations(filter).subscribe({
      next: (response) => {
        response.results = response.results.map((result: any) => {
          return {
            ...result,
            residents: result.residents.map((resident: string) => `https://rickandmortyapi.com/api/character/avatar/${resident.split('/').pop()}.jpeg`.replace('.jpeg.jpeg', '.jpeg'))
          }
        })
        this.locations = response.results;

        this.nextUrl = response.info.next;
      },
      error: (err) => {
        console.error('Erro ao carregar os locais:', err);
      },
    });
  }

  getLocation(){
    this.service.getLocation(this.locationId).subscribe({
      next : (response) => {
        this.location = response
        console.log(response)
      },
      error : (err) => {
        console.error('Erro ao carregar locações', err)
      }
    })
  }


  anotherPage(page: string) {
    this.service.getNextPage(page).subscribe({
      next: (response) => {
        response.results = response.results.map((result: any) => {
          return {
            ...result,
            residents: result.residents.map((resident: string) => `https://rickandmortyapi.com/api/character/avatar/${resident.split('/').pop()}.jpeg`.replace('.jpeg.jpeg', '.jpeg'))
          }
        })
        this.locations = response.results;
        this.previousUrl = response.info.prev
        this.nextUrl = response.info.next;
        console.log(response);
      },
      error: (err) => {
        console.error('Erro ao carregar os locais:', err);
      },
    });
  }

}
