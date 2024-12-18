interface StudentInfo {
  name: string;
  code: string;
  phone: string;
  email: string;
  modality: string;
}

interface EmailTemplateOptions {
  recipientName: string;
  student: StudentInfo;
}

export const generateStudentReviewTemplate = (options: EmailTemplateOptions): string => {
  return `
      Estimada ${options.recipientName},
  
      Mediante la presente se solicita la revisión de carpeta del:
  
      ALUMNO 1
  
      Nombre: ${options.student.name}
      Código: ${options.student.code}
      Celular: ${options.student.phone}
      Email: ${options.student.email}
      Modalidad: ${options.student.modality}
    `;
};
