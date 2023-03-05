import { LightningElement, wire,track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import c_id from '@salesforce/schema/Car__c.Id';
import c_nm from '@salesforce/schema/Car__c.Name';
import c_mileage from '@salesforce/schema/Car__c.Mileage__c';
import c_rent from '@salesforce/schema/Car__c.Per_Day_Rent__c';
import c_build from '@salesforce/schema/Car__c.Build_Year__c';
import c_pic from '@salesforce/schema/Car__c.Picture__c';
import c_conName from '@salesforce/schema/Car__c.Contact__r.Name';
import c_conEmail from '@salesforce/schema/Car__c.Contact__r.Email';
import c_conPhn from '@salesforce/schema/Car__c.Contact__r.HomePhone';
import c_Type from '@salesforce/schema/Car__c.Car_Type__r.Name';

import {createMessageContext,APPLICATION_SCOPE,subscribe} from 'lightning/messageService';
import msg from '@salesforce/messageChannel/msgChannel__c';

const fields = [
        c_id, c_nm, c_mileage, c_rent, c_build, c_pic, c_conName, c_conEmail, c_conPhn, c_Type

    ];

export default class CarDetails extends LightningElement {

    
    context= createMessageContext();
    subsciption=null;
    @track carId;
    @track activetab;
   
    // isdata = false;
    @wire(getRecord, { recordId: '$carId', fields })
    car;
     connectedCallback()
    {
         this.subscribeMC();
     }
    handelchange(ev)
    {
        this.activetab = ev.target.value;
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
        this.carId = message.recordId.Id;
       // console.log('lms',this.carId);
        
    }

    get isdata()
    {
        if (this.car.data)
        {
            return true;
         }
        return false;
    }

    handleTabSwitch()
    {
      
        const getexp = this.template.querySelector('c-car-exp');
        if (getexp)
        {
            getexp.getexperience();
         }
           this.activetab = 'vexp';
    }
}