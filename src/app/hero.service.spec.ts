import { HeroService } from "./hero.service"
import { TestBed } from "@angular/core/testing"
import { MessageService } from "./message.service"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { inject } from "@angular/core"

describe('hero service', () => {
    let mockHeroService
    let httpTestingController: HttpTestingController
    let heroService: HeroService

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['add'])
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockHeroService }
            ]
        })
        httpTestingController = TestBed.get(HttpTestingController)
        heroService = TestBed.get(HeroService)
    })

    it('should call get with the correct URL', () => {

        heroService.getHero(4).subscribe(h => console.log(h))
        // heroService.getHero(3).subscribe(h => console.log(h))

        const req = httpTestingController.expectOne('api/heroes/4') // Simula una única llamada con la url que quiero verificar
        req.flush({ id: 4, name: 'Heroes 4', strength: 400})        // La llamada devuelve un Heroe
        httpTestingController.verify()                              // Verifica que solo se realiza una llamada
    })



   
})