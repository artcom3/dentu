export class Patient {
    
    constructor(
        public id: string,
        public firstName: string, 
        public lastName: string, 
        public dateOfBirth: string, 
        public gender: string, 
        public dni: string,
        public phoneNumber: string,
        public email: string,
        public nationality: string,
        public educationDegree: string,
        public tutor: Patient | null,
    ) {}

}