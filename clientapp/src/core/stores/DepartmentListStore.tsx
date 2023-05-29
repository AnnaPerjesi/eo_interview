import { flow, makeAutoObservable } from "mobx";
import DepatmentService from "../services/DepartmentService";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

export class DepartmentListStore {
  isLoading: boolean = false;
  departments: IDepartment[] = [];
  clickedRowNumber: number = 0;
  //for edits only
  editingDepartment: IDepartment = null;

  constructor() {
    makeAutoObservable(this, {
      loadDepartments: flow,
      addDepartment: flow,
    });
  }

  *loadDepartments(): any {
    this.isLoading = true;
    const data = yield DepatmentService.getAll();
    if (data) {
      this.departments = [...data];
    }
    this.isLoading = false;
  }

  get getDepartments() {
    return this.departments;
  }

  *addDepartment(): any {
    this.isLoading = true;
    if (this.editingDepartment.id === -1) {
      yield DepatmentService.addDepartment(this.editingDepartment);
    } else {
      yield DepatmentService.update(this.getDepartment);
    }
    yield this.loadDepartments();

    notifications.show({
      title: "Add department",
      message: "Save was successful",
      color: "green",
      radius: "md",
      icon: <IconCheck />,
    });

    this.clickRow(0);
    this.isLoading = false;
  }

  *delete(id: number): any {
    this.isLoading = true;

    yield DepatmentService.delete(id);
    yield this.loadDepartments();

    this.isLoading = false;
  }

  get getDepartment() {
    return {
      id: this.editingDepartment?.id,
      name: this.editingDepartment?.name,
    };
  }

  clickRow(id: number) {
    this.clickedRowNumber = id;

    if (id === 0) {
      this.editingDepartment = null;
    } else if (id === -1) {
      //new row
      this.editingDepartment = {
        id: -1,
        name: "",
      };
    } else {
      this.editingDepartment = this.departments.find((X) => X.id === id);
    }
  }

  onChange(value: any) {
    this.editingDepartment = {
      ...this.editingDepartment,
      name: value,
    };
  }
}
