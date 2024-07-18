import { LightningElement, wire } from 'lwc';
import getTasks from '@salesforce/apex/TaskController.getTasks';

export default class TaskList extends LightningElement {
    tasks;

    @wire(getTasks)
    wiredTasks({ error, data }) {
        if (data) {
            this.tasks = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleTaskClick(event) {
        const taskId = event.currentTarget.dataset.id;
        const selectEvent = new CustomEvent('taskselect', { detail: taskId });
        this.dispatchEvent(selectEvent);
    }

    handleNewTask() {
        const newTaskEvent = new CustomEvent('newtask');
        this.dispatchEvent(newTaskEvent);
    }
}