export interface JobCheckInResponse {
    id: string;
    projectId: string;
    checkInDate: Date;
    latitude: string;
    longitude: string;
    location: string;
}