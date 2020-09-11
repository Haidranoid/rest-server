function extensionValidator(fileName, array = []) {
    const shortName = fileName.split('.');
    const extension = shortName[shortName.length - 1];

    //verify allowed extensions
    if (array.indexOf(extension) < 0) {
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
