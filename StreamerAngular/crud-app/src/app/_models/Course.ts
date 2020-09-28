import { Projects } from "../projects";

export interface Course {
    id: number; 
    name: string;
    projects: Projects[];
}
