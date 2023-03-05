import { LightningElement } from 'lwc';

export default class HooksPractice extends LightningElement {

    name='Anuj';
    constructor()
    {
       super();
        console.log('this is constructor');
        this.name= this.name+' Panwar';
    }

    connectedCallback()
    {
        console.log('this is connected');
        
    }
    
    disconnectedCallback()
    {
        console.log('this is disconnected');
    }

    
    renderedCallback()
    {
        console.log('this is rendered');
        this.template.querySelector('strong').innerHTML='Im aaa';
    }
}