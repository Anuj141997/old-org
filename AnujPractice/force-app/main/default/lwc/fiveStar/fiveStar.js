import { LightningElement,api } from 'lwc';

export default class FiveStar extends LightningElement {

    ratingValue;
    @api cvalue;

    renderedCallback()
    {
        if (this.cvalue === '5') {
            
            this.template.querySelector('.star15').checked = true;
        }
          if (this.cvalue === '4') {
            
            this.template.querySelector('.star14').checked = true;
          }
          if (this.cvalue === '3') {
            
            this.template.querySelector('.star13').checked = true;
          }
          if (this.cvalue === '2') {
            
            this.template.querySelector('.star12').checked = true;
          }
          if (this.cvalue === '1') {
            
              this.template.querySelector('.star11').checked = true;
              
          }
        if (this.cvalue === undefined) {
            
            //   this.template.querySelector('.star11').checked = true;
            //  this.template.querySelector('.star11').checked = true;
              
        }
     }

 
  rating(event) {
      if (event.target.name === "five") {
          this.template.querySelector('.star15').checked = true;
             
            this.ratingValue = event.target.value;
       
          this.dispatch();
    }
      if (event.target.name === "four") {
         
                this.template.querySelector('.star15').checked = false;
                this.template.querySelector('.star11').checked = false;
                this.template.querySelector('.star13').checked = false;
                this.template.querySelector('.star12').checked = false;
                this.template.querySelector('.star14').checked = true;
        
          this.ratingValue = event.target.value;
          
          this.dispatch();
    }
      if (event.target.name === "three") {
         
            this.template.querySelector('.star15').checked = false;
            this.template.querySelector('.star14').checked = false;
            this.template.querySelector('.star11').checked = false;
            this.template.querySelector('.star12').checked = false;
            this.template.querySelector('.star13').checked = true;
         
          this.ratingValue = event.target.value;
          
          this.dispatch();
    }
      if (event.target.name === "two") {
         
            this.template.querySelector('.star15').checked = false;
          this.template.querySelector('.star14').checked = false;
                this.template.querySelector('.star13').checked = false;
         this.template.querySelector('.star11').checked = false;
          this.template.querySelector('.star12').checked = true;
          // this.template.querySelector('.star11').checked = false;
          this.ratingValue = event.target.value;
          
         this.dispatch();
    }
      if (event.target.name === "one") {
         
              this.template.querySelector('.star15').checked = false;
          this.template.querySelector('.star14').checked = false;
                this.template.querySelector('.star13').checked = false;
         this.template.querySelector('.star12').checked = false;

           this.template.querySelector('.star11').checked = true;
      this.ratingValue = event.target.value; 
    
          this.dispatch();
      }
  }
    
    dispatch()
    {
        this.dispatchEvent(new CustomEvent('val',
            {
                detail: this.ratingValue
            }));
     }

}