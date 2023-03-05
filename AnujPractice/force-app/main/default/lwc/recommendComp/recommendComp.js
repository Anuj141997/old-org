import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';

import id from '@salesforce/schema/Recommendation__c.Id'
import rstatus from '@salesforce/schema/Recommendation__c.Status__c';
import rlike from '@salesforce/schema/Recommendation__c.Priority__c';
import ratval from '@salesforce/schema/Recommendation__c.Rating__c';

export default class RecommendComp extends LightningElement {

    @api recData;
    Data;
    likestate;
    dislikestate;

    ratingValue;

    showRec;
    showBut;
    connectedCallback()
    {
        this.dispatchEvent(new CustomEvent('ref'));
        this.Data = this.recData;
        console.log('this.recData :>> ', this.Data);
         let c = this.Data.Status__c;
        if (c == 'Accepted')
        {
            this.showBut = false;
            this.showRec = true;
        }
        else if(c == undefined) {
            this.showRec = true;
              this.showBut = true;
        }
        else
        {
            this.showBut = true;
            this.showRec = false;
        }
        
        let likeBut = this.Data.Priority__c;
        if (likeBut == 'Like')
        {
            this.likestate = true;
            this.dislikestate = false;
        }
        else if ( likeBut == 'Dislike')
        {
            this.likestate = false;
            this.dislikestate = true;
        }
        else if (likeBut == undefined)
        {
              this.likestate = false;
            this.dislikestate = false;
         }
        

        this.ratingValue = this.Data.Rating__c;
        console.log('ratingValue :>> ', this.ratingValue);
        
    }
    
    handleRatingChanged(e)
    {
        const val = e.detail.rating;
        console.log('val :>> ', val);
          const fields = {};
      
             fields[ratval.fieldApiName] = val.toString();       
         fields[id.fieldApiName] = this.recData.Id;

        const recinp = {fields };

        updateRecord(recinp)
            .then(() =>
            {
                 this.dispatchEvent(new CustomEvent('ref'));

                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error updating record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
     }


    handleLikeButtonClick(e)
    {
        let v = e.target.title;

        if (v == 'Like')
        {
            if (this.likestate) {
                this.likestate = false;
            }
            else {
                this.likestate = true;
                this.dislikestate = false;
                
            }
        }
         if (v == 'Dislike')
        {
            if (this.dislikestate) {
                this.dislikestate = false;
            }
            else {
                this.dislikestate = false;
                this.dislikestate = true;
                
            }
         }
       
        this.updateLikeRecord();
    }
    
    updateLikeRecord()
    {
         const fields = {};
        if (this.likestate)
        {
             fields[rlike.fieldApiName] = 'Like';
        }
        else if(this.dislikestate){
             fields[rlike.fieldApiName] = 'Dislike';
        }
        else {
            fields[rlike.fieldApiName] = 'None';
        }
       
         fields[id.fieldApiName] = this.recData.Id;

        const recinp = {fields };

        updateRecord(recinp)
            .then(() =>
            {
                 this.dispatchEvent(new CustomEvent('ref'));

                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error updating record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
     }
    

   
    renderedCallback() {
       
         this.dispatchEvent(new CustomEvent('ref'));
          var str = this.Data.Recommend__c;
        var parser = new DOMParser()
        var doc = parser.parseFromString(str, 'text/html');
        let rec = this.template.querySelector('.recommend');
        if(!rec) return;
        rec.innerHTML = doc.body.innerHTML;
        console.log('rec :>> ', rec);
        

         var str1 = this.Data.Header__c;
        var parser1 = new DOMParser()
        var doc1 = parser1.parseFromString(str1, 'text/html');
        let rec1 = this.template.querySelector('.header');
          if(!rec1) return;
        rec1.innerHTML = doc1.body.innerHTML;

       
       
        //  console.log('rec :>> ', rec);
    }

    accept()
    {
                       this.showRec = true;
                      this.showBut = false;
      
        const fields = {};
        
        fields[rstatus.fieldApiName] = 'Accepted';
         fields[id.fieldApiName] = this.recData.Id;

        const recinp = {fields };

        updateRecord(recinp)
            .then(() =>
            {
                this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Recommendation Added Successfully',
                            variant: 'success'
                        })
                    );
                    // Display fresh data in the form
                    // return refreshApex(this.contact);
            
     
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error updating record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
    }
     reject()
    {

        this.showRec = false;
        const fields = {};
         fields[rstatus.fieldApiName] = 'Rejected';
           fields[id.fieldApiName] = this.recData.Id;

       const recinp = {fields };

        updateRecord(recinp)
            .then(() =>
            {
                this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Recommendation Removed ',
                            variant: 'success'
                        })
                    );
                    // Display fresh data in the form
                    // return refreshApex(this.contact);
                               this.dispatchEvent(new CustomEvent('ref'));
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error updating record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
     }
}