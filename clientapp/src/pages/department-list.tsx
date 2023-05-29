import { Table } from "@mantine/core";
import React from "react";
import { DepartmentListStore } from "../core/stores/DepartmentListStore";
import { observer } from "mobx-react";

const elements = [
  { name: "QWE", shortcut: "Q" },
  { name: "ERTZ", shortcut: "ER" },
  { name: "FHD", shortcut: "T" },
  { name: "BLKGJ", shortcut: "B" },
  { name: "CFJ", shortcut: "C" },
];

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
        <td>{element.name}</td>
      </tr>
    ));

    return (
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Shortcut</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

export default observer(DepartmentList);
