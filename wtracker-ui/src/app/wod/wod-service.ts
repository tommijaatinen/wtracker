import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import { Wod } from '../model/wod';

@Injectable()
export class WodService { 

    private baseUrl = 'http://localhost:3000'
    private url = this.baseUrl + '/wods'
    private headers = new Headers({ 'Content-Type': 'application/json' })
    private options = new RequestOptions({ headers: this.headers })

    constructor(private http : Http) {}
    
    getWods() : Observable<Wod[]> {
        return this.http
        .get(this.url)
        .map(r => this.mapWods(r))
    }

    getWodById(id) : Observable<Wod> {
        return this.http
        .get(this.url + '/' + id)
        .map(r => r.json())
        .map(r => this.toWod(r))
    }
    
    addWod(wod) : Observable<Response> {
        return this.http
             .post(this.url, JSON.stringify(wod), this.options)
             .map(res => res.json())
    }

    updateWod(wod) : Observable<Response> {
        return this.http
             .put(this.url + '/' + wod.id, wod)
             .map(res => res.json())
    }

    deleteWod(id) : Observable<Response> {
        return this.http
             .delete(this.url + '/' + id)
             .map(r => r.json())
    }
    
    private mapWods(response:Response): Wod[] {
        return response.json().map(w => this.toWod(w))
    } 

    private toWod(r:any): Wod {
        let wod = new Wod()
        wod.id = r._id
        wod.name = r.name
        wod.description = r.description
        wod.type = r.type
        return wod
    }
}