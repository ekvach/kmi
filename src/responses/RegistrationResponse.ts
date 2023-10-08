export interface RegistrationResponse {
    approvedBy: number;
    approvedDate: string;
    id: number;
    completionDate: string;
    courseId: number;
    createdDate: string;
    declinedBy: number;
    declinedDate: string;
    expirationDate: string;
    initialLaunchDate: string;
    lastLaunchDate: string;
    postAssessmentPercentage: number;
    postAssessmentPoints: number;
    preAssessmentPercentage: number;
    preAssessmentPoints: number;
    registrationDate: number;
    statusId: number;
    statusName: string;
    targetCompletionDate: string;
    updatedDate: string;
    userId: number;
    evaluation: EvaluationResult;
    postAssessment: AssessmentResult;
    preAssessment: AssessmentResult;
    creditTypes: CourseRegistrationCreditType;
    mandatory: boolean;
}

interface EvaluationResult {
    completionDate: string;
    createdDate: string;
    id: number;
    questionDelivery: string;
    startDate: string;
    status: string;
    updatedDate: string
}

interface AssessmentResult {
    completionDate: string;
    createdDate: string;
    gradeType: string;
    id: number;
    passingScore: number;
    questionDelivery: string;
    randomQuestionCount: number;
    score: number;
    startDate: string;
    status: string;
    updatedDate: string;
}

interface CourseRegistrationCreditType {
    creditTypeId: number;
    creditTypeName: string;
    creditAmount: number;
}
