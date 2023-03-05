import { LightningElement,track } from 'lwc';
import nm from '@salesforce/schema/Account.Name';
import ph from '@salesforce/schema/Account.Phone';
import ar from '@salesforce/schema/Account.AnnualRevenue';
import ty from '@salesforce/schema/Account.Type';
import rt from '@salesforce/schema/Account.Rating';
export default class DropComp extends LightningElement {

    fields=[nm,ph,ar,ty,rt];
    @track accountId;
    @track msg='Drop Account Here';
    drop(event)
    {
        this.accountId=event.dataTransfer.getData('account_id');
        console.log('accid'+this.accountId);
        this.msg='';
    }
    dragover(event)
    {
        event.preventDefault();
    }
}