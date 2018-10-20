require('dotenv').config();

module.exports = {
    AUTH_MODE: process.env.AUTH_MODE === 'true',
    SECRET_KEY: 'DhbqHYEboCaoVAUx7lXFoYhwJGQJ1disVtQItqDxMf4QVHnYodw8VlBpzN3qpXd',
    BOOK_STATUS: {
        draft: 'draft',
        active: 'active',
        deleted: 'deleted',
    }
};
