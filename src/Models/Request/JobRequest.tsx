import { JobStatus } from "src/Enums/JobStatus";

export interface JobRequest {
    projectId: string
    status: JobStatus
}