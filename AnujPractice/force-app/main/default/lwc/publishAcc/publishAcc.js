import { LightningElement,track } from 'lwc';
import getacc from '@salesforce/apex/GetAccount.getaccounts';
import {createMessageContext, releaseMessageContext,publish} from 'lightning/messageService';
import msg from '@salesforce/messageChannel/msgChannel__c';

export default class PublishAcc extends LightningElement {
    context= createMessageContext();

    @track accList;
    connectedCallback()
    {
        getacc()
        .then(result=>
            {
                this.accList=result;
            })
        .catch(error=>
            {
                this.accList=error;
            })
    }

    handleclick(ev)
    {
        ev.preventDefault();
        const m=
        {
            recordId:ev.target.dataset.val,
            recordData: {value: 'Message from Anuj'}
        };
        publish(this.context,msg,m);
    }

}