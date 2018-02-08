import { Component, OnInit, Injectable } from '@angular/core';
import * as fiLocale from 'date-fns/locale/fi';
import { AthleteService } from './athlete-service';
import { Athlete } from './athlete';
import { Subject } from 'rxjs/Subject';
import { AgeFromDateString, AgeFromDate } from 'age-calculator';
import { FilteringComponent } from '../filtering-component';

@Component({
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.css'],
})

@Injectable()
export class AthleteComponent extends FilteringComponent implements OnInit {
        
    show = false;
    isUpdate = false;
    sortAsc = true;
    fieldName = "lastName";
    genders = [ "Male", "Female"]
    minDate = {year: 1900, month: 1, day: 1};
    dateOfBirth = null

    athlete:Athlete = new Athlete();
    athletes: Athlete[] = [];
    filteredAthletes: Athlete[] = [];
    athletesSubject  = new Subject();

    constructor(private athleteService: AthleteService) {
        super();
        this.athlete.dateOfBirth = new Date();
        this.athletesSubject.subscribe(() => this.getAthletes());
    }

    ngOnInit() : void {
        this.getAthletes();
    }

    getAthletes() : void {
        this.athleteService
            .getAthletes()
            .subscribe(athletes => {
                this.calculateAges(athletes)
                this.athletes = athletes
                this.filteredAthletes = athletes
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
        this.dateOfBirth = null;
    }

    onUpdate(athlete) : void {
        this.athleteService
            .getAthleteById(athlete.id)
            .subscribe(a => {
                this.athlete = a;
                this.setDatePickerModelValue(a.dateOfBirth)
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

    private calculateAges(athletes) : Athlete[] {
        return athletes.map(a =>  {
           a.age = this.calculateAge(a.dateOfBirth); 
        });
    }

    private calculateAge(dob) : Number { return new AgeFromDateString(dob).age };

    private setDatePickerModelValue(dateOfBirth) : void {
        let date = new Date(dateOfBirth);                
        this.dateOfBirth = {
            year: date.getFullYear(), 
            month: date.getMonth() + 1, 
            day: date.getDate() - 1
        }
    }
 }