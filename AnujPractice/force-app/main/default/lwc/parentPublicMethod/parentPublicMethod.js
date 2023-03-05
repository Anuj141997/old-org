import { LightningElement } from 'lwc';

export default class ParentPublicMethod extends LightningElement {

    value;

    click(e)
    {
        const a = this.template.querySelector('c-child-public-method');
            const b=a.SelectCheck(this.value);
        console.log(b);

    }
    
    valchange(e) {
        this.value = e.target.value;
    }


}