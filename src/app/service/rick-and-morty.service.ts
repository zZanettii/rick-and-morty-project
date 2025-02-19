import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(filter: any): Observable<any> {
    let params = new HttpParams()
    if(filter?.name){
      params = params.append('name', filter.name)
    }
    if(filter?.status){
      params = params.append('status', filter.status)
    }
    if(filter?.species){
      params = params.append('species', filter.species)
    }
    if(filter?.gender){
      params = params.append('gender', filter.gender)
    }


    return this.http.get<any>(`${this.apiUrl}/character`, { params });
  }


  getCharacter(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/character/${id}`);
  }

  getNextPage(url : string): Observable<any>{
    return this.http.get<any>(url)
  }

  getLocations(filter: any): Observable<any>{
    let params = new HttpParams()
    if(filter?.name){
      params = params.append('name', filter.name)
    }
    if(filter?.type){
      params = params.append('type', filter.type)
    }
    if(filter?.dimension){
      params = params.append('dimension', filter.dimension)
    }
    return this.http.get<any>(`${this.apiUrl}/location`, {params})
  }

  getLocation(id : number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/location/${id}`)
  }

  getEpisodes(filter: any): Observable<any>{
    let params = new HttpParams()
    if (filter?.name){
      params = params.append('name', filter.name)
    }
    if(filter?.episode){
      params = params.append('episode', filter.episode)
    }
    return this.http.get<any>(`${this.apiUrl}/episode`, { params })
  }

  getEpisode(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/episode/${id}`)
  }


}
