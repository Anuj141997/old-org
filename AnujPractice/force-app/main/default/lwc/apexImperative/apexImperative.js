import { LightningElement,track } from 'lwc';
import getcon from '@salesforce/apex/GetAccount.getcon';
export default class ApexImperative extends LightningElement {
    @track con;
    @track error;
     col=[{ label:'First Name', fieldName:'FirstName', type:'text'},
        {label:'Last Name', fieldName:'LastName', type:'text'}
    ];

    renderedCallback(){
        getcon()
            .then(result=>{
                this.con=result;
            })
            .catch(errors=>{
                this.error=errors;
            });
        }
}