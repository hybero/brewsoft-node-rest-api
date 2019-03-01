const express = require('express');
const router = express.Router();
const tankController = require('../app/api/controllers/tanks');

router.get('/', tankController.getAll);
router.post('/', tankController.create);
router.get('/:tankId', tankController.getById);
router.put('/:tankId', tankController.updateById);
router.delete('/:tankId', tankController.deleteById);

module.exports = router;
