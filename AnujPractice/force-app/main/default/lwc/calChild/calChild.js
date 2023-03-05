import { LightningElement,api } from 'lwc';

export default class CalChild extends LightningElement {
    @api r;
    @api msg='Anuj';
    date=new Date();
    click(event)
    {
        const ev =new CustomEvent('clickme',
       { bubbles:true,composed:false
    });
    this.dispatchEvent(ev);
    }

    @api
    dat(ru)
    {
        this.date= new Date();
        this.r=ru;
    }
}