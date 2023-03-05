import { LightningElement,wire,track } from 'lwc';
import carType from '@salesforce/apex/CarSearch.carType';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { NavigationMixin } from 'lightning/navigation';
import cars from '@salesforce/resourceUrl/cars';

export default class CarSearch extends NavigationMixin(LightningElement) {
    selvalue;
    @track options;
    typeName;
    @wire(carType)
    carTypes({ error, data })
    {
        if (data)
        {
            this.options = [{ label: 'All Types', value:'' }];
            data.forEach(element => {
                const type = {};
                type.label = element.Name;
                type.value = element.Id;
            
                this.options.push(type);
            });
        }
        else if(error)
        {
            this.dispatchEvent(new ShowToastEvent({
                    'title':'Error!!',
                    'message':error.body.message ,
                    'variant': 'error',
                }));
         }
    }
    
    selectChange(event)
    {
        const carTypeId = event.target.value;
        this.options.forEach((obj) =>
        {
            if ( obj.value===carTypeId)
            {
                this.typeName = obj.label;
             }
         })
      //  console.log(carTypeId);
        this.dispatchEvent(new CustomEvent('cartype', { detail: carTypeId }));
        this.dispatchEvent(new CustomEvent('name', { detail: this.typeName }));
     }

    newCarType()
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:
            {
                objectApiName: 'Car_Type__c',
                actionName: 'new'
            },
        });

     }

}