import { LightningElement } from 'lwc';

export default class ColorPicker extends LightningElement {

    change(event){

        const colorval= event.target.value;
        const cusev=new CustomEvent('color', {
            detail:{colorval} 
        });
        this.dispatchEvent(cusev);
    }
    
}