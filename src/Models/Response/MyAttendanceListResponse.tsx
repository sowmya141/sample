
export interface MyAttendanceListResponse {
    date: Date;
    week: number;
    year: number;
    month: number;
    dayOfWeek: number;
    inDate: Date;
    inLocation: string;
    outDate: Date;
    outLocation: string;
    duration: string;
}