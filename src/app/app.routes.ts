import { Routes } from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'character',
        pathMatch: 'full'
    },
    {
        path: 'character',
        component: CharactersComponent
    },
    {
        path: `character/:id`,
        component: CharactersComponent

    },
    {
        path: 'episode',
        component: EpisodesComponent
    },
    {
        path: 'episode/:id',
        component: EpisodesComponent
    },
    {
        path: 'location',
        component: LocationsComponent
    },
    {
        path: 'location/:id',
        component: LocationsComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
