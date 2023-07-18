export interface IUser {
    _id?: string;
    username: string;
    password: string;
    email: string;
    purpose?: string;
    fullName: string;
    educationInstitution?: string;
    job?: string;
    role?: string;
}
export interface IAlert {
    isShow: boolean;
    message: string;
}
export interface Collection {
    _id?: string;
    collectionName: string;
    topic?: string;
    level?: string;
    quantity?: string;
}
export interface IQuiz {
    _id?: string;
    number: number;
    question: string;
    desc?: string;
    selections: Selection[];
    answerNumber: number;
    point: number;
    timeLimit: number;
}
export interface Selection {
    _id?: string;
    number: number;
    desc: string;
    isAnswer: boolean;
}
