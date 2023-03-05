import { LightningElement,track } from 'lwc';
import nm from '@salesforce/schema/Account.Name';
import ph from '@salesforce/schema/Account.Phone';
import createacc from '@salesforce/apex/AccountCreator.createAcc';
import {  ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class AccountCreationUsingApex extends LightningElement {
    @track error;
    @track accid;
    @track accrec={
        Name:nm,
        Phone:ph
    };
namechange(ev)
{
    this.accrec.Name=ev.target.value;
}
phonechange(ev)
{
    this.accrec.Phone=ev.target.value;
}

click()
{
    createacc({accobj:this.accrec})
    .then(result=>{
        this.accid=result.Id;
        this.accrec={};

        const toastevent= new ShowToastEvent({
            title: 'Success',
            message:'Account Successfully created',
            variant:'success'
        });
        this.dispatchEvent(toastevent);

    })
    .catch(error=>{
        this.error=error.message;
    });
}

}