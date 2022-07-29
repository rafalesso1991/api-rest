import express from 'express';
import morgan from 'morgan';

// import routes
import indexRoutes from './routes/indexRoutes';
import PostsRoutes from './routes/PostsRoutes';
import UserRoutes from './routes/UserRoutes';

// Server class
class Server {
    public app: express.Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    public config(): void {
        // Database

        // Settings
        this.app.set('port', process.env.PORT || 3000);
        // Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
    public routes(): void {
        this.app.use(indexRoutes);
        this.app.use('/posts', PostsRoutes);
        this.app.use('/users', UserRoutes);
    }
    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server running on port', this.app.get('port'));
        });
    }
}

export { Server } ;