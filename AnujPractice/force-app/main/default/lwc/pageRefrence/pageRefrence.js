import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class PageRefrence extends NavigationMixin(LightningElement){

    navtoSmartPharma()
    {
        this[NavigationMixin.Navigate]({
                    type: 'standard__app',
                    attributes:
                    {
                        appTarget: 'c__SmartPharma',
                        pageRef:{
                            type: 'standard__recordPage',
                            attributes:{
                                actionName:'view',
                                recordId:'a005g00002q9v36AAA',
                                objectApiName:'Hospital__c'
                            },
                        }
                    }
        });
    }

    navtoRecordPage()
    {
        let pf={
            type: 'standard__recordPage',
            attributes:
            {
                recordId:'0015g0000090ZeyAAE',
                objectApiName:'Account',
                actionName:'view'
            },         
        };
        this[NavigationMixin.Navigate](pf,true);
    }

    navtoRecordEdit()
    {
        let pf={
            type: 'standard__recordPage',
            attributes:
            {
                recordId:'0015g0000090ZeyAAE',
                objectApiName:'Account',
                actionName:'edit'
            },         
        };
        this[NavigationMixin.Navigate](pf,true);
    }

    navtoRecordNew()
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:
            {
                //recordId:'0015g0000090ZeyAAE',
                objectApiName:'Account',
                actionName:'new'
            },        
        
        }); 
    }
    navtoObjectHome()
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:
            {
                //recordId:'0015g0000090ZeyAAE',
                objectApiName:'Account',
                actionName:'home'
            },        
        
        }); 
    }

    navtoObjectRelation(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes:
            {
                recordId:'0015g0000090ZYwAAM',
                objectApiName:'Account',
                actionName:'view',
                relationshipApiName:'Contacts'
            },        
        
        }); 
    }
}