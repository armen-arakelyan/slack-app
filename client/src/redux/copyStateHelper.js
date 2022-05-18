const deepCopy = (objectpassed) => {
if (objectpassed === null || typeof objectpassed !== 'object') {
    return objectpassed
}

const temporaryStorage = objectpassed.constructor()

for (const key in objectpassed) {
    temporaryStorage[key] = deepCopy((objectpassed[key]))
}
return temporaryStorage
}

export default deepCopy