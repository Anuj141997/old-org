import { LightningElement,api,track } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {createRecord} from 'lightning/uiRecordApi';
import nf from '@salesforce/schema/Car_Experience__c.Name';
import exp from '@salesforce/schema/Car_Experience__c.Experience__c';
import crf from '@salesforce/schema/Car_Experience__c.Car__c';
import obj from '@salesforce/schema/Car_Experience__c';


export default class AddExp extends LightningElement {

    @api cid;

     title = '';
    
     desc = '';
    

   handletitle(event)
    {
       this.title = event.target.value;
       

    }

   handledesc(event)
    {
       this.desc = event.target.value;
       
    }
    addexp()
    {
        console.log(this.cid);
        
        const fields = {};
        fields[nf.fieldApiName] = this.title;
        fields[exp.fieldApiName] = this.desc;
        fields[crf.fieldApiName] = this.cid;

        const rinp = { apiName: obj.objectApiName, fields };

        createRecord(rinp)
            .then(result =>
            {
                 this.dispatchEvent(new ShowToastEvent({
                    'title':'Success',
                    'message':'Experince Record updated' ,
                    'variant': 'success',
                 }));
                this.title = '';
                this.desc = '';
                this.dispatchEvent(new CustomEvent('expadded'));
            })
            .catch(error =>
            {
                 this.dispatchEvent(new ShowToastEvent({
                    'title':'Error!!',
                    'message':error.body.message ,
                    'variant': 'error',
                }));
             })
    
    }
}