import mongoose, { Connection, MongooseError } from 'mongoose';
import pc from 'picocolors';

export default new class MongoConnection {
    private readonly mongoURI: string = process.env.DB_URL || '';

    public async init() {
        await this.initiateConnection();
        this.addEventListeners();
    }

    public getConnection(){
        return mongoose.connection
    }

    private async initiateConnection() {    
        try {
            await mongoose.connect(this.mongoURI);
            console.log(pc.green('MongoDB Connect:'), 'Connected');
        } catch (error: any) {
            console.error(pc.red('MongoDB Connect Error:'), error.message);
        }
    }

    private addEventListeners() {
        const connection: Connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log(pc.green('MongoDB: Connected'));
        });
        connection.on('disconnected', () => {
            console.warn(pc.red('MongoDB: Disconnected'));
        });
        connection.on('reconnected', () => {
            console.log(pc.yellow('MongoDB: Reconnected'));
        });
        connection.on('error', (err: MongooseError) => {
            console.error(pc.red('MongoDB: Error:'), err.message || err);
        });
    }
}
