const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('notes route');
})


module.exports = router;