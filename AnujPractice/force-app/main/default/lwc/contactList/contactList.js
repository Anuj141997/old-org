import { LightningElement, wire } from 'lwc';
import { reduceErrors} from 'c/ldsUtils';
import fn from '@salesforce/schema/Contact.FirstName';
import ln from '@salesforce/schema/Contact.LastName';
import em from '@salesforce/schema/Contact.Email';
import getContacts from '@salesforce/apex/ContactController.getContacts';

const col=[
    {label: 'First Name', fieldName: fn.fieldApiName, type: 'text'},
    {label: 'Last Name', fieldName: ln.fieldApiName, type: 'text'},
    {label: 'Email', fieldName: em.fieldApiName, type: 'text'}
];
export default class ContactList extends LightningElement {
    co=col;
    
    @wire(getContacts)
    contacts;
    
    get errors()
    {
        return  (this.contacts.error)?
                    reduceErrors(this.contacts.error) : [];
    }
}