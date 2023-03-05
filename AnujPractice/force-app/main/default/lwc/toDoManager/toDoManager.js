import { LightningElement, track } from 'lwc';
import addtodo from '@salesforce/apex/ToDoController.addTodo';
import getAllTodos from '@salesforce/apex/ToDoController.getAllTodos';


export default class ToDoManager extends LightningElement {

     time;
    greet;
    
   @track todos = [];

    connectedCallback()
    {
        this.getTime();
        this.fetchTodo();

        setInterval(() =>
        {
            this.getTime();
             this.fetchTodo();
         },1000*60)
    }
    

    getTime()
    {
        const date = new Date();
        const hrs = date.getHours();
        const min = date.getMinutes();

        this.time = `${this.getHour(hrs)}:${this.getDoubleDigit(min)} ${this.getMidDay(hrs)}`;

        this.setGreet(hrs);

    }

    getHour(hour)
    {
        return hour === 0 ? 12 : hour > 12 ? (hour - 12) : hour;
    }
    
    getMidDay(hour)
    {
        return hour >= 12 ? 'PM' : 'AM';
    }
    
    getDoubleDigit(min)
    {
        return min < 10 ? '0' + min : min;

     }
    
    setGreet(hour)
    {
        console.log('hour :>> ', hour);
        if (hour < 12)
        {
            this.greet = 'Good Morning';
        }
         if (hour >= 12 && hour <17)
        {
            this.greet = 'Good Afternoon';
         }
         else
        {
            this.greet = 'Good Evening';
         }
    }
    
    AddToDo()
    {
        const inpBox = this.template.querySelector('lightning-input');
       
        const todo = {
            todoName: inpBox.value,
            done: false,
           
        }
        
        addtodo({ payload: JSON.stringify(todo) }).then(result =>
        {
            console.log('Item inserted');
            this.fetchTodo();
        }).catch(error =>
        {
            console.error('Error in inserting Todo ' + error);
         })
        //  this.todos.push(todo);
        inpBox.value = '';
       
    }

   updateData()
   {
       console.log(' :>> update', );
        this.fetchTodo();
   }
    deleteData()
    {
         console.log(' :>> delete', );
        this.fetchTodo();
     }

    fetchTodo()
    {
        getAllTodos().then(res =>
        {
            if (res)
            {
                this.todos = res;
                console.log('this.todos :>> ', this.todos);
             }
        }).catch(error =>
        {
            console.log('error :>> ', error);
         })
     }
    
    get upcomingTask()
    {
        return this.todos && this.todos.length
            ? this.todos.filter(todo => !todo.done) : [];
    
    }
     get completedTask()
    {
        return this.todos && this.todos.length
            ? this.todos.filter(todo => todo.done) : [];
    
     }
    
  
}