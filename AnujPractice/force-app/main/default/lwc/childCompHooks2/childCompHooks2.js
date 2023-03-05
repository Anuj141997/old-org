import { LightningElement } from 'lwc';

export default class ChildCompHooks2 extends LightningElement {

    connectedCallback()
    {
        console.log('child2 connected')
    }
    renderedCallback()
    {
        console.log('Child 2 rendered');
    }
}