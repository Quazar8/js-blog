const assignVals = (obj, field, val) => {
    return Object.assign({}, obj, { [field]: val})
}

export {
    assignVals
}
