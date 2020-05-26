import { HeroComponent } from "./hero.component"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { RouterTestingModule } from '@angular/router/testing'
import { By } from "@angular/platform-browser"

describe('hero component', ()=> {
    let componente: HeroComponent
    let fixture: ComponentFixture<HeroComponent>

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HeroComponent]
        })
        fixture = TestBed.createComponent(HeroComponent)
        componente = fixture.componentInstance
    })

    it('El componente se crea correctamente', ()=> {
        expect(componente).toBeTruthy()
    })

    it('Recibimos un heroe y se muestra el nombre en el link, con nativeElement', ()=> {
        componente.hero = { id:1, name: 'Heroe 1', strength : 200 }
        fixture.detectChanges()

        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Heroe 1')
    })

    it('Recibimos un heroe y se muestra el nombre en el link, con debugElement', ()=> {
        componente.hero = { id:1, name: 'Heroe 1', strength : 200 }
        fixture.detectChanges()

        let de = fixture.debugElement.query(By.css('a'))
        expect(de.nativeElement.textContent).toContain('Heroe 1')
    })

})