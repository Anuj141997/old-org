import { api, LightningElement,wire } from 'lwc';
import lead from '@salesforce/apex/LeadInfo.getlead';
import { refreshApex } from '@salesforce/apex';


export default class Feedback extends LightningElement {
    @api recordId;
    leadrating;
    leadvalues;
    ratingvalue;
    

    @wire(lead, { id: '$recordId' }) 
    leads(result) {
       this.leadvalues = result;
       if (result.data) {
           console.log(result.data);
           this.leadrating = result.data;
  
           if (this.leadrating == 'Hot') {
             this.ratingvalue = 3;
             this.template.querySelector('div').innerHTML = '';
             
             
           }
           else if (this.leadrating == 'Warm') {
             this.ratingvalue = 2;
             this.template.querySelector('div').innerHTML = '';
             
  
           }
           else if (this.leadrating == 'Cold') {
             this.ratingvalue = 1;
            this.template.querySelector('div').innerHTML = '';
              
           }
           else {
             this.ratingvalue = 0;
            this.template.querySelector('div').innerHTML = '';
             
           }
         
         refreshApex(this.leadvalues);
       }
       else if (result.error) {
           console.log(result.error);
       }
       
   }
    renderedCallback()
    {
        refreshApex(this.leadvalues);
     }
  
}