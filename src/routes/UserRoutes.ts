import { Request, Response, Router } from 'express'
// DB
import { connect } from '../data/mysql'
// Interface
import { User } from '../models/UsersModel'

class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    // GET All Users
    public async getUsers(req: Request, res: Response): Promise<Response | void> {
        try {
            const connection = await connect();
            const users = await connection.query('SELECT * FROM users');
            return res.json(users[0]);
        }
        catch (error) {
            console.log(error)
        }
    }
    // GET User by ID
    public async getUser(req: Request, res: Response): Promise<void> {
        const id = req.params.userId;
        const connection = await connect();
        const users = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
        res.json(users[0]);
    }
    // CREATE New User
    public async createUser(req: Request, res: Response): Promise<void>{
        const newUser: User = req.body;
        const connection = await connect();
        await connection.query('INSERT INTO users SET ?', [newUser]);
        res.json({
            message: 'Se ha creado un nuevo Usuario'
        });
    }

    public async updateUser(req: Request, res: Response): Promise<void>{
        const id = req.params.userId;
        const updateUser: User = req.body;
        const connection = await connect();
        await connection.query('UPDATE users set ? WHERE id = ?', [updateUser, id]);
        res.json({
            message: 'Usuario actualizado'
        });
    }
    // UPDATE User by ID
    public async deleteUser(req: Request, res: Response): Promise<void> {
        const id = req.params.userId;
        const connection = await connect();
        await connection.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({
            message: 'User eliminado'
        });
    }

    routes() {
        this.router.get('/', this.getUsers);
        this.router.get('/:userId', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:userId', this.updateUser);
        this.router.delete('/:userId', this.deleteUser);
    }
}

const userRoutes = new UserRouter();

export default userRoutes.router;