import { Request, Response, Router } from 'express'
// DB
import { connect } from '../data/mysql'
// Interface
import { Post } from '../models/PostsModel'

class PostRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    // GET All Posts
    public async getPosts(req: Request, res: Response): Promise<Response | void> {
        try {
            const connection = await connect();
            const posts = await connection.query('SELECT * FROM posts');
            return res.json(posts[0]);
        }
        catch (error) {
            console.log(error)
        }
    }
    // GET Post by ID
    public async getPost(req: Request, res: Response): Promise<void> {
        const id = req.params.postId;
        const connection = await connect();
        const posts = await connection.query('SELECT * FROM posts WHERE id = ?', [id]);
        res.json(posts[0]);
    }
    // CREATE New Post
    public async createPost(req: Request, res: Response): Promise<void>{
        const newPost: Post = req.body;
        const connection = await connect();
        await connection.query('INSERT INTO posts SET ?', [newPost]);
        res.json({
            message: 'Se ha creado un nuevo POST'
        });
    }

    public async updatePost(req: Request, res: Response): Promise<void>{
        const id = req.params.postId;
        const updatePost: Post = req.body;
        const connection = await connect();
        await connection.query('UPDATE posts set ? WHERE id = ?', [updatePost, id]);
        res.json({
            message: 'POST actualizado'
        });
    }
    // UPDATE Post by ID
    public async deletePost(req: Request, res: Response): Promise<void> {
        const id = req.params.postId;
        const connection = await connect();
        await connection.query('DELETE FROM posts WHERE id = ?', [id]);
        res.json({
            message: 'POST eliminado'
        });
    }

    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:postId', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:postId', this.updatePost);
        this.router.delete('/:postId', this.deletePost);
    }
}

const postRoutes = new PostRouter();

export default postRoutes.router;