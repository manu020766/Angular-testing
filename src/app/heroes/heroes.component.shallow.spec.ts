import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { Component, Input, ɵConsole } from "@angular/core"
import { Hero } from "../hero"
import { HeroService } from "../hero.service"
import { of } from "rxjs"
import { By } from "@angular/platform-browser"

@Component({
    selector: 'app-hero',
    template: `<div></div>`
})
class fakeHeroComponemt { @Input() hero}

describe('heroes component shallow test', ()=> {
    let heroesComponent: HeroesComponent
    let fixture: ComponentFixture<HeroesComponent>
    let HEROES: Hero[]
    let mockService

    beforeEach(()=> {
        HEROES = [
            { id: 1, name: 'heroe 1', strength:100 },
            { id: 2, name: 'heroe 2', strength:200 },
            { id: 3, name: 'heroe 3', strength:300 },
        ]
        mockService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, fakeHeroComponemt],
            providers: [
                { provide: HeroService, useValue: mockService }
            ]
        })
        fixture = TestBed.createComponent(HeroesComponent)
        heroesComponent = fixture.componentInstance
    })

    
    it('heroes component is defined', ()=> {
        expect(heroesComponent).toBeTruthy()
    })

    it('Se obtienen tres heroes inicialmente', ()=> {
        mockService.getHeroes.and.returnValue(of(HEROES))

        fixture.detectChanges() // lanza ngOnInit que llama a getHeroes
        //heroesComponent.getHeroes() 

        expect(heroesComponent.heroes.length).toBe(3)
    })

    it('Se muestran tres heroes inicialmente', ()=> {
        mockService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges() // lanza ngOnInit que llama a getHeroes

        const de = fixture.debugElement.queryAll(By.css('app-hero'))
        console.log(de)

        expect(de.length).toBe(3)
    })

    it('Se injectan los heroes en el componente Hero', ()=> {
        mockService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges() // lanza ngOnInit que llama a getHeroes
        const de = fixture.debugElement.queryAll(By.css('app-hero'))
        
        let injectedHeros = []
        de.forEach(deHero => injectedHeros.push(deHero.context.hero))
        console.log('injectedHeros', injectedHeros)

        de.forEach(deHero => console.log(deHero.context.hero))
        expect(injectedHeros).toEqual(HEROES)
    })

    it('Se injecta cada componente Hero en una etiqueta li', ()=> {
        mockService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges() // lanza ngOnInit que llama a getHeroes

        const de = fixture.debugElement.query(By.css('app-hero'))

        expect(de.parent.name).toBe('li')
    })

    it('Se injecta la acción delete en cada componente Hero', ()=> {
        mockService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges() // lanza ngOnInit que llama a getHeroes
        
        const de = fixture.debugElement.query(By.css('app-hero'))
        
        console.log('listeneres', de.listeners[0].name)
        expect(de.listeners[0].name).toBe('delete')
    })
})