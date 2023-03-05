import { LightningElement,api } from 'lwc';

import { ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';
import co from '@salesforce/schema/Contact';    
import fn from '@salesforce/schema/Contact.FirstName';
import ln from '@salesforce/schema/Contact.LastName';  
import em from '@salesforce/schema/Contact.Email';

export default class ContactCreator extends NavigationMixin(LightningElement) {
    @api title;
    ob=co;
    f=[fn,ln,em];
    handleSuccess(event)
    {
        const ev=new ShowToastEvent({title: 'Contact Created',
                message: 'Record Id: ' + event.detail.id,
                variant: 'success'    
    });
    this.dispatchEvent(ev);
    
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: event.detail.id,
            objectApiName: 'Contact',
            actionName: 'view'
        },
    });
    }
}