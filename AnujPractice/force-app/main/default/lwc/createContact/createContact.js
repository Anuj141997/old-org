import { LightningElement,track } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';
import obj from '@salesforce/schema/Contact';
import aid from '@salesforce/schema/Contact.AccountId';
import ln from '@salesforce/schema/Contact.LastName';
import ph from '@salesforce/schema/Contact.Phone';
import fn from '@salesforce/schema/Contact.FirstName';

export default class CreateContact extends NavigationMixin(LightningElement) {
    @track selId;
    @track conId;
    fname='';
    lname='';
    phone='';

    change(ev)
    {
        if(ev.target.label=='First Name')
        {
            this.fname=ev.target.value;
        }
        
        if(ev.target.label=='Last Name')
        {
            this.lname=ev.target.value;
        }
        if(ev.target.label=='Phone')
        {
            this.phone=ev.target.value;
        }
    }

    
    con()
    {
        
        const fields={};
       // fl[fn.fieldApiName]=this.fname;
        fields[ln.fieldApiName]=this.lname;
        fields[ph.fieldApiName]=this.phone;
        fields[aid.fieldApiName]=this.selId;

        const inp={ apiName: obj.objectApiName, fields};

        createRecord(inp)
            .then(contact=>
                {
                    this.conId=contact.id;
                    this.dispatchEvent(
                        new ShowToastEvent({

                                title:'Success',
                                message:'Contact created',
                                variant:'success',
                            }),
                    );
                    this[NavigationMixin.Navigate]({
                        type: 'standard__recordPage',
                        attributes: {
                            recordId:contact.id,
                            objectApiName: 'Contact',
                            actionName:'view'
                        },
                    });
                })
                .catch(error=>
                    {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title:'Error creating Contact',
                                message:error.body.message,
                                variant:'error',
                            }),
                        );
                    });
    }

    handleselected(ev)
    {
        this.selId=ev.detail;
        console.log('selected'+this.selId);
    }

}