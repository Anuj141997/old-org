import { LightningElement,wire,track } from 'lwc';
import getcon from '@salesforce/apex/MassDelete.getContact';
import delcon from '@salesforce/apex/MassDelete.delcon';
import {refreshApex} from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class MassDeleteContact extends LightningElement {
    @wire(getcon) contacts;
    @track selconlist=[];
    @track cols=
    [
        {label:'First Name',fieldName:'FirstName',type:'text'},
        {label:'Last Name',fieldName:'LastName',type:'text'}
    ];
    delrec()
    {
        delcon({selcon:this.selconlist})
        .then(result=>
            {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title:'Success',
                        message:'Contacts Deleted',
                        variant:'success',
                    }),
                );
                this.template.querySelector('lightning-datatable').selectedRows=[];

                return refreshApex(this.contacts);

            })  
            .catch(error=>
                {
                    this.error=error;
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title:'Error Deleting Record',
                            message:error.body.pageErrors[0].message,
                            variant:'error',
                        }),
                    );

                });

    }

    selrec(event)
    {
        const s = event.detail.selectedRows;
        console.log(s);
        this.selconlist=[];
        for(let i=0;i<s.length;i++)
        {
            this.selconlist.push(s[i].Id);
        }
        console.log(this.selconlist);
    }
    


}