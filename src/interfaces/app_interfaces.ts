export interface User {
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
export interface Alert {
    isShow: boolean;
    message: string;
}
export interface Quiz {
    numberOfPlays: number;
    _id: string;
    quizName: string;
    topic: string;
    level: string;
    quantity: number;
    timeLimit: number;
    totalPoints: number;
    updatedAt: Date;
}
export interface Question {
    _id?: string;
    questionNumber?: number;
    question: string;
    desc?: string;
    selections: Selection[];
    point: number;
    timeLimit: number;
}
export interface Selection {
    _id?: string;
    desc: string;
    isTrue: boolean;
}
export interface Result {
    highestPoint: number;
    timeCompleted: number;
    correctAnswers: number;
    questionsCompleted?: number;
    attempts?: number;
}

export interface IPlayer {
    userId: string;
    quizParticipated: string;
    displayName: string;
    result: Result;
}

export type ModalContext = {
    isShowModal: boolean;
    openModal: (options?: ModalOptions) => void;
    closeModal: (options?: ModalCloseOptions) => void;
};
export type ModalOptions = {
    questionData?: Question;
    quizData?: Quiz;
    formName?: string;
};
export type ModalCloseOptions = {
    isDisplayNotification: boolean;
    message: string;
};
export type ShowModal = {
    isShow: boolean;
    formName?: string;
    quizData?: Quiz;
    questionData?: Question;
    modalName?: string;
};
