const getUrlTitle = (title, postId) => {
    const urlTitle = title.replace(/[\W|_]+/g, '-')
    if (urlTitle[urlTitle.length - 1] == '-') {
        return urlTitle + postId
    }

    return urlTitle + '-' + postId
}

export {
    getUrlTitle
}