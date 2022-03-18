import { taskObject } from "types";

export interface RootState {
    title: String;
    tasks: taskObject[],
    loadEditTask: taskObject,
    showAddTask: Boolean
}