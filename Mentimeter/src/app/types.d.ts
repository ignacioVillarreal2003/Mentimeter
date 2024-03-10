export type Room = 'Feedback' | 'MultipleChoice' | 'Brainstorming' | 'Quiz';

/* User */
export interface IUser{
    username: string,
    password: string
}

/* Feedback */
export interface IRoomFeedback{
    username: string,
    roomCode: string,
    roomType: Room,
    content: IFeedbackContent[]
}

export interface IRoomAnswerFeedback{
    roomCode: string,
    content: IFeedbackContent
}

export interface IFeedbackContent{
    question: string,
    rating: [number, number, number, number, number]
}

/* Multiple choice */
export interface IRoomMultipleChoice{
    username: string,
    roomCode: string,
    roomType: Room,
    content: IMultipleChoiceContent[]
}

export interface IRoomAnswersMultipleChoice{
    roomCode: string,
    content: IMultipleChoiceContent
}

export interface IMultipleChoiceContent{
    question: string,
    optionsMultipleChoice: IMultipleChoiceOption[]
}

export interface IMultipleChoiceOption {
    option: string,
    rating: number
}

/* Brainstorming */
export interface IRoomBrainstorming{
    username: string,
    roomCode: string,
    roomType: Room,
    content: IBrainstormingContent[]
}

export interface IRoomAnswersBrainstorming{
    roomCode: string,
    content: IBrainstormingContent
}

export interface IBrainstormingContent {
    question: string,
    ideas: string[]
}

/* Quiz */
export interface IRoomQuiz{
    username: string,
    roomCode: string,
    roomType: Room,
    content: IQuizContent[]
}

export interface IRoomAnswersQuiz{
    roomCode: string,
    content: IQuizContent
}

export interface IQuizContent{
    question: string,
    optionsQuiz: IQuizOption[]
}

export interface IQuizOption{
    option: string,
    isCorect: boolean,
    quantity: number
}