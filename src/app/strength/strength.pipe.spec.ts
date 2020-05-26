import { StrengthPipe } from "./strength.pipe"

describe('StrengthPipe', ()=> {
    let pipe: StrengthPipe
    beforeEach(()=> {
        pipe = new StrengthPipe()
    })

    it('Un número menor de 10 devuelve: "numero (weak)"', ()=> {
        const numero = 1
        const resultadoEsperado = `${numero} (weak)`

        const resultado = pipe.transform(numero)

        expect(resultado).toEqual(resultadoEsperado)
    })

    it('Un número mayor de 9 y menor de 20 devuelve: "numero (strong)"', ()=> {
        const numero = 10
        const resultadoEsperado = `${numero} (strong)`

        const resultado = pipe.transform(numero)

        expect(resultado).toEqual(resultadoEsperado)
    })
    
    it('Un número mayor de 19 devuelve: "numero (unbelievable)"', ()=> {
        const numero = 20
        const resultadoEsperado = `${numero} (unbelievable)`

        const resultado = pipe.transform(numero)

        expect(resultado).toEqual(resultadoEsperado)
    })
})