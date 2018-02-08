import { 
    TestBed, 
    ComponentFixture, 
    ComponentFixtureAutoDetect, 
    async,
    fakeAsync} from '@angular/core/testing';

import { DebugElement }    from '@angular/core';
import { WodComponent } from './wod.component';
import { SortPipe } from '../sort-pipe';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { WodService } from './wod-service';
import { WodServiceMock } from './wod-service-mock';
 
describe('WodComponent', () => {
 
    let component: WodComponent;
    let fixture: ComponentFixture<WodComponent>;
    let debug: DebugElement;    
    let element: HTMLElement;
    let wodService;
 
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ WodComponent, SortPipe ],
        providers: [ 
            { provide: WodService, useClass: WodServiceMock},
            { provide: ComponentFixtureAutoDetect, useValue: true }
        ],
        imports: [ HttpModule, FormsModule], 
      })
      .compileComponents(); 
    }));

    beforeEach(()=> {
        fixture = TestBed.createComponent(WodComponent);
        component = fixture.componentInstance;
        debug = fixture.debugElement.query(By.css('.row'));
        element  = debug.nativeElement;
        wodService = TestBed.get(WodService);
    });
    
    it('should render the component',()=> {
        expect(component).toBeDefined();
    });

    it('should have a title', () => {
        component.title = 'Workouts';
        expect(element.textContent).toContain(component.title);
    })

    it('should have an add new workout button', () => {
        expect(element.innerHTML).toContain("Add new workout")
    });

    it('should have sort link for name, description and type columns', () => {
        let links  = fixture.nativeElement.querySelectorAll('th.clickable')
        expect(links.length).toEqual(3)
    });

    it('should have list of workouts', () => {
        expect(component.wods.length).toEqual(2);
        expect(element.innerHTML).toContain('wod_1')  
        expect(element.innerHTML).toContain('wod_2')  
    }); 

    it('should have edit link for each workout', () => {
        let links = fixture.nativeElement.querySelectorAll('a#edit')
        expect(links.length).toEqual(component.wods.length)
    });

    it('should have remove link for each workout', () => {
        let links = fixture.nativeElement.querySelectorAll('a#remove')
        expect(links.length).toEqual(component.wods.length)
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

