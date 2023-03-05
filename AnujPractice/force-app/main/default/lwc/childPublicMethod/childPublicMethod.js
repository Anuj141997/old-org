import { LightningElement,api } from 'lwc';

export default class ChildPublicMethod extends LightningElement {

    value = ['red'];

    options=
     [
            { label: 'Red Color', value: 'red' },
            { label: 'Yellow Color', value: 'yellow' },
            { label: 'Green Color', value: 'green' },
            { label: 'Blue Color', value: 'blue' }
        ]
    

    change(event)
    {
        this.value = event.detail.value;
        console.log(this.value);

     }

    @api
    SelectCheck(v)
    {
        const sel = this.options.find(c =>
        {
            return v === c.value;
         })
         
        if (sel)
        {
            
            
            this.value = sel.value;

            

            return this.value;

        }
        
        
    
    }
    

}