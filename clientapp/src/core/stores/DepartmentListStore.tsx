import { flow, makeAutoObservable } from "mobx";
import DepatmentService from "../services/DepartmentService";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export class DepartmentListStore {
  isLoading: boolean = false;
  departments: IDepartment[] = [];
  clickedRowNumber: number = 0;
  //for edits only
  editingDepartment: IDepartment = null;

  constructor() {
    makeAutoObservable(this, {
      loadDepartments: flow,
      saveDepartment: flow,
      delete: flow,
    });
  }

  /**
   * load all the departments
   */
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

  /**
   * If there is selected department, then only edit
   * If there is no selected department, then add new one
   */
  *saveDepartment(): any {
    if (
      this.getDepartment.name?.trim() === "" ||
      this.getDepartment.name === null
    ) {
      notifications.show({
        title: "Save was unsuccessful",
        message: "Required fields are missing",
        color: "red",
        radius: "md",
        icon: <IconX />,
      });
      return;
    }

    this.isLoading = true;
    if (this.editingDepartment.id === -1) {
      yield DepatmentService.addDepartment(this.editingDepartment);
    } else {
      yield DepatmentService.update(this.getDepartment);
    }
    yield this.loadDepartments();

    //create notification
    notifications.show({
      title: "Save department",
      message: "Save was successful",
      color: "green",
      radius: "md",
      icon: <IconCheck />,
    });

    this.clickRow(0);
    this.isLoading = false;
  }

  /**
   * delete selected department
   * @param id
   */
  *delete(id: number): any {
    this.isLoading = true;

    yield DepatmentService.delete(id);
    yield this.loadDepartments();

    this.isLoading = false;
  }

  /**
   * Only send as much data to the backend as needed
   */
  get getDepartment() {
    return {
      id: this.editingDepartment?.id,
      name: this.editingDepartment?.name,
    };
  }

  /**
   * If id = 0 then hide Modal and clear editDepartment
   * If id = -1 then it is a new department, appear modal
   * If id > 0 then it is an  existing department, appear modal
   * @param id
   */
  clickRow(id: number) {
    this.clickedRowNumber = id;

    if (id === 0) {
      //clear
      this.editingDepartment = null;
    } else if (id === -1) {
      //new row
      this.editingDepartment = {
        id: -1,
        name: "",
      };
    } else {
      //find existing one
      this.editingDepartment = this.getDepartments.find((X) => X.id === id);
    }
  }

  /**
   * Edit property via given key
   * @param value
   */
  onChange(value: any, key: any) {
    this.editingDepartment = {
      ...this.editingDepartment,
      [key]: value,
    };
  }
}
