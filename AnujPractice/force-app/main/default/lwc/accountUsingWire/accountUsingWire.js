import { LightningElement,wire,track} from 'lwc';
import getaccounts from '@salesforce/apex/GetAccount.getaccounts';
import beer from '@salesforce/apex/BeerController.getbeer';
export default class AccountUsingWire extends LightningElement {
   // @track da;
   be;
    @wire(getaccounts) accounts;
    dragstart(event)
    {
        event.dataTransfer.setData('account_id',event.target.dataset.item);
        console.log(event.target.dataset.item);
    }

    @wire(beer) beers({error,data})
    {
        console.log('data', data);
    }

    

    
}