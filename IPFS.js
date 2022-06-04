document.addEventListener('DOMContentLoaded', async () => {
    const insertAfter = (referenceNode, newNode) => {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    }

    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() })
    window.node = node

    const status = node.isOnline() ? 'online' : 'offline'

    console.log(`Node status: ${status}`)

    insertAfter(statusDOM, newDiv)
})