import { flow, makeAutoObservable } from "mobx";
import DepatmentService from "../services/DepartmentService";

export class DepartmentListStore {
  isLoading: boolean = false;
  departments: IDepartment[] = [];

  constructor() {
    makeAutoObservable(this, {
      loadDepartments: flow,
    });
  }

  *loadDepartments(): any {
    this.isLoading = true;
    const data = yield DepatmentService.getAll();
    if (data) {
      this.departments = [...data];
    }
    this.isLoading = false;

    console.log(this.departments);
  }

  get getDepartments() {
    return this.departments;
  }
}
