interface createStudentRequest {
    id: string;
    name: string;
    lastname: string;
    mothername?: string;
    code: string;
    email: string;
    phone: string;
    is_scholarship: boolean;
  }
  
  export default createStudentRequest;
  