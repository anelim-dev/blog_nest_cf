export interface User {
    
    _id?: string;
    
    name: string;

    lastname: string;

    email: string;

    password: string;

    isAdmin: boolean;

    rol: string[];
}
