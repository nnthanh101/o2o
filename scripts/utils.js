const getIpfsConfig = () => {
    // Get config from .env
    // Assign default value if null
    const {
        IPFS_API_PORT = "5002",
        IPFS_GATEWAY_PORT = "8080",
        IPFS_GATEWAY_PROTOCOL = "http"
    } = process.env

    return {
        IPFS_API_PORT,
        IPFS_GATEWAY_PORT,
        IPFS_GATEWAY_PROTOCOL
    }
}


module.exports = {
    getIpfsConfig
}

