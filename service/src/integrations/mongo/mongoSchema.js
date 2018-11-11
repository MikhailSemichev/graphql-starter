import mongoose from 'mongoose';
import { BOOK_STATUS } from '../../enums';

// Setup Schemas
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    _id:      String,
    title:    { type: String, required: true },
    year:     { type: Number, required: true },
    authorId: { type: String, required: true },
    status:   { type: String, required: true, default: BOOK_STATUS.active, enum: Object.values(BOOK_STATUS) },
}, { collection: 'books' });

const AuthorSchema = new Schema({
    _id:      String,
    name:     { type: String, required: true },
}, { collection: 'authors' });

// Export Models
export default {
    Author: mongoose.model('Author', AuthorSchema),
    Book: mongoose.model('Book', BookSchema),
};
