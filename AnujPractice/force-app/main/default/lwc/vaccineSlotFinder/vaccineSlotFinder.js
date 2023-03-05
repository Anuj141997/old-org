/**
 * @description       : 
 * @author            : Anuj Panwar
 * @group             : 
 * @last modified on  : 10-13-2022
 * @last modified by  : Anuj Panwar 
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   10-13-2022   Anuj Panwar   Initial Version
**/
import { LightningElement } from 'lwc';

export default class VaccineSlotFinder extends LightningElement {

    centers = [];
    dates = [];
    connectedCallback() {
        // https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=250001&date=19-07-2021
        
        this.fetchSlot();
    }
    
    async fetchSlot(endpoint) {
        const response = await fetch(endpoint);
     
        const slotData = await response.json();

        //console.log(slotData);
        this.buildcolandrow(slotData.centers);
    }

    buildcolandrow(data) {
        const dates = new Map();
        // {"name": {label...}}
        dates.set('name', {
            label: 'Center Name', fieldName: 'name', type: 'text', wrapText: true
        });


        const centers = new Map();

        for (const center of data) {
            !centers.has(center.center_id) && centers.set(center.center_id, { name: center.name });

            for (const ses of center.sessions) {
                //destructring sytnax
                const { date, available_capacity, min_age_limit, vaccine } = ses;
                dates.set(date, {
                    label: date, fieldName: date, type: 'text'
                    , wrapText: true, cellAttributes: { class: { fieldName: 'className' } }
                });
             
                centers.get(center.center_id)[date] = `Vaccine: ${vaccine}
                 Available Capacity: ${available_capacity}
                  Min Age: ${min_age_limit}`;
                
                centers.get(center.center_id).className = available_capacity > 0 ? 'slds-text-color_success' : 'slds-text-color_error';
            }
        }

        this.dates = Array.from(dates.values());
        this.centers = Array.from(centers.values());
        
        console.log('center', centers);
        console.log('dates', dates);
    }

    get hidemsg() {
        return this.centers.length > 0;
    }

    pinCodeHandler(e) {
        const pincode = e.target.value;

        const isEnter = e.keyCode == 13;
        if (pincode.length === 6 && isEnter) {
            const date = new Date();
            const fdate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            const endpoint= `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${fdate}`
            this.fetchSlot(endpoint);

        }

    }
}