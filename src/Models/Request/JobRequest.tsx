import { JobStatus } from "../../Enums/JobStatus";

export interface JobRequest {
    projectId: string
    status: JobStatus
}