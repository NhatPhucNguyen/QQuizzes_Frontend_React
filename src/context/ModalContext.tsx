import { ReactNode, createContext, useContext, useState } from "react";
import {
    IAlert,
    IQuestion,
    IQuiz,
    ShowModal,
} from "../interfaces/app_interfaces";

type ModalValues = {
    notification: IAlert;
    showModal: ShowModal;
    openModal: (options: ModalOptions) => void;
    closeModal: (options?: ModalCloseOptions) => void;
    closeNotification: () => void;
};
type ModalOptions = {
    questionData?: IQuestion;
    quizData?: IQuiz;
    formName?: string;
};
type ModalCloseOptions = {
    isDisplayNotification: boolean;
    message: string;
};
const ModalContext = createContext<ModalValues | null>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [showModal, setShowModal] = useState<ShowModal>({ isShow: false });
    const [notification, setNotification] = useState<IAlert>({
        isShow: false,
        message: "",
    });
    //close notification
    const closeNotification = () => {
        setNotification({ isShow: false, message: "" });
    };
    //open specific form modal
    const openModal = ({ formName, quizData, questionData }: ModalOptions) => {
        setShowModal({
            ...showModal,
            isShow: true,
            formName: formName,
            quizData: quizData,
            questionData: questionData,
        });
        setNotification({ ...notification, isShow: false });
    };
    //close modal
    const closeModal = (options?: ModalCloseOptions) => {
        setShowModal({ ...showModal, isShow: false });
        if (options?.isDisplayNotification) {
            setNotification({ isShow: true, message: options.message });
        }
    };
    return (
        <ModalContext.Provider
            value={{
                openModal,
                closeModal,
                showModal,
                notification,
                closeNotification,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModalContext must be used within ModalProvider");
    }
    return context;
};
export default ModalProvider;
