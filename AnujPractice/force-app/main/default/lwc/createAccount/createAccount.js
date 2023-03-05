import { LightningElement } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';
import accobj from '@salesforce/schema/Account';
import nm from '@salesforce/schema/Account.Name';
import ph from '@salesforce/schema/Account.Phone';

export default class CreateAccount extends NavigationMixin(LightningElement) {
    name='';
    phone='';
    change(ev)
    {
        if(ev.target.label=='Name')
        {
            this.name=ev.target.value;
        }
        if(ev.target.label=='Phone')
        {
            this.phone=ev.target.value;
        }
    }

    click()
    {
        const fields={};
        fields[nm.fieldApiName]=this.name;
        fields[ph.fieldApiName]=this.phone;

        const recinp={ apiName: accobj.objectApiName,fields};

        createRecord(recinp)
            .then(account=>
                {
                    this.accountId=account.id;
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title:'Success',
                            message:'Account '+this.name+' created successfully',
                            variant:'success',
                        }),
                    );
                    this[NavigationMixin.Navigate]({

                        type:'standard__recordPage',
                        attributes: {
                            recordId: account.id,
                            objectApiName: 'Account',
                            actionName: 'view'
                        },

                    });
                })
            .catch(error=>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating Account',
                        message:error.body.message,
                        variant:'error',
                    }),
                );

            });
            
    }
}