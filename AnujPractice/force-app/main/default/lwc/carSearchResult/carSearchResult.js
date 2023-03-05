import { LightningElement, track,api,wire } from 'lwc';

import getCars from '@salesforce/apex/CarSearchController.getcars';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class CarSearchResult extends LightningElement {

    @api cid;
    selectedCar;
   @track cars;
    error;

    @wire(getCars, { typeId: '$cid' })
    cars({  data,error })
    {
        if (data)
        {
            this.cars = data;
           // console.log('result', this.cars);
        }
        if (error)
        {
              this.dispatchEvent(new ShowToastEvent({
                    'title':'Error!!',
                    'message':error.body.message ,
                    'variant': 'error',
                }));
         }
    }
    
    get carsFound()
    {
        if (this.cars) { return true; }
       return false;
        
    }
    
    carselecthandle(ev)
    {
        this.selectedCar = ev.detail;
       // console.log('Selected car', this.selectedCar);
     }
}