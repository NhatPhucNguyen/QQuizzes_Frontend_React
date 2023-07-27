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
export interface ICollection {
    _id?: string;
    collectionName: string;
    topic?: string;
    level?: string;
    quantity?: number;
}
export interface IQuiz {
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
    openModal: (formName?:string,collectionData?:ICollection) => void;
    closeModal: () => void;
};
export type ShowModal = {
    isShow: boolean;
    formName?: string;
    collectionData?: ICollection;
};
