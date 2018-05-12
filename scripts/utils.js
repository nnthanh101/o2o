/**
 * Read config from .env
 * To support webpack-dev-server load environment variables into browser
 * We HAVE TO call directly as process.env[VARIABLES]
 */
const getIpfsConfig = () => {
    // Get config from .env
    // Assign default value if null
    
    // const {
    //     IPFS_API_PORT = "5002",
    //     IPFS_GATEWAY_PORT = "8081",
    //     IPFS_GATEWAY_PROTOCOL = "http"
    // } = process.env

    return {
        IPFS_API_PORT: process.env.IPFS_API_PORT || "5002",
        IPFS_GATEWAY_PORT: process.env.IPFS_GATEWAY_PORT || "8081",
        IPFS_GATEWAY_PROTOCOL: process.env.IPFS_GATEWAY_PROTOCOL || "http"
    }
}

const getPublicIp = () => process.env.PUBLIC_IP || "localhost"

module.exports = {
    getIpfsConfig,
    getPublicIp
}

