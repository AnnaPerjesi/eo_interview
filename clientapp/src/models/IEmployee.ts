interface IEmployee {
    id: number;
    name: string | null;
    position: string | null;
    phoneNumber: string | null;
    userName: string | null;
    password: string | null;
    supervisorId: number | null;
    departmentId: number | null;
    isSupervisor: number | null;
    department: IDepartment | null;
    inverseSupervisor: IEmployee[];
    supervisor: IEmployee | null;
}