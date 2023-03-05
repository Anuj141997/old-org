import { LightningElement } from 'lwc';
import getsum from '@salesforce/apex/CalculatorClass.getsum';

export default class Calculatorcomp extends LightningElement {
    fn;
    sn;
     sum;
     error;
     ms=''; 
    handleClick()
    {
        getsum({num1:this.fn,num2:this.sn})
        .then(result=>{
            this.sum=result;
        })
        .catch(errors=>{
            this.error=errors;
        })
    }
    change(e){
        if(e.target.name==='first')
        {
            this.fn=e.target.value;
        }
        if(e.target.name==='second')
        {
            this.sn=e.target.value;
        }
       
    }
    m(e)
    {
        this.ms=e.target.msg;
    }
    handledate()
    {
        this.template.querySelector('c-cal-child').dat('hello');
    }
}