import { LightningElement,api } from 'lwc';

export default class GetMyPicApp extends LightningElement {

    @api recordId;

    get picUrl()
    {
        return `https://i.pravatar.cc/300?u=${this.recordId}`;
     }
}