import { LightningElement ,api, track} from 'lwc';
import frec from '@salesforce/apex/LookUpCont.frec';
export default class Custlookup extends LightningElement {
    @api objname;
    @api fldname;
    @api iconname;  

    @track records;
    errors;
    selectedRecord;
    
    handlesearch(ev)
    {
        const src=ev.detail;
    
        
        frec({
            obj:this.objname,
            fld:this.fldname,
            skey:src
        })
        .then(result=>
            {
                this.records=result;

                for( let i = 0; i < this.records.length; i++){
                    if(this.records[i]){
                        this.records[i].Name = this.records[i][this.fldname];
                        
                    }
                }
                               this.errors=undefined;
            })
        .catch(error=>{
            this.errors=error;
            this.records=undefined;
            console.log('error is ',error);
        });
    }

    handlesel(ev)
    {
        const id=ev.detail;
        const selrec=this.records.find(record=>record.Id===id);
        console.log('record is',selrec);
        this.selectedRecord=selrec;

    }

    handleRemove()
    {
        this.selectedRecord=undefined;
        this.errors=undefined;
        this.records=undefined;

    }

}