import { LightningElement,track } from 'lwc';
import {createMessageContext, releaseMessageContext,APPLICATION_SCOPE,subscribe,unsubscribe} from 'lightning/messageService';
import msg from '@salesforce/messageChannel/msgChannel__c';
import nm from '@salesforce/schema/Account.Name';
import ind from '@salesforce/schema/Account.Industry';
import ar from '@salesforce/schema/Account.AnnualRevenue';

export default class SuscribeAcc extends LightningElement {
    context= createMessageContext();
    subsciption=null;
    @track recmsg='';
    
    accId;
    fields=[nm,ind,ar];
    connectedCallback()
    {
         this.subscribeMC();
    }
    subscribeMC()
    {
        if(this.subsciption)
            return;
        
        this.subsciption=subscribe(this.context,msg,(message)=>
        {
            this.handlemsg(message);
        },{scope:APPLICATION_SCOPE});
    }
    handlemsg(message)
    {
        this.accId=message.recordId;
        this.recmsg=message?message.recordData.value : 'no message'; 
    }
}