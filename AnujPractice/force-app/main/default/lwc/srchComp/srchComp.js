import { LightningElement } from 'lwc';

export default class SrchComp extends LightningElement {

    val;

    handlechange(ev)
    {
        this.val=ev.target.value;
    
        const c=new CustomEvent('search',
        {
            detail:this.val
        });
        this.dispatchEvent(c);
    }

    
}