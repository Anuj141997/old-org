import { LightningElement, track } from 'lwc';
const options = [
    { label: "India", value: "India" },
    { label: "USA", value: "USA" },
    { label: "China", value: "China" },
    { label: "Rusia", value: "Rusia" },
    { label: "Australia", value: "Australia" },
    { label: "UK", value: "UK" },
    { label: "Pakistan", value: "Pakistan" },
    { label: "Japan", value: "Japan" },
    { label: "Malasiya", value: "Malasiya" },
    { label: "HongKong", value: "HongKong" },
    { label: "Siangapore", value: "Siangapore" },
    { label: "Chile", value: "Chile" },
    { label: "Srilanka", value: "Srilanka" },
    { label: "Meerut", value: "Meerut" },
    { label: "Agra", value: "Agra" },
    { label: "Delhi", value: "Delhi" },
    { label: "Mumbai", value: "Mumbai" },
    { label: "LOndon", value: "LOndon" },
    { label: "Jammu", value: "Jammu" },
    { label: "CHennai", value: "CHennai" },
    { label: "Goa", value: "Goa" },
    { label: "Alaska", value: "Alaska" },
    { label: "Canada", value: "Canada" },
    { label: "Korea", value: "Korea" },
    { label: "Bihar", value: "Bihar" },
    { label: "Patna", value: "Patna" },
    { label: "Bengal", value: "Bengal" },
    { label: "Noida", value: "Noida" },
    { label: "Austria", value: "Austria" },
    { label: "Egypt", value: "Egypt" },
    { label: "California", value: "California" },
    { label: "Tornto", value: "Tornto" },
    { label: "Lucknow", value: "Lucknow" },
    { label: "Bhuni", value: "Bhuni" },
    { label: "Anuj", value: "Anuj" },
    { label: "Ankit", value: "Ankit" }
  ];
  
 
export default class MultiSelectPickListParent extends LightningElement {
    @track selectedValue;
    @track selectedValueList = [];
    @track options = options;
     
    //for single select picklist
    handleSelectOption(event){
        console.log(event.detail);
        this.selectedValue = event.detail;
    }
 
    //for multiselect picklist
    handleSelectOptionList(event){
        console.log(event.detail);
        this.selectedValueList = event.detail;
        console.log(this.selectedValueList);
    }
}