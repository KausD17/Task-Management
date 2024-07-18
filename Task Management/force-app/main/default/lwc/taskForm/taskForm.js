import { LightningElement, api } from 'lwc';
import createTask from '@salesforce/apex/TaskController.createTask';
import updateTask from '@salesforce/apex/TaskController.updateTask';

export default class TaskForm extends LightningElement {
    @api task = {};
    statusOptions = [
        { label: 'New', value: 'New' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' }
    ];

   
    // handleChange(event) {
    //     console.log('handleChange called');
    //     const field = event.target.dataset.field;
    //     const value = event.target.value;
    //     console.log(`Field: ${field}, Value: ${value}`);
 
    // }
    handleChange(event) {
        console.log('handleChange called');
        const field = event.target.dataset.field;
        const value = event.target.value;
        console.log(`Field: ${field}, Value: ${value}`);
        
        // Create a new object with the updated field
        this.task = { ...this.task, [field]: value };
        
        console.log('Updated task:', JSON.stringify(this.task));
    }

    handleSave() {

        console.log('Task object at save:', JSON.stringify(this.task));

    if (this.task.Id) {
        console.log('Updating task:', JSON.stringify(this.task));
        updateTask({ task: this.task })
            .then(() => {
                const updateEvent = new CustomEvent('taskupdate');
                this.dispatchEvent(updateEvent);
            })
            .catch(error => {
                console.error('Error updating task:', JSON.stringify(error));
                if (error.body && error.body.message) {
                    console.error('Error message:', error.body.message);
                }
            });
        } else {
            createTask({ task: this.task })
                .then(() => {
                    const createEvent = new CustomEvent('taskcreate');
                    this.dispatchEvent(createEvent);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
}
