import { Project } from "./Project";

export interface TimeSheet {
    id: string;
    taskType: string;
    taskDate: Date;
    week: number;
    year: number;
    month: number;
    dayOfWeek: number;
    taskName: string;
    hour: number;
    project: Project;
}