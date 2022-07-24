export type tableMetadata = {
    fields: fieldMetadata[],
    actions: actionMetadata[]
}
  
type fieldMetadata = {
    name: string,
    label: string,
    type: string,
    error: string,
    width: string
}

type actionMetadata = {
    name: string,
    label: string
}

export type employeeDetails = {
    ID?: string | null,
    EMP_NAME: string,
    EMP_DESIGNATION: string,
    EMP_SALARY: number,
    EMP_BIO: string,
    EMP_DOB: string,
    [key:string]: any
}