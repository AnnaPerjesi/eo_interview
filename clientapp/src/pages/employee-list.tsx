import { Table } from "@mantine/core";
import React from "react";
import { observer } from "mobx-react";
import { EmployeeListStore } from "../core/stores/EmployeeListStore";

class EmployeeList extends React.Component {
  private employeeListStore: EmployeeListStore;

  constructor(props: any) {
    super(props);
    this.employeeListStore = new EmployeeListStore();
  }

  componentDidMount(): void {
    this.employeeListStore.loadEmployees();
  }

  render() {
    if (this.employeeListStore.isLoading) return <div>Loading..</div>;

    const rows = this.employeeListStore.employees.map((element) => (
      <tr key={element.name}>
        <td>{element.name}</td>
      </tr>
    ));

    return (
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

export default observer(EmployeeList);
