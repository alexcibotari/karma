import {Component, OnInit} from "@angular/core";
import {ProjectService} from "./project.service";
import {Project} from "./project.model";

@Component({
    moduleId: module.id,
    templateUrl: 'project.component.html',
    styleUrls: ['project.component.css'],
    providers: [ProjectService]
})
export class ProjectComponent implements OnInit{
    projects:Project[] = [];
    ngOnInit(): void {
        this.projects = this.projectService.getAll();
    }
    constructor(private projectService:ProjectService){

    }
}
