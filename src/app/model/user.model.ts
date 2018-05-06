import { Board } from './board.model';

export class User {
    public id: number;
    public username: string;
    public boards: Array<Board>;
}
