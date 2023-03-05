/**
 * @description       : 
 * @author            : Anuj Panwar
 * @group             : 
 * @last modified on  : 08-29-2022
 * @last modified by  : Anuj Panwar 
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   08-29-2022   Anuj Panwar   Initial Version
**/
import { LightningElement,api,wire } from 'lwc';
import getcon from '@salesforce/apex/GetContact.getcon';
import {createMessageContext, releaseMessageContext,APPLICATION_SCOPE,subscribe,unsubscribe} from 'lightning/messageService';
import msg from '@salesforce/messageChannel/msgChannel__c';


export default class RelatedContacts extends LightningElement {
    col=[
        {label:'First Name',fieldName:'FirstName'},
        {label:'Last Name',fieldName:'LastName'},
        {label:'Email',fieldName:'Email',type:'email'},
    ];
      
     accId;
     @wire(getcon,{accid:'$accId'})contacts;
    cont=createMessageContext();
    sub=null;

    connectedCallback()
    {
        this.subMC();
    }
    subMC()
    {
        if(this.sub)
            return;

        this.sub=subscribe(this.cont,msg,(message)=>
        {
            this.handmsg(message);
        },{scope:APPLICATION_SCOPE});
    }

    handmsg(message)
    {
        this.accId=message.recordId;
    }


   



}