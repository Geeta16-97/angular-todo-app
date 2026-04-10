export interface Task {
    id: string;
    taskName: string;
    isCompleted: boolean;
    dateCreated: string | null;
}