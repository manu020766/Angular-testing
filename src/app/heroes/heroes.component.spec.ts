import { HeroesComponent } from "./heroes.component"
import { Hero } from "../hero"
import { of } from "rxjs"

describe('HeroesComponent', ()=> {
    let componente: HeroesComponent
    let mockHeroService
    let HEROES:Hero[]

    beforeEach(()=> {
        HEROES = [
            { id: 1, name: 'heroe 1', strength: 100 },
            { id: 2, name: 'heroe 2', strength: 200 },
            { id: 3, name: 'heroe 3', strength: 300 }
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
        componente = new HeroesComponent(mockHeroService)    
    })

    it('Get heroes', ()=> {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        componente.getHeroes()

        expect(componente.heroes.length).toBe(3)
    })

    it('Add hero', ()=> {
        componente.heroes = HEROES
        const newHero = { id: 4, name: 'heroe 4', strength: 400 }
        mockHeroService.addHero.and.returnValue(of(newHero))

        componente.add(newHero.name)

        expect(componente.heroes.length).toBe(4)
    })

    it('remove hero', ()=> {
        mockHeroService.deleteHero.and.returnValue(of(true))
        componente.heroes = HEROES  

        componente.delete(HEROES[2])

        expect(componente.heroes.length).toBe(2)
    })
})