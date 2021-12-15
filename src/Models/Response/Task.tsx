import { TimeSheet } from "./TimeSheet";

export interface Task {
    fromDate: Date;
    toDate: Date;
    timeSheets: TimeSheet[];
    nextDate: Date;
    prevDate: Date;
}
