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
    topic: string;
    level: string;
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
export interface IAttempt {
    point: number;
    timeCompleted: number;
    correctAnswers: number;
    questionsCompleted?: number;
}
export type ModalContext = {
    openModal: (options?: ModalOptions) => void;
    closeModal: (options?: ModalCloseOptions) => void;
};
export type ModalOptions = {
    questionData?: IQuestion;
    quizData?: IQuiz;
    formName?: string;
};
export type ModalCloseOptions = {
    isDisplayNotification: boolean;
    message: string;
};
export type ShowModal = {
    isShow: boolean;
    formName?: string;
    quizData?: IQuiz;
    questionData?: IQuestion;
    modalName?: string;
};
