module.exports.copyProps = (source, dest) => {
    Object.keys(source).forEach(key => {
        dest[key] = source[key];
    });
};
