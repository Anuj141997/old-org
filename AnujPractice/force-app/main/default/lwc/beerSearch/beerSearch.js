import { LightningElement, track } from 'lwc';

export default class BeerSearch extends LightningElement {

    @track key;

    change(event)
    {
        const v=event.target.value;

      
        this.dispatchEvent( new CustomEvent('search',
        {
            detail : v
        })
        );

        
    }
}