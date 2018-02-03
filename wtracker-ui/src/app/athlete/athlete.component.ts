import { Component, OnInit, Injectable } from '@angular/core';
import { AthleteService } from './athlete-service';
import { Athlete } from './athlete';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.css'],
  providers: [AthleteService]
})

@Injectable()
export class AthleteComponent implements OnInit {
    show = false;
    isUpdate = false;
    sortAsc = true;
    fieldName = "lastName";

    genders = [
       {id: 0, value: "Male"},
       {id: 1, value: "Female"},
     ];

    athlete:Athlete = new Athlete();
    athletes: Athlete[] = [];
    filteredAthletes: Athlete[] = [];
    athletesSubject  = new Subject();

    constructor(private athleteService: AthleteService) {
        this.athletesSubject.subscribe(() => this.getAthletes());
    }

    ngOnInit() : void {
        this.getAthletes();
    }

    getAthletes() : void {
        this.athleteService
            .getAthletes()
            .subscribe(a => {
                this.athletes = a
                this.filteredAthletes = a
        });
    }

    onSubmit(athlete) : void {
        let gender = this.getGender(athlete)

        if (!this.isUpdate) {
            athlete.value.gender  = gender;
            this.athleteService
                .addAthlete(athlete.value)
                .subscribe(r => {
                    this.athletesSubject.next();
                    this.toggle(false);
                })
        } else {
            this.athlete.gender = gender;
            this.athleteService
                .updateAthlete(this.athlete)
                .subscribe(r => {
                    this.athletesSubject.next();
                    this.toggle(false);
            })
        }
    }

    onAdd() : void {
        this.athlete = new Athlete();
        this.show = true;
    }

    onUpdate(athlete) : void {
        this.athleteService
            .getAthleteById(athlete.id)
            .subscribe(r => {
                this.athlete = r;
                this.toggle(true);
        });
    }

    onDelete(id) : void {
        this.athleteService
            .deleteAthlete(id)
            .subscribe(r => this.athletesSubject.next());
    }

    onCancel() : void {
        this.athlete = new Athlete();
        this.toggle(false);
    }

    onSearchChange(searchTerm) {
       this.filteredAthletes = [];
       if (searchTerm != ''){
            this.athletes.forEach(a => {         
                if (this.isMatch(a, searchTerm)) {
                  this.filteredAthletes.push(a);
               }
            })
      } else {
         this.filteredAthletes = this.athletes;
      }
    }

    onSort(fieldName) {
        this.fieldName = fieldName;
        this.sortAsc = !this.sortAsc;
    }

    private toggle(value) : void {
        this.show = value;
        this.isUpdate = value;
    }

    private getGender(athlete) : String {
        return this.genders.filter(g => g.value === athlete.value.gender)[0].value
    }

    private isMatch(athlete, searchTerm) : Boolean {
        return athlete.firstName.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0
           || athlete.lastName.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0
           || athlete.gender.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0
    }

}