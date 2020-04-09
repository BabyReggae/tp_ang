import { Subject } from 'rxjs/internal/Subject';

export class AppareilService {
    appareilsSubject = new Subject<any[]>();
    private appareils = [
        {
            id: 1,
            name: 'Machine à laver',
            status: 0
        },
        {
            id: 2,
            name: 'Frigo',
            status: 1
        },
        {
            id: 3,
            name: 'Ordinateur',
            status: 0
        }
    ];

    emitAppareilSubject() {
        this.appareilsSubject.next(this.appareils.slice());
    }
    
    switchOnAll() {
        for(let appareil of this.appareils) {
            appareil.status = 1;
        }
        this.emitAppareilSubject();
    }
    
    switchOffAll() {
        for(let appareil of this.appareils) {
            appareil.status = 0;
            this.emitAppareilSubject();
        }
    }
    
    switchOnOne(i: number) {
        this.appareils[i].status = 1;
        this.emitAppareilSubject();
    }
    
    switchOffOne(i: number) {
        this.appareils[i].status = 0;
        this.emitAppareilSubject();
    }

    addAppareil(name: string, status: string) {
        const appareilObject = {
            id: 0,
            name: '',
            status: 0
        };
        appareilObject.name = name;

        appareilObject.status = status === "éteint" ? 0 : 1;
        appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
    }


}