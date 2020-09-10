function extensionValidator(fileName) {
    const shortName = fileName.split('.');
    const extension = shortName[shortName.length - 1];

    //allow extensions
    const extensions = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensions.indexOf(extension) < 0) {
        return {
            response: false,
            extension,
        }
    }
    return {
        response: true,
        extension,
    }
}

module.exports = extensionValidator;
