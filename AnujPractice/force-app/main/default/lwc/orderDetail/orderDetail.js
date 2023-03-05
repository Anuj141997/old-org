import { LightningElement,wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import ord from '@salesforce/apex/BeerController.orderDet';


export default class OrderDetail extends NavigationMixin(LightningElement) {

    orderid;
    orderInfo;
    orderItems;

    @wire(CurrentPageReference)
        setCurrentPageReference(currentPageReference) {
            this.orderid = currentPageReference.state.c__orderId;
            console.log(' order Id => ', this.orderid);
    }
    
    connectedCallback()
    {
        this.getOrderDetails();
    }
    
    getOrderDetails()
    {
        ord({
            ordId: this.orderid
        })
            .then(result =>
            {
                this.orderInfo = result.order;
                this.orderItems = result.orderItems;
            })
            .catch(error=>
            {
                console.log('error', error);
                })

     }
}