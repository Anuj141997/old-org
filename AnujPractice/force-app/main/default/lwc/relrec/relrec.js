/**
 * @description       : 
 * @author            : Anuj Panwar
 * @group             : 
 * @last modified on  : 10-14-2022
 * @last modified by  : Anuj Panwar
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   10-14-2022   Anuj Panwar   Initial Version
**/
import { LightningElement,wire ,api} from 'lwc';
import getContacts from '@salesforce/apex/Con.getContacts';
//import AccountId from '@salesforce/schema/Contact.AccountId'

export default class Relrec extends LightningElement {

    
    @api accountId;
    @wire(getContacts ,{ accountId: '$accountId'})
    contacts({error,data})
    {
        if(data)
        {
            
        }
        if(error)
        {
            
        }
    }


}