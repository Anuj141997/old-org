public with sharing class CalculatorClass {

    @AuraEnabled
    public static integer getsum(integer num1,Integer num2)
    {
        return(num1+num2);
    }
}