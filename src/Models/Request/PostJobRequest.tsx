export interface PostJobRequest {
    name: string;
    description: string;
    accountId: string;
    departmentId: string;
    startDate: Date;   
    endDate: Date;
}