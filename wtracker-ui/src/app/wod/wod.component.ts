import { Component, OnInit, Injectable } from '@angular/core';
import { WodService } from './wod-service';
import { Wod } from './wod';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './wod.component.html',
  styleUrls: ['./wod.component.css'],
})

@Injectable()
export class WodComponent implements OnInit {
    title = 'WOD Tracker';
    show = false;
    isUpdate = false;
    sortAsc = true;
    fieldName = "name";

    wodTypes = [
       {id: 0, name: "Bodyweight"},
       {id: 1, name: "Kettlebell"},
       {id: 2, name: "Crosstraining"}
     ];

    wod: Wod = new Wod();
    wods: Wod[] = [];
    filteredWods: Wod[] = [];
    wodsSubject  = new Subject();

    constructor(private wodService: WodService) {
        this.wodsSubject.subscribe(() => this.getWods());
    }

    ngOnInit() : void {
        this.getWods();
    }

    getWods() : void {
        this.wodService
            .getWods()
            .subscribe(w => {
                this.wods = w
                this.filteredWods = w
        });
    }

    onSubmit(wod) : void {
        let wodType = this.getWodType(wod)

        if (!this.isUpdate) {
            wod.value.type  = wodType;
            this.wodService
                .addWod(wod.value)
                .subscribe(r => {
                    this.wodsSubject.next();
                    this.toggle(false);
                })
        } else {
            this.wod.type = wodType;
            this.wodService
                .updateWod(this.wod)
                .subscribe(r => {
                    this.wodsSubject.next();
                    this.toggle(false);
            })
        }
    }

    onAdd() : void {
        this.wod = new Wod();
        this.show = true;
    }

    onUpdate(wod) : void {
        this.wodService
            .getWodById(wod.id)
            .subscribe(r => {
                this.wod = r;
                this.toggle(true);
        });
    }

    onDelete(id) : void {
        this.wodService
            .deleteWod(id)
            .subscribe(r => this.wodsSubject.next());
    }

    onCancel() : void {
        this.wod = new Wod();
        this.toggle(false);
    }

    onSearchChange(searchTerm) {
       this.filteredWods = [];
       if (searchTerm != ''){
            this.wods.forEach(w => {         
                if (this.isMatch(w, searchTerm)) {
                  this.filteredWods.push(w);
               }
            })
      } else {
         this.filteredWods = this.wods;
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

    private getWodType(wod) : String {
        return this.wodTypes.filter(t => t.name === wod.value.type)[0].name
    }

    private isMatch(wod, searchTerm) : Boolean {
        return wod.name.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0
           || wod.description.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0
           || wod.type.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0;        
    }

}