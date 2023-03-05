import { LightningElement } from 'lwc';

export default class ChildCompHooks extends LightningElement {

    name='k';
    connectedCallback()
    {
        console.log('Child Connected');
    }

    renderedCallback()
    {
        console.log('Child Rendered');
    }
}