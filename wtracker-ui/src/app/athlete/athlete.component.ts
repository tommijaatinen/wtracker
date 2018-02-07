import { Component, OnInit, Injectable } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import * as fiLocale from 'date-fns/locale/fi';
import { AthleteService } from './athlete-service';
import { Athlete } from './athlete';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.css'],
})

@Injectable()
export class AthleteComponent implements OnInit {
        
    show = false;
    isUpdate = false;
    sortAsc = true;
    fieldName = "lastName";
    minDate = {year: 1950, month: 1, day: 1};
    genders = [ "Male", "Female"]
    dateOfBirth = null

    athlete:Athlete = new Athlete();
    athletes: Athlete[] = [];
    filteredAthletes: Athlete[] = [];
    athletesSubject  = new Subject();

    constructor(private athleteService: AthleteService) {
        this.athlete.dateOfBirth = new Date();
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
        
        let dob = new Date(this.dateOfBirth.year, this.dateOfBirth.month - 1, this.dateOfBirth.day + 1);

        if (!this.isUpdate) {
            athlete.value.dateOfBirth = dob;
            this.athleteService
                .addAthlete(athlete.value)
                .subscribe(r => {
                    this.athletesSubject.next();
                    this.toggle(false);
                })
        } else {
            this.athlete.dateOfBirth = dob;
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

    private isMatch(athlete, searchTerm) : Boolean {
        return athlete.firstName.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0
           || athlete.lastName.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0
           || athlete.gender.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0
           || athlete.weight.indexOf(searchTerm.toUpperCase()) >= 0
           || athlete.dateOfBirth.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0           
    }

}