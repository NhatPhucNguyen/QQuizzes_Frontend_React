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
    questionNumber?: number;
    question: string;
    desc?: string;
    selections: ISelection[];
    point: number;
    timeLimit: number;
}
export interface ISelection {
    _id?: string;
    selectionNumber: number;
    desc: string;
    isTrue: boolean;
}
export type ModalContext = {
    openModal: (formName?:string,quizData?:IQuiz) => void;
    closeModal: () => void;
};
export type ShowModal = {
    isShow: boolean;
    formName?: string;
    quizData?: IQuiz;
};
