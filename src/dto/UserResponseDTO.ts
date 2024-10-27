export interface UserResponseDTO {
    id: number;
    name: string;
    email: string;
    creator: {
        user_id: number;
        name: string;
        email: string;
    };
    permissionUser: {
        permissionUser_id: number;
        name: string;
        createValue: boolean;
        deleteValue: boolean;
        updateValue: boolean;
    };
    permission: {
        permission_id: number;
        name: string;
        type: boolean;
    };
    squad: {
        name: string;
        squad_id: number;
    };
    created_at: string;
}
