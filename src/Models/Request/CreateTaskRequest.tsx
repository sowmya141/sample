export interface CreateTaskRequest {
    taskName: string;
    hour: number;
    projectId: string;
    taskTypeId: string;
    taskDate: string;
}