import { api, LightningElement } from 'lwc';

import deleteTodo from '@salesforce/apex/ToDoController.deleteTodo';
import updateTodo from '@salesforce/apex/ToDoController.updateTodo';

export default class ToDoItem extends LightningElement {

    @api toid;
    @api todoname;
    @api done = false;

  
    get todoclass()
    {
        return this.done ? 'container todo-comp' : 'container todo-up';
    }
    
     get iconName()
    {
        return this.done ? 'utility:check' : 'utility:add';
     }
    
    updateHandler()
    {
        const todo =
        {
            todoId: this.toid,
            todoName: this.todoname,   
            done: !this.done
        };

        updateTodo({ payload: JSON.stringify(todo) }).then(res =>
        {
            const ev = new CustomEvent('update');
            this.dispatchEvent(ev);
           
                console.log(' Item Updated  ' );

           
           
        }).catch(error =>
        {
            console.log('error :>> ', error);
         })
    }

    deleteHandler()
    {

        deleteTodo({ todoId: this.toid }).then(res => {
           
            const ev = new CustomEvent('delete');
            this.dispatchEvent(ev);
            console.log('Deleted  ');
            // this.dispatchEvent(new CustomEvent('delete'));
          
        }).catch(error =>
        {
            console.log('error :>> ', error);
         })
     }

}