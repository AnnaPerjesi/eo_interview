import {
  Button,
  Checkbox,
  Group,
  Modal,
  Select,
  Table,
  TextInput,
  rem,
} from "@mantine/core";
import React from "react";
import { observer } from "mobx-react";
import { EmployeeListStore } from "../core/stores/EmployeeListStore";
import { Edit, Trash } from "tabler-icons-react";
import { IconCirclePlus } from "@tabler/icons-react";

class EmployeeList extends React.Component {
  private employeeListStore: EmployeeListStore;

  constructor(props: any) {
    super(props);
    this.employeeListStore = new EmployeeListStore();
  }

  componentDidMount(): void {
    this.employeeListStore.loadEmployees();
    this.employeeListStore.loadDepartments();
  }

  render() {
    if (this.employeeListStore.isLoading) return <div>Loading..</div>;

    const rows = this.employeeListStore.getEmployees.map((element) => (
      <tr key={element.id}>
        <td>
          <Edit
            onClick={() => this.employeeListStore.clickRow(element.id)}
            size={24}
            strokeWidth={2}
            color={"green"}
            cursor={"pointer"}
          />
        </td>
        <td>
          <Trash
            size={24}
            strokeWidth={2}
            color={"red"}
            cursor={"pointer"}
            onClick={() => null}
          />
        </td>
        <td>{element.name}</td>
        <td>{element.position}</td>
        <td>{element.phoneNumber}</td>
        <td>{element.department?.name}</td>
      </tr>
    ));

    return (
      <>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => this.employeeListStore.clickRow(-1)}
            leftIcon={<IconCirclePlus size={rem(18)} />}
          >
            Add department
          </Button>
        </div>

        {this.employeeListStore.clickedRowNumber != 0 ? (
          <div>
            <Modal
              opened={true}
              onClose={() => this.employeeListStore.clickRow(0)}
              title={
                this.employeeListStore.clickedRowNumber > 0
                  ? "Edit employee's data"
                  : "Add employee"
              }
            >
              <TextInput
                label="Name"
                placeholder="Enter name..."
                value={this.employeeListStore.editingEmployee?.name}
                onChange={(event) =>
                  this.employeeListStore.onChange(event.target.value, "name")
                }
              />

              <TextInput
                label="Position"
                placeholder="Enter position..."
                value={this.employeeListStore.editingEmployee?.position}
                onChange={(event) =>
                  this.employeeListStore.onChange(
                    event.target.value,
                    "position"
                  )
                }
              />

              <TextInput
                label="Phone number"
                placeholder="Enter phone number..."
                value={this.employeeListStore.editingEmployee?.phoneNumber}
                onChange={(event) =>
                  this.employeeListStore.onChange(
                    event.target.value,
                    "phoneNumber"
                  )
                }
                type="number"
              />

              <TextInput
                label="User name"
                placeholder="Enter user name..."
                value={this.employeeListStore.editingEmployee?.userName}
                onChange={(event) =>
                  this.employeeListStore.onChange(
                    event.target.value,
                    "userName"
                  )
                }
              />

              <TextInput
                label="Password"
                placeholder="Enter password..."
                value={this.employeeListStore.editingEmployee?.password}
                onChange={(event) =>
                  this.employeeListStore.onChange(
                    event.target.value,
                    "password"
                  )
                }
                type="password"
              />

              <Checkbox
                style={{ marginTop: "1rem" }}
                label="Is supervisor?"
                checked={!!this.employeeListStore.editingEmployee?.isSupervisor}
                onChange={(event) =>
                  this.employeeListStore.onChange(
                    event.currentTarget.checked ? 1 : 0,
                    "isSupervisor"
                  )
                }
              />

              <Select
                label="Department"
                placeholder="Pick one"
                value={this.employeeListStore.editingEmployee?.departmentId?.toString()}
                data={this.employeeListStore.getDepartmentOptions as any}
                onChange={(value) =>
                  this.employeeListStore.onChange(value, "departmentId")
                }
              />

              <Select
                label="Supervisor"
                placeholder="Pick one"
                value={this.employeeListStore.editingEmployee?.supervisorId?.toString()}
                data={this.employeeListStore.getSupervisors}
                searchable
                onSearchChange={(value) =>
                  this.employeeListStore.onSupervisorSearchChange(value)
                }
                onChange={(value) =>
                  this.employeeListStore.onChange(value, "supervisorId")
                }
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <Group>
                  <Button
                    onClick={() => this.employeeListStore.clickRow(0)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => this.employeeListStore.saveEmployee()}
                    variant="filled"
                  >
                    Save
                  </Button>
                </Group>
              </div>
            </Modal>
          </div>
        ) : null}

        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Position</th>
              <th>Phone number</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </>
    );
  }
}

export default observer(EmployeeList);
