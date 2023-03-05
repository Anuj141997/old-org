import { api, LightningElement, wire } from 'lwc';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import {createRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import status from '@salesforce/schema/Case.Status';
import pri from '@salesforce/schema/Case.Priority';
import ori from '@salesforce/schema/Case.Origin';
import objname from '@salesforce/schema/Case';
import acid from '@salesforce/schema/Case.AccountId';
import coid from '@salesforce/schema/Case.ContactId';

export default class QuickCaseUpdate extends LightningElement {
    @api objectApiName;
    @api recordId;
    selval1='';
    selval2='';
    selval3='';
     statusval;
     prival;
     orival;

     recid;

    @wire(getPicklistValues,{recordTypeId: '012000000000000AAA',fieldApiName: status}) 
    val1({data,error})
    {
        if(data)
        {
            this.statusval=data.values;
            console.log('hi',this.objectApiName,this.recordId);
        }
        if(error)
        {
            console.log('error',error); 
            
        }
    };
    
    @wire(getPicklistValues,{recordTypeId: '012000000000000AAA',fieldApiName: pri}) 
    val2({data,error}){
        if(data)
        {
            this.prival=data.values;
            
        }
        if(error)
        {
            console.log('error',error); 
        }
    };
    
    @wire(getPicklistValues,{recordTypeId: '012000000000000AAA',fieldApiName: ori})
    val3({data,error}){
        if(data)
        {
            this.orival=data.values;
            
        }
        if(error)
        {
            console.log('error',error); 
        }
    };


    select(ev)
    {
        if(ev.target.label=='Case Status')
        {
            this.selval1=ev.target.value;
        }
        if(ev.target.label=='Case Priority')
        {
            this.selval2=ev.target.value;
        }if(ev.target.label=='Case Origin')
        {
            this.selval3=ev.target.value;
        }
    }

    //Case Creation

    click()
    {
        if(this.selval1!='' && this.selval2!='')
        {
            if(this.objectApiName=='Account')
            {
                console.log('Account here');
                const fields={};
                fields[status.fieldApiName]=this.selval1;
                fields[pri.fieldApiName]=this.selval2;
                fields[ori.fieldApiName]=this.selval3;
                fields[acid.fieldApiName]=this.recordId;
                const rec={apiName: objname.objectApiName,fields};

                createRecord(rec)
                    .then(res=>{
                    //alert('Case Created with id'+result.Id);
                    this.recid=res.id;
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title:'Success',
                            message:' Case created successfully with id '+this.recid,
                            variant:'success',
                        }),
                    );

                    this.selval1='';this.selval2='';this.selval3='';
                    })
                    .catch(error=>
                        {
                            alert('error',error);
                        });
            
            }
            if(this.objectApiName=='Contact')
            {
                console.log('Contact here');
                const fields={};
                fields[status.fieldApiName]=this.selval1;
                fields[pri.fieldApiName]=this.selval2;
                fields[ori.fieldApiName]=this.selval3;
                fields[coid.fieldApiName]=this.recordId;
                const rec={apiName: objname.objectApiName,fields};

                createRecord(rec)
                    .then(result=>{
                    // alert('Case Created with id',result.id);
                    this.recid=result.id;
                    this.dispatchEvent(
                    new ShowToastEvent({
                        title:'Success',
                        message:' Case created successfully with id '+this.recid,
                        variant:'success',
                    }),
                );
                this.selval1='';this.selval2='';this.selval3='';
                    })
                    .catch(error=>
                        {
                            alert('error',error);
                        });
            
            }   

       
     } 
     else
     {
        this.dispatchEvent(
            new ShowToastEvent({
                title:'Failure',
                message:'Error creating Record!! Fill the values ',
                variant:'error',
            }),
        );
     }  
    }
}