import { LightningElement } from 'lwc';

export default class Calcomp extends LightningElement {
    msg;
    change(e){
        this.msg=e.target.value;
    }
    hn()
    {
        alert('anuj');
    }
}