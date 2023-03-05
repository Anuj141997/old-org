import { LightningElement, api } from 'lwc';
import {createMessageContext, releaseMessageContext,publish} from 'lightning/messageService';
import msg from '@salesforce/messageChannel/msgChannel__c';

export default class CarTile extends LightningElement {

    @api car;
    @api id;

        context= createMessageContext();
    // connectedCallback()
    // {
    //     console.log('connected', this.carselectId);
    //  }
    handleclick(e)
    {
        e.preventDefault();

        const carid = this.car;

        this.dispatchEvent(new CustomEvent('carselect', { detail: carid.Id }));
           const m=
        {
            recordId:carid,
        
        };
        publish(this.context,msg,m);
    }
    
    get isCarselected()
    {
       // console.log('selectd', this.id);
        let v = this.car.Id + '-67';
         //console.log('givn',this.car.Id);
        if (v === this.id) {
      
            return "select";
        } else {
            return "container";
        }
     }
}