export interface UserCreateDTO {
    name: string;
    email: string;
    password: string;
    permissionUser_id: number;
    permission_id: number;
    squad_id: number;
}