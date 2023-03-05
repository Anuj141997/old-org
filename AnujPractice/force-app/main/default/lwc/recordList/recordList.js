import { api, LightningElement } from 'lwc';

export default class RecordList extends LightningElement {
    @api record;

    handleselect()
    {
        const e=new CustomEvent('select',
        {
            detail:this.record.Id
        });
     this.dispatchEvent(e);
    }
}