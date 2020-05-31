import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { RouterTestingModule } from '@angular/router/testing'
import { HeroService } from "../hero.service"
import { HeroComponent } from "../hero/hero.component"
import { Hero } from "../hero"
import { of } from "rxjs"
import { By } from "@angular/platform-browser"

describe('heroes component "deep"', ()=> {
    let fixture: ComponentFixture<HeroesComponent>
    let heroesComponent: HeroesComponent
    let mockheroService
    let HEROES: Hero[]

    beforeEach(()=> {
        HEROES = [
            { id: 1, name: 'Heroe 1', strength: 100},
            { id: 2, name: 'Heroe 2', strength: 200},
            { id: 3, name: 'Heroe 3', strength: 300}
        ]
        mockheroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HeroesComponent, HeroComponent],
            providers: [
                { provide: HeroService, useValue: mockheroService }
            ]
        })
        fixture = TestBed.createComponent(HeroesComponent)
        heroesComponent = fixture.componentInstance

        mockheroService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges()
    })

    it('should render each hero as a Hero componet', ()=> {
        // let de = fixture.debugElement.queryAll(By.css('app-hero'))
        let heroDes = fixture.debugElement.queryAll(By.directive(HeroComponent))

        expect(heroDes.length).toBe(3)
    })

    it('the first hero component hero must be the first', ()=> {
        let heroDe = fixture.debugElement.query(By.directive(HeroComponent))
        let heroCo = heroDe.componentInstance

        expect(heroCo.hero).toEqual(HEROES[0])
    })

    it('the first hero component click de delete option, emit event is called', ()=> {
        let heroDe = fixture.debugElement.query(By.directive(HeroComponent))
        let heroCo = heroDe.componentInstance
        spyOn(heroCo.delete, 'emit')

        heroDe.query(By.css('.delete')).nativeElement.click()

        expect(heroCo.delete.emit).toHaveBeenCalled()
        expect(heroCo.delete.emit).toHaveBeenCalledWith(HEROES[0])
    })

    it(`should call heroService.deleteHero when the Hero Component's
        delete2 button is clicked`, ()=> {
            // const heroComponent = fixture.debugElement.query(By.directive(HeroComponent)).componentInstance
            // console.log('AQUI', heroComponent)
            // console.log('AQUIIII', fixture.nativeElement.querySelector('app-hero'))

            spyOn(heroesComponent, 'delete2')
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent))

            heroComponents[0].query(By.css('.delete2')).triggerEventHandler('click',{ stopPropagation: () => {} })

            expect(heroesComponent.delete2).toHaveBeenCalledWith(HEROES[0])
    })

    it('should add a new hero to the hero list when de add button is clicked', () => {

        mockheroService.addHero.and.returnValue(of({ id: 4, name: 'Heroe 4', strength: 400}))
        const newHeroName = 'Heroe 4'

        let inputName = fixture.debugElement.query(By.css('input')).nativeElement
        inputName.value = newHeroName

        let buttonAdd = fixture.debugElement.query(By.css('button')).nativeElement
        buttonAdd.click()

        // console.log('NEW HERO ', heroesComponent.heroes[3])
        //expect(heroesComponent.heroes.length).toBe(4)

        fixture.detectChanges()

        // first
        // let HeroCompnentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent))
        // expect(HeroCompnentDEs[3].nativeElement.querySelector('a').textContent).toContain(newHeroName)

        // second
        // let heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent
        // console.log('heroText: ', heroText)
        // expect(heroText).toContain(newHeroName)

        // third
        let lastLi = fixture.debugElement.query(By.css('ul li:last-child')).nativeElement.textContent
        console.log('lastLi: ', lastLi)
        expect(lastLi).toContain(newHeroName)
    })
        
})