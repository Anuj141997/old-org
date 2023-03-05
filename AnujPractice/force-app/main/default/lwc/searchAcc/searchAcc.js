import { LightningElement,wire,track } from 'lwc';
import getaccounts from '@salesforce/apex/AccountSearch.getacc';

export default class SearchAcc extends LightningElement {
    visible=true;
    acName='';
    @track acclist;
    @wire(getaccounts,{accname:'$acName'})
    accounts({data,error})
    {
        if(data)
        {
            this.visible=true;
            this.acclist=data;
            //console.log(this.acclist.length);
            if(this.acclist.length==0)
            {
                this.visible=false;
            }
        }
        else if(error){}
    }
    change(e)
    {
        this.acName=e.target.value;
    }
}