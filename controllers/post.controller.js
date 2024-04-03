function index(req, res) {
    const post= 'Data to be posted'
    res.send(post)
}

module.exports= {
    index:index
}