import { 
    TestBed, 
    ComponentFixture, 
    ComponentFixtureAutoDetect, 
    async,
    fakeAsync} from '@angular/core/testing';

import { DebugElement }    from '@angular/core';
import { AthleteComponent } from './athlete.component';
import { SortPipe } from '../sort-pipe';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AthleteService } from './athlete-service';
import { AthleteServiceMock } from './athlete-service-mock';
 
describe('AthleteComponent', () => {
 
    let component: AthleteComponent;
    let fixture: ComponentFixture<AthleteComponent>;
    let debug: DebugElement;    
    let element: HTMLElement;
    let athleteService;
 
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ AthleteComponent, SortPipe ],
        providers: [ 
            { provide: AthleteService, useClass: AthleteServiceMock},
            { provide: ComponentFixtureAutoDetect, useValue: true }
        ],
        imports: [ HttpModule, FormsModule, NgbModule.forRoot()], 
      })
      .compileComponents(); 
    }));

    beforeEach(()=> {
        fixture = TestBed.createComponent(AthleteComponent);
        component = fixture.componentInstance;
        debug = fixture.debugElement.query(By.css('.row'));
        element  = debug.nativeElement;
        athleteService = TestBed.get(AthleteService);
    });
    
    it('should render the component',()=> {
        expect(component).toBeDefined();
    });

    it('should have an add Athlete button', () => {
        expect(element.innerHTML).toContain("Add Athlete")
    });

    it('should have sort link for first name, last name, gender, weight and age columns', () => {
        let links  = fixture.nativeElement.querySelectorAll('th.clickable')
        expect(links.length).toEqual(5)
    });

    it('should have list of athletes', () => {
        expect(component.athletes.length).toEqual(3);
        expect(element.innerHTML).toContain('firstName_1')  
        expect(element.innerHTML).toContain('firstName_2')  
        expect(element.innerHTML).toContain('firstName_3')  
    }); 

    it('should calculate age of each athlete', () => {
        let ages = fixture.nativeElement.querySelectorAll('td#age')
        expect(ages[0].innerHTML).toContain('0')  
    }); 

    it('should have edit link for each athlete', () => {
        let links = fixture.nativeElement.querySelectorAll('a#edit')
        expect(links.length).toEqual(component.athletes.length)
    });

    it('should have remove link for each athlete', () => {
        let links = fixture.nativeElement.querySelectorAll('a#remove')
        expect(links.length).toEqual(component.athletes.length)
    });

    it('should call onAdd() when add button is clicked', fakeAsync(() => {
        let spy = spyOn(component, 'onAdd').and.callThrough();
        let button = fixture.debugElement.nativeElement.querySelector('#add');

        expect(component.show).toBeFalsy();
        button.click();
        expect(component.show).toBeTruthy();

        fixture.whenStable().then(() => {
            expect(component.onAdd).toHaveBeenCalled();
        })
    }))

    it('should call onUpdate() when edit button is clicked', fakeAsync(() => {
        let spy = spyOn(component, 'onUpdate').and.callThrough();
        let link = fixture.nativeElement.querySelectorAll('a#edit')[0]

        expect(component.isUpdate).toBeFalsy();
        link.click();
        expect(component.isUpdate).toBeTruthy();

        fixture.whenStable().then(() => {
            expect(component.onUpdate).toHaveBeenCalled();
        })
    }))

    it('should call onDelete() when add button is clicked', fakeAsync(() => {
        let spy = spyOn(component, 'onDelete').and.callThrough();
        let link = fixture.nativeElement.querySelectorAll('a#remove')[0]
        link.click();

        fixture.whenStable().then(() => {
            expect(component.onDelete).toHaveBeenCalled();
        })
    }))

})

