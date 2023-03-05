import { LightningElement } from 'lwc';
import {loadScript,loadStyle} from 'lightning/platformResourceLoader';
import jquery from '@salesforce/resourceUrl/jquery';
import mycss from '@salesforce/resourceUrl/mycss';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ExternalScript extends LightningElement {

    renderedCallback()
    {
        Promise.all([
            loadScript(this,jquery),
            loadStyle(this,mycss)
        ]).then(()=>{
            $(this.template.querySelector('div')).text('JQuery loaded');
        }).catch(error=>
            {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title:'Error loading JQuery',
                        message: error,
                        variant: 'error'
                    })
                );
            });
    }
    handleClick(event)
    {
        let tname=event.target.name;
        if(tname=='togglebtn')
        {
            $(this.template.querySelector('div.mydiv')).toggle();
           
           if(event.target.label=='Hide'){event.target.label='Show';}
           else{event.target.label='Hide';}
           
        }
    
         else if(tname=='slidetogglebtn')
        {
        $(this.template.querySelector('div.mydiv')).slideToggle('slow');
       
        }
        else if(tname=='rcorners1')
        {
            $(this.template.querySelector('div.mydiv')).addClass('rcor1');
            $(this.template.querySelector('div.mydiv')).removeClass('rcor2');
            $(this.template.querySelector('div.mydiv')).removeClass('rcor3');
        }
        else if(tname=='rcorners2')
        {
            $(this.template.querySelector('div.mydiv')).addClass('rcor2');
            $(this.template.querySelector('div.mydiv')).removeClass('rcor1');
            $(this.template.querySelector('div.mydiv')).removeClass('rcor3');
        }
        else if(tname=='rcorners3')
        {
            $(this.template.querySelector('div.mydiv')).addClass('rcor3');
            $(this.template.querySelector('div.mydiv')).removeClass('rcor2');
            $(this.template.querySelector('div.mydiv')).removeClass('rcor1');
        }
    }
}