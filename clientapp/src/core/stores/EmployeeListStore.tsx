import { flow, makeAutoObservable } from "mobx";
import EmployeeService from "../services/EmployeeService";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import DepartmentService from "../services/DepartmentService";
import { SelectItem } from "@mantine/core";

export class EmployeeListStore {
  isLoading: boolean = false;
  employees: IEmployee[] = [];
  departments: IDepartment[] = [];
  supervisors: IEmployee[] = [];

  editingEmployee: IEmployee = null;
  clickedRowNumber: number = 0;

  constructor() {
    makeAutoObservable(this, {
      loadEmployees: flow,
      saveEmployee: flow,
      delete: flow,
      loadDepartments: flow,
      onSupervisorSearchChange: flow,
    });
  }

  get getSupervisors(): SelectItem[] {
    return this.supervisors.map((s) => {
      return { value: s.id.toString(), label: s.name };
    });
  }

  *onSupervisorSearchChange(name: string) {
    const data: IEmployee[] = yield EmployeeService.getAllByName(name);
    if (data) {
      this.supervisors = [...data];
    }
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

  *loadDepartments(): any {
    this.isLoading = true;
    const data = yield DepartmentService.getAll();
    if (data) {
      this.departments = [...data];
    }
    this.isLoading = false;
  }

  get getDepartmentOptions() {
    return this.departments.map((d) => {
      return { value: d.id.toString(), label: d.name };
    });
  }

  *saveEmployee(): any {
    this.isLoading = true;

    if (this.editingEmployee.id === -1) {
      yield EmployeeService.addEmployee({
        ...this.editingEmployee,
        id: null,
      });
    } else {
      yield EmployeeService.update(this.getEmployee);
    }
    yield this.loadEmployees();

    //create notification
    notifications.show({
      title: "Save employee",
      message: "Save was successful",
      color: "green",
      radius: "md",
      icon: <IconCheck />,
    });

    this.clickRow(0);
    this.isLoading = false;
  }

  get getEmployees() {
    return this.employees;
  }

  get getEmployee(): IEmployee {
    return {
      id: this.editingEmployee?.id,
      name: this.editingEmployee?.name,
      position: this.editingEmployee?.position,
      departmentId: this.editingEmployee?.departmentId,
      supervisorId: this.editingEmployee?.supervisorId,
      inverseSupervisor: this.editingEmployee?.inverseSupervisor,
      password: this.editingEmployee?.password,
      phoneNumber: this.editingEmployee?.phoneNumber,
      userName: this.editingEmployee?.userName,
      supervisor: this.editingEmployee?.supervisor,
      department: this.editingEmployee?.department,
      isSupervisor: this.editingEmployee?.isSupervisor,
    };
  }

  *delete(id: number): any {
    this.isLoading = true;

    yield EmployeeService.delete(id);
    yield this.loadEmployees();

    //create notification
    notifications.show({
      title: "Delete employee",
      message: "Delete employee was successful",
      color: "red",
      radius: "md",
      icon: <IconCheck />,
    });

    this.isLoading = false;
  }

  clickRow(id: number) {
    this.clickedRowNumber = id;

    if (id === 0) {
      //clear
      this.editingEmployee = null;
    } else if (id === -1) {
      //new row
      this.editingEmployee = {
        id: -1,
        name: "",
        position: "",
        phoneNumber: "",
        userName: "",
        password: "",
        supervisorId: -1,
        departmentId: -1,
        isSupervisor: 0,
        department: null,
        inverseSupervisor: [],
        supervisor: null,
      };
    } else {
      //find existing one
      this.editingEmployee = this.employees.find((X) => X.id === id);
    }
  }

  /**
   * Edit property via given key
   * @param value
   */
  onChange(value: any, key: any) {
    this.editingEmployee = {
      ...this.editingEmployee,
      [key]: value,
    };
  }
}
