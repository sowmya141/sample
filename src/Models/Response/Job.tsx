export interface Job {
    id: string;
    name: string;
    description: string;
    departmentId: string;
    departmentName: string;
    lat: string;
    lon: string;
    location: string;
    startDate: Date;
    endDate: Date;
    hospitalName?: string;
}