import { Course } from "./Course";
import { ProjectStatus } from "./ProjectStatus";

export interface Projects {
     id: number;
     name: string;
     image: string;
     why: string;
     what: string;
     whatWillWeDo: string;
     projectStatus: ProjectStatus;
     course: Course;
     courseId: number;
}
