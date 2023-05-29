const API_URL = import.meta.env.VITE_SERVER_URL;

class EmployeeService {
  async getAll(): Promise<IEmployee[]> {
    const response = await fetch(`${API_URL}/Employee/GetAll`);

    const data = await response.json();

    return data;
  }

  async getAllByName(name: string = ""): Promise<IEmployee[]> {
    const response = await fetch(
      `${API_URL}/Employee/GetAllByName?name=${name}`
    );

    const data = await response.json();

    return data;
  }

  async getAllSupervisors(): Promise<IEmployee[]> {
    const response = await fetch(`${API_URL}/Employee/GetAllSupervisors`);

    const data = await response.json();

    return data;
  }

  async getById(id: number): Promise<IEmployee> {
    const response = await fetch(`${API_URL}/Employee/GetById?id=${id}`);

    const data = await response.json();

    return data;
  }

  async addEmployee(employee: IEmployee): Promise<any> {
    const response = await fetch(`${API_URL}/Employee/AddEmployee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    return response.json();
  }

  async update(employee: IEmployee): Promise<any> {
    const response = await fetch(`${API_URL}/Employee/Update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    return response.json();
  }

  async delete(id: number): Promise<any> {
    await fetch(`${API_URL}/Employee/Delete?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new EmployeeService();
