const express = require("express");
const router = express.Router();

const auth = require("./../middleware/auth");
const User = require("../models/User");

/**
 * @method - GET
 * @description - get shopping list
 * @param - /shop/list
 */
router.get('/list', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json(user.shoppinglist);
    } catch (e) {
      res.send({ message: 'Error fetching user'});
    }
});

/**
 * @method - POST
 * @description - add to list
 * @param - /shop/add
 */
 router.post('/add', auth, async (req, res) => {
    try {
        const item = req.body.item;
        const user = await User.findById(req.user.id);
        currentlist = user.shoppinglist;
        currentlist.push(item);
        user.shoppinglist = await currentlist;
        await user.save();
        res.json(user.shoppinglist);
    } catch (e) {
      res.send({ message: 'Error fetching user'});
    }
});

/**
 * @method - DELETE
 * @description - delete item from list
 * @param - /shop/delete
 */
 router.delete('/delete', auth, async (req, res) => {
    try {
        const item = req.body.item;
        const user = await User.findById(req.user.id);
        currentlist = user.shoppinglist;
        const index = currentlist.indexOf(item);
        if (index > -1) {
            currentlist.splice(index, 1);
        }
        user.shoppinglist = await currentlist;
        await user.save();
        res.json(user.shoppinglist);
    } catch (e) {
      res.send({ message: 'Error fetching user'});
    }
});

module.exports = router;