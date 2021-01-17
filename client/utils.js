const getUrlTitle = (title, postId) => {
    const urlTitle = title.replace(/[\W|_]+/g, '-')
    if (urlTitle[urlTitle.length - 1] == '-') {
        return urlTitle + postId
    }

    return urlTitle + '-' + postId
}

const getDate = (dateString) => {
    const [, time, date] = dateString.split(" ")
    let [hours, minutes, seconds] = time.split(":")
    let [day, month, year] = date.split("-")
    
    month -= 1
    return new Date(year, month, day, hours, minutes, seconds, 0)
}

export {
    getUrlTitle,
    getDate,
}