import { TestBed, ComponentFixture, fakeAsync, tick } from "@angular/core/testing"
import { Location } from '@angular/common';
import { HeroDetailComponent } from './hero-detail.component'
import { HeroService } from "../hero.service";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { of } from "rxjs";

describe('hero-detail component', () => {
    let fixture: ComponentFixture<HeroDetailComponent>
    let heroDetailComponent:HeroDetailComponent
    let mockActivateRoute
    let mockHeroService
    let mockLocation

    beforeEach(() => {
        mockActivateRoute = {
            snapshot: { paramMap: { get() { return '3'} } }
        }
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero'])
        mockLocation = jasmine.createSpyObj(['back'])
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivateRoute },
                { provide: HeroService, useValue: mockHeroService },
                { provide: Location, useValue: mockLocation }

            ]
        })
        fixture = TestBed.createComponent(HeroDetailComponent)
        heroDetailComponent = fixture.componentInstance
    })

    it('Si en la url me llega el id 3 recupero el heroe', () => {
        // mockActivateRoute returns id '3'
        const hero_Id3 = { id: 3, name: 'Heroe 3', strength: 300 }
        mockHeroService.getHero.and.returnValue(of(hero_Id3))

        fixture.detectChanges()

        // console.log('mockActivateRoute: ', mockActivateRoute.snapshot.paramMap.get())
        expect(heroDetailComponent.hero).toEqual(hero_Id3)
    })

    it('should call updateHero when save is called', fakeAsync(() => {
        mockHeroService.updateHero.and.returnValue(of({}));
    
        fixture.componentInstance.save();
        tick(250)
    
        expect(mockHeroService.updateHero).toHaveBeenCalled();
      }))

})