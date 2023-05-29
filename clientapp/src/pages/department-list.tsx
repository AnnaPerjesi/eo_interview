import { Button, Modal, Table, TextInput, rem } from "@mantine/core";
import React from "react";
import { DepartmentListStore } from "../core/stores/DepartmentListStore";
import { observer } from "mobx-react";
import { IconBrandTwitter, IconCirclePlus } from "@tabler/icons-react";
import { Edit, Trash } from "tabler-icons-react";

class DepartmentList extends React.Component {
  private departmentListStore: DepartmentListStore;

  constructor(props: any) {
    super(props);
    this.departmentListStore = new DepartmentListStore();
  }

  componentDidMount(): void {
    this.departmentListStore.loadDepartments();
  }

  render() {
    if (this.departmentListStore.isLoading) return <div>Loading..</div>;

    const rows = this.departmentListStore.departments.map((element) => (
      <tr key={element.name}>
        <td>
          <Edit
            onClick={() => this.departmentListStore.clickRow(element.id)}
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
            onClick={() => this.departmentListStore.delete(element.id)}
          />
        </td>
        <td>{element.name}</td>
      </tr>
    ));

    return (
      <>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => this.departmentListStore.clickRow(-1)}
            leftIcon={<IconCirclePlus size={rem(18)} />}
          >
            Add department
          </Button>
        </div>

        {this.departmentListStore.clickedRowNumber != 0 ? (
          <div>
            <Modal
              opened={true}
              onClose={() => this.departmentListStore.clickRow(0)}
              title="Modal Title"
            >
              <TextInput
                label="Input"
                placeholder="Enter something..."
                value={this.departmentListStore.editingDepartment.name}
                onChange={(event) =>
                  this.departmentListStore.onChange(event.target.value)
                }
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <Button
                  onClick={() => this.departmentListStore.clickRow(-1)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => this.departmentListStore.addDepartment()}
                  variant="outline"
                >
                  Save
                </Button>
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
              <th>Shortcut</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </Table>
      </>
    );
  }
}

export default observer(DepartmentList);
