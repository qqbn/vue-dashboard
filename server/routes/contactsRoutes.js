const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('contacts route');
})


module.exports = router;