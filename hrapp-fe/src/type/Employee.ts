export type Employee = {
  uuid: string;
  name: string;
  role: "EMPLOYEE" | "MANAGER";
  salary: number;
};

export type CreateEmployeePayload = Omit<Employee, "uuid">;
export type UpdateEmployeePayload = Partial<CreateEmployeePayload>;
