public with sharing class TaskController {
    @AuraEnabled(cacheable=true)
    public static List<Task__c> getTasks() {
        return [SELECT Id, Name, Description__c, Status__c, Due_Date__c FROM Task__c];
    }

    @AuraEnabled
    public static void createTask(Task__c task) {
        insert task;
    }

    @AuraEnabled
    public static void updateTask(Task__c task) {
        update task;
    }

    @AuraEnabled
    public static void deleteTask(Id taskId) {
        Task__c task = [SELECT Id FROM Task__c WHERE Id = :taskId];
        delete task;
    }
}