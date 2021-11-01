
exports.dataManipulation = (sourceData, refData, originMatchColumn, targetMatchColumn, targetNewColumn, originCopyColumn) => {
    let sourceDataCopy = [...sourceData]
    let refDataCopy = [...refData]

    const modifiedData = sourceDataCopy.map(object => {
        const copyObject = { ...object };
        refDataCopy.forEach(element => {
            console.log(element)
            console.log(copyObject[originMatchColumn],"originMatchColumn")

            if (copyObject[originMatchColumn] === element[targetMatchColumn]) {
                copyObject[targetNewColumn] = element[originCopyColumn]
            }
        })
        return copyObject
        
    })
    return modifiedData
}
