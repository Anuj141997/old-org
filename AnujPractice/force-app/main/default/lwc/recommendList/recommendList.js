import { LightningElement, api, wire,track } from 'lwc';
import getRec from '@salesforce/apex/GetRecommendations.getRec';
import { refreshApex } from '@salesforce/apex';

export default class RecommendList extends LightningElement {

    @api recordId;
    @track Data = [];
    @track wiredData = [];
        
    count;
    isData = false;

    //  connectedCallback()
    // {
    //      refreshApex(this.wiredData);
    //      console.log('con this.wiredData :>> ',  this.wiredData);
    // }
    

    @wire(getRec, { id: '$recordId' })
    recommends(result) {
        this.wiredData = result;
        if (result.data)
        {
            this.Data = result.data;
            this.count = result.data.length;
            if (result.data.length > 0)
            {
                this.isData = true;
            }
            
            console.log('this.Data :>> ', this.Data);
            refreshApex(this.wiredData);
           console.log('this.Data ref :>> ', this.Data);
        }
        if (result.error)
        {
            console.log(error);
         }
    }
    renderedCallback()
    {
        refreshApex(this.wiredData);
        console.log(' ren this.wiredData :>> ', this.wiredData);
     }
   

    refresh()
    {
        refreshApex(this.wiredData);
        console.log('refff this.wiredData :>> ',  this.wiredData);
     }

    get isDate()
    {
        const d = new Date().toLocaleDateString('En-en', {
            month: 'short',
            year: 'numeric',
            day: 'numeric',
            weekday: 'short'
        });
        return d;
     }
}