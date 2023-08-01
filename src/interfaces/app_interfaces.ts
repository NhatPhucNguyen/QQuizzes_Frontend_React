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
export interface IQuiz {
    _id?: string;
    quizName: string;
    topic?: string;
    level?: string;
    quantity?: number;
}
export interface IQuestion {
    _id?: string;
    questionNumber: number;
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
export type ModalContext = {
    openModal: (formName?:string,collectionData?:IQuiz) => void;
    closeModal: () => void;
};
export type ShowModal = {
    isShow: boolean;
    formName?: string;
    quizData?: IQuiz;
};
