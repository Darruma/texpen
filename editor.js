const express = require('express');
const router = express.Router();
const randomstring = require('randomstring')
const Post = require('./models/Post')
router.get('/editor/:url', (req, res) => {
    const url = req.params.url;
    Post.findOne({
        url: url
    },
        (err, post) => {
            if(err)
            {
                return res.json({
                    success:false,
                    message:'Error'
                })
            }
            else
            {
                return res.json(
                    {
                        title:post.title,
                        latex:post.content,
                        input:post.text_box_input
                    }
                )
            }
        })

});

router.post('/editor/upload', (req, res) => {
    const uploadData = req.body;
    const { title } = uploadData;
    const { latex } = uploadData;
    const { input } = uploadData;
    var p = new Post();
    p.text_box_input = input;
    p.content = latex;
    p.title = title;
    p.url = randomstring.generate(6)
    if (req.session.user) {
        user = req.session.user
    }
    p.save();
    return res.json(
        {
            success: true,
            message: 'Post saved'
        }
    )

})

module.exports = router;