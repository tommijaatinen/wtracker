import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Athlete } from '../model/athlete';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

@Injectable()
export class AthleteService { 

    private baseUrl = 'http://localhost:3000'
    private url = this.baseUrl + '/athletes'
    private headers = new Headers({ 'Content-Type': 'application/json' })
    private options = new RequestOptions({ headers: this.headers })

    constructor(private http : Http) {}
    
    getAthletes() : Observable<Athlete[]> {
        return this.http
        .get(this.url)
        .map(r => this.mapAthletes(r))
    }

    getAthleteById(id) : Observable<Athlete> {
        return this.http
        .get(this.url + '/' + id)
        .map(r => r.json())
        .map(r => this.toAthlete(r))
    }
    
    addAthlete(athlete) : Observable<Response> {
        return this.http
             .post(this.url, JSON.stringify(athlete), this.options)
             .map(res => res.json())
    }

    updateAthlete(athlete) : Observable<Response> {
        return this.http
             .put(this.url + '/' + athlete.id, athlete)
             .map(res => res.json())
    }

    deleteAthlete(id) : Observable<Response> {
        return this.http
             .delete(this.url + '/' + id)
             .map(r => r.json())
    }
    
    private mapAthletes(response:Response): Athlete[] {
        return response.json().map(a => this.toAthlete(a))
    } 

    private toAthlete(r:any): Athlete {
        let athlete = new Athlete()
        athlete.id = r._id
        athlete.firstName = r.firstName
        athlete.lastName = r.lastName
        athlete.weight = r.weight
        athlete.gender = r.gender
        athlete.dateOfBirth = r.dateOfBirth
        return athlete
    }
}