const errorHandling = (err, req, res, next) => {
    console.error(err.message)

    res.status(err.status || err.code || 500).json({
        success: false,
        message: err.message || 'Internal server Error'
    })
}

module.exports = errorHandling;