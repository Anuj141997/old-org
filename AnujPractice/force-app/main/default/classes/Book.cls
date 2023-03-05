public class Book {

    public integer bookid;
    public string bookn;
    public string auth;
    public decimal price;
    
    public void disperc(integer i)
    {
        price=price-(i*price)/100;
    }
    public Book(integer bookid,string bookn,string auth,decimal price)
    {
        this.bookid=bookid;
        this.bookn=bookn;
        this.auth=auth;
        this.price=price;
    }
    public void print()
    {
        System.debug('Book ID: '+bookid);
        System.debug('Book Name: '+bookn);
        System.debug('Book Author: '+auth);
        System.debug('Book Price: '+price);
    }
}