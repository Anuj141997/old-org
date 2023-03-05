import { LightningElement, api, wire } from 'lwc';

import getRating from '@salesforce/apex/LeadInfo.getRating';
import getStatus from '@salesforce/apex/LeadInfo.getStatus';

export default class DonutChart extends LightningElement {

    @api recordId;
    text1;
    arc1;
    text2;
    arc2;
    color;
    endAngle;
    endAngle2;
    ratingCol;
    RatText = 56;
    textX = 43;
    textStyle1;
    textStyle2;
    @wire(getRating, { id: '$recordId' })
    rating({ error, data })
    {
        if (data)
        {
            console.log('data :>> ', data);
            if (data == undefined || data == null || data === 'None'||data === '0')
            {
                 this.text1 = 'No Rating';
                this.arc1 = 0;
                this.endAngle = 2 * Math.PI;
                this.ratingCol = '#f2e7e6';
                this.RatText = 50;
                this.textStyle1 = "10px Arial";

            }
            if (data === 'Hot')
            {
               
               
                this.text1 = 'Hot';
                this.arc1 = 0;
                this.endAngle = 2 * Math.PI;
                this.ratingCol = '#f56a25';
                this.textStyle1 = "16px Arial";
            }
             if (data === 'Warm')
            {
               
                this.text1 = 'Warm';
                 this.arc1 = 2.6;
                 this.endAngle = Math.PI + (Math.PI * 1) / 2;
                 this.ratingCol = '#edf72f';
                 this.textStyle1 = "16px Arial";
             }
             if (data === 'Cold')
            {
               
                 this.text1 = 'Cold';
                  this.arc1 = 0.8;
                 this.endAngle = Math.PI + (Math.PI * 1) / 2;
                 this.ratingCol = '#4ccdf5';
                 this.textStyle1 = "16px Arial";
            }
            this.draw1();
         }
     }
    @wire(getStatus, { id: '$recordId' })
    status({error,data}){ 
        if (data)
        {
            console.log('data :>> ', data);
             
            if (data === 'Open - Not Contacted')
            { 
                this.text2 = 'Open';
                this.text3 = 'Not Contacted';
                this.arc2 = 0;
                this.endAngle2 = Math.PI + (Math.PI * 1) / 2;
            }
             if (data === 'Working - Contacted')
            {
               
                this.text2 = 'Working';
                this.text3 = 'Contacted';
                 this.arc2 = 1.6;
                 this.endAngle2 = Math.PI + (Math.PI * 1) / 2;
                  this.textX = 50;
             }
             if (data === 'Closed - Not Converted')
            {
               
                 this.text2 = 'Closed';
                this.text3 = 'Not Converted';
                 this.arc2 = 3.1;
                 this.endAngle2 = Math.PI + (Math.PI * 1) / 2;
             }
              if (data === 'Closed - Converted')
            {
               
                 this.text2 = 'Closed';
                this.text3 = 'Converted';
                  this.arc2 = 0;
                  this.color = '';
                  this.endAngle2 = 2 * Math.PI;
                  this.textX = 50;

            }
            this.draw2();
         }
     }
   
     draw2()
        {
                    var canvas = this.template.querySelector('.circle2');
        if (canvas.getContext)
            {
            var ctx = canvas.getContext('2d'); 
            var X = canvas.width / 2;
            var Y = canvas.height / 2;
            var R = 60;
            ctx.beginPath();
            ctx.arc(X, Y, R, 0, 2 * Math.PI, true);
            ctx.lineWidth =25;
            ctx.strokeStyle = '#f2e7e6';
            ctx.stroke();
             ctx.beginPath();
            ctx.arc(X, Y, R, this.arc2,this.endAngle2, true);
             ctx.lineWidth =25;
            ctx.strokeStyle = '#73de85';
            ctx.stroke();
            ctx.fillText(this.text2, 60, 75);
            ctx.fillText(this.text3, this.textX, 90)
            }
     }
     draw1()
     {
        //  console.log('cirlce 2 :>> ',);
        //  console.log('this.arc1 :>> ', this.arc1);
                    var canvas = this.template.querySelector('.circle1');
        if (canvas.getContext)
            {
            var ctx = canvas.getContext('2d'); 
            var X = canvas.width / 2;
            var Y = canvas.height / 2;
            var R = 60;
             ctx.beginPath();
            ctx.arc(X, Y, R, 0, 2 * Math.PI, true);
            ctx.lineWidth =25;
            ctx.strokeStyle = '#f2e7e6';
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(X, Y, R, this.arc1, this.endAngle, true);
            ctx.lineWidth =25;
            ctx.strokeStyle = this.ratingCol;
            ctx.stroke();
            ctx.font=this.textStyle1;
            ctx.fillText(this.text1,this.RatText,80);
            }
        }
}