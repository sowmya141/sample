
export interface HealthAnswerData {
    answersArray: HealthAnswerResponse[];
}

export interface HealthAnswerResponse {
    id: string;
    question: string;
}