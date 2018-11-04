import { UserInputError } from 'apollo-server-express';
import { copyProps } from '../../helpers/utils';

let authors = [
    { _id: '1', name: 'Ivanov' },
    { _id: '2', name: 'Ivanovich' },
    { _id: '3', name: 'Pushkin' },
    { _id: '4', name: 'Lermontov' },
];

class AuthorResolvers {
    getAuthor(_, args, context) {
        const { id } = args;
        return authors.find(a => a._id === id);
    }

    getAuthors(_, args, context) {
        const { nameFilter } = args;
        return authors.filter(a => a.name.includes(nameFilter));
    }

    saveAuthor(_, args, context) {
        const { author } = args;

        if (!author.name.trim()) {
            throw new UserInputError('Author\'s name can\'t be blank');
        }

        // Create
        if (!author._id) {
            author._id = `${Date.now()}`;
            authors.push(author);
        } else {
            // Update
            const authorToUpdate = authors.find(a => a._id === author._id);
            copyProps(author, authorToUpdate);
        }

        return author;
    }

    deleteAuthor(_, args, context) {
        const { id } = args;
        authors = authors.filter(a => a._id === id);
        return id;
    }
}

module.exports = new AuthorResolvers();
