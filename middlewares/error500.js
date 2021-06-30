

const msg500 = () => {
    res.status(500).json({
        ok: false,
        msg: 'Error inesperado...'
    })
}

module.exports = msg500;