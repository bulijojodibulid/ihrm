export function transListToTree(list, root) {
    const arr = []
    list.forEach((item) => {
        if (item.pid === root) {
            arr.push(item)

            const children = transListToTree(list, item.id)
            if (children.length > 0) {
                item.children = children
            }
        }
    })
    return arr
}

export function getTreeIds(tree) {
    const arr = []
    arr.push(tree.id)

    if (tree.children && tree.children?.length !== 0) {
        for (const item of tree.children) {
            const childArr = getTreeIds(item)
            arr.push(...childArr)
        }
    }
    return arr
}