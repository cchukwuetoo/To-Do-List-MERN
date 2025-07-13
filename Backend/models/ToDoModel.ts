import mongoose, {Document, Schema} from 'mongoose';

export interface IToDo extends Document {
    toDo: string;
    createdAt: Date;
}

const toDoSchema: Schema<IToDo> = new mongoose.Schema({
    toDo: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, 'To-do item is required'],
        maxlength: [500, 'To-do item must be less than 500 characters']
       
    }
}, {
    timestamps: true
});

const ToDo = mongoose.model<IToDo>('ToDo', toDoSchema);
export default ToDo