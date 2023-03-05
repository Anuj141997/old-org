import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    greeting='World';
    c(event)
    {
        this.greeting= event.target.value;
    }
}