import { LightningElement,track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import saveacclist from '@salesforce/apex/AccountCreator.acclist';
export default class DynamicRows extends LightningElement {

    @track keyI=0;
    @track accountrecord=[
        {
            Name:'',
            Industry:'',
            Phone:''
        }
    ];
     
    addrow()
    {
        this.keyI+1;
        this.accountrecord.push({
            Name:'',
            Industry:'',
            Phone:''
        });
    }
    del(ev)
    {
        if(this.accountrecord.length>=1)
            this.accountrecord.splice(ev.target.accessKey,1);
        this.keyI-1;
    }

    change(ev)
    {
        if(ev.target.name==='accname'){
            this.accountrecord[ev.target.accessKey].Name=ev.target.value;
        }
        else if(ev.target.name==='accind'){
            this.accountrecord[ev.target.accessKey].Industry=ev.target.value;
        }
        else if(ev.target.name==='accphn'){
            this.accountrecord[ev.target.accessKey].Phone=ev.target.value;
        }
    }

    save()
    {
        saveacclist({li : this.accountrecord})
            .then(result=>
                {
                   this.messag=result;
                   this.error=undefined;
                    this.accountrecord.forEach(function(item)
                    {
                        item.Name='';
                        item.Industry='';
                        item.Phone='';
                    });     
                
                    if(this.messag!==undefined)
                    {
                        this.dispatchEvent(
                            new ShowToastEvent(
                                {
                                    title:'Success',
                                    message:'Accounts Created',
                                    variant:'success',
                                }),
                                );
                    }
                    console.log(JSON.stringify(result));
                    console.log(result,this.messag);
                })

            .catch(error=>
                {
                    this.messag=undefined;
                    this.error=error;
                    this.dispatchEvent(
                        new ShowToastEvent(
                            {
                                title:'Error creating records',
                                message:error.body.message,
                                variant:'error',
                            }),
                    );
                });
    }

}