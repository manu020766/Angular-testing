import { MessageService } from "./message.service"

describe('MessageService', ()=> {
    let service: MessageService
    beforeEach(()=> {
        service = new MessageService()
    })

    it('add message: añade un mensaje', ()=> {
        service.messages = []

        service.add("Hola mundo")

        expect(service.messages.length).toBe(1)
    })

    it('Si ejecuto clear se borran todos los mensajes', ()=> {
        service.messages = []
        service.add("Hola mundo")

        service.clear()

        expect(service.messages.length).toBe(0)
    })

})