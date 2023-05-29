using EO_interview.Database;

namespace EO_interview.Models
{
    public class EmployeeModel
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Position { get; set; }

        public string? PhoneNumber { get; set; }

        public string? UserName { get; set; }

        public string? Password { get; set; }

        public int? SupervisorId { get; set; }

        public int? DepartmentId { get; set; }

        public sbyte? IsSupervisor { get; set; }

        public virtual Department? Department { get; set; }

        public virtual Employee? Supervisor { get; set; }
    }
}
