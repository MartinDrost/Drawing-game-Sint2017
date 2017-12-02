import {RoleEnum} from "./RoleEnum";
export interface IPlayer {
    username: string;
    role: RoleEnum;
    token: string;
}