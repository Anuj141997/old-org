import { LightningElement,api } from 'lwc';

export default class CarMain extends LightningElement {

    ctypeId;
     typeNm;

    carTypeHandler(ev)
    {
        this.ctypeId = ev.detail;
        // console.log('main', this.ctypeId);
    }
    
    handleName(ev)
    {
        this.typeNm = ev.detail;
        // console.log('main', this.typeNm);
     }
}