const API_URL = import.meta.env.VITE_SERVER_URL;

class DepatmentService {
  async getAll(): Promise<IDepartment[]> {
    const response = await fetch(`${API_URL}/Department/GetAll`);

    const data = await response.json();

    return data;
  }

  async getById(id: number): Promise<IDepartment> {
    const response = await fetch(`${API_URL}/Department/GetById?id=${id}`);

    const data = await response.json();

    return data;
  }

  async addDepartment(department: IDepartment): Promise<any> {
    const response = await fetch(`${API_URL}/Department/AddDepartment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(department),
    });

    return response.json();
  }

  async update(department: IDepartment): Promise<IDepartment> {
    const response = await fetch(`${API_URL}/Department/Update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(department),
    });

    return response.json();
  }

  async delete(id: number): Promise<any> {
    await fetch(`${API_URL}/Department/Delete?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new DepatmentService();
