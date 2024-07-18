import { LightningElement, track } from 'lwc';
import getTasks from '@salesforce/apex/TaskController.getTasks';

export default class TaskManager extends LightningElement {
    @track selectedTask;
    @track showTaskForm = false;

    handleTaskSelect(event) {
        console.log('Handling new Task Select');
        const taskId = event.detail;
        getTasks()
            .then(tasks => {
                this.selectedTask = tasks.find(task => task.Id === taskId);
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleNewTask() {
        
        this.selectedTask = {};
        this.showTaskForm = true;
    }

    handleEditTask(event) {
        const taskId = event.detail;
        getTasks()
            .then(tasks => {
                this.selectedTask = tasks.find(task => task.Id === taskId);
                this.showTaskForm = true;
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleDeleteTask() {
        this.selectedTask = null;
        this.showTaskForm = false;
    }

    handleTaskCreate() {
        this.showTaskForm = false;
        this.refreshTaskList();
    }

    handleTaskUpdate() {
        this.showTaskForm = false;
        this.refreshTaskList();
    }

    refreshTaskList() {
        // You may implement code to refresh the task list if required
    }
}
