export class AppareilService {

    appareils = [
        {name : 'grille-pain',status : 0},
        {name : 'autregp' , status : 1},
        {name : 'jadore les gp',status : 0}
      ]; 

    /* 1 == allumé //  0 == éteind*/
    switchOnAll() {
        for(let appareil of this.appareils) {
          appareil.status = 1;
        }
    }
    
    switchOffAll() {
        for(let appareil of this.appareils) {
          appareil.status = 0;
        }
    }

    switchOnOne(i: number) {
        this.appareils[i].status = 1;
    }

    switchOffOne(i: number) {
        this.appareils[i].status = 0;
    }

}