import { LightningElement,api,track } from 'lwc';

import getexp from '@salesforce/apex/CarExperiences.getexp';
import { NavigationMixin } from 'lightning/navigation';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CarExp extends NavigationMixin(LightningElement) {

     privatecarid;
    @track carExperiences=[];  
    
    connectedCallback()
    {
        
        this.getexperience();
        
        
    }

    @api
    get carid()
    {
        return this.privatecarid;
    }
    
    set carid(value)
    {
        this.privatecarid = value;
        this.getexperience();
     }
    
    @api
    getexperience()
    {
        getexp({ id: this.privatecarid })
            .then(result =>
            {
                this.carExperiences = result;
                console.log(this.carExperiences);
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
    userClickHandler(event)
    {
        const userid = event.target.dataset.userid;

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes:
            {
                recordId: userid,
                objectApiName: 'User',
                actionName: 'view',
            }
        })
    }
    
    get hasExperiences()
    {
        if (this.carExperiences.length>0) {
            return true;
        }
        else {
            return false;
        }
     }

}