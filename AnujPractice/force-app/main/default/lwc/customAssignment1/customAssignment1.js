import { LightningElement ,track} from 'lwc';

export default class CustomAssignment1 extends LightningElement {

    showCon = false;
    showCase = false;
    
    @track options = [
        { label: 'Red', value: 'red' },
        { label: 'Pink', value: 'pink' }
    ];
    conModal()
    {
        this.showCon = true;
    }
    caseModal()
    {
        this.showCase = true;
    }
    
    reset()
    {
        this.showCon = false;
    }
    
    handlechange(e)
    {
        console.log(JSON.stringify(e.detail));
     }
}