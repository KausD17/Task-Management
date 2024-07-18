import { LightningElement, api } from 'lwc';
import deleteTask from '@salesforce/apex/TaskController.deleteTask';

export default class TaskDetail extends LightningElement {
    @api task;

    handleEdit() {
        const editEvent = new CustomEvent('edittask', { detail: this.task.Id });
        this.dispatchEvent(editEvent);
    }

    handleDelete() {
        deleteTask({ taskId: this.task.Id })
            .then(() => {
                const deleteEvent = new CustomEvent('deletetask', { detail: this.task.Id });
                this.dispatchEvent(deleteEvent);
            })
            .catch(error => {
                console.error(error);
            });
    }
}
