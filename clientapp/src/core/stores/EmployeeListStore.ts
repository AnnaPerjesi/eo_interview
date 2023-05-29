import { flow, makeAutoObservable } from "mobx";
import EmployeeService from "../services/EmployeeService";

export class EmployeeListStore {
  isLoading: boolean = false;
  employees: IEmployee[] = [];

  constructor() {
    makeAutoObservable(this, {
      loadEmployees: flow,
    });
  }

  *loadEmployees(): any {
    this.isLoading = true;
    const data = yield EmployeeService.getAll();
    if (data) {
      this.employees = [...data];
    }
    this.isLoading = false;

    console.log(this.employees);
  }

  get getDepartments() {
    return this.employees;
  }
}
