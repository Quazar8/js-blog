const types = {
    PUBLISH_POST: 'PUBLISH_POST'
}

const publishPostAction = (data) => {
    return {
        type: types.PUBLISH_POST,
        payload: data
    }
}

export {
    types,
    publishPostAction
}