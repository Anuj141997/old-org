import { LightningElement,api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import fn from '@salesforce/schema/Contact.FirstName';
import ln from '@salesforce/schema/Contact.LastName';
import em from '@salesforce/schema/Contact.Email';
import ac from '@salesforce/schema/Contact.AccountId';

export default class QuickConUpdate extends LightningElement {
    @api objectApiName;
    @api recordId;
    flds=[fn,ln,em,ac];

    change(ev)
    {
        const e= new ShowToastEvent(
            {
                title: 'Contact Updated',
                message: 'Contact: '+ev.detail.fields.LastName.value+' has been updated successfully',
                variant: 'success'
            }
        );
        this.dispatchEvent(e);
    }

}