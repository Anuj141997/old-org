import { LightningElement,wire } from 'lwc';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import acctype from '@salesforce/schema/Account.Type';
import getpick from '@salesforce/apex/PicklistHelper.getprofile';
export default class PickList extends LightningElement {
    selval;
    pickvalarray;
    selpick;

    // get options()
    // {
    //     return[
    //         {label:'New',value:'new'},
    //         {label:'In Progress', value:'inProgress'},
    //     ];
    // }

    @wire(getPicklistValues,{
        recordTypeId: '012000000000000AAA',
        fieldApiName: acctype
    }) val;

    @wire(getpick)
    prof({error,data})
    {
        let ar=[];
        if(data)
        {
            for(let k in data)
            {
                ar.push({label:data[k],value:k});
            }
            this.pickvalarray=ar;
        }
    }
    picksel(event)
    {
        this.selpick=event.target.value;
        
    }


    select(event)
    {
        this.selval=event.target.value;

    }
}