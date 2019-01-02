const express = require('express');
const router = express.Router();
const randomstring = require('randomstring')
const Post = require('./models/Post')
router.get('/editor/:url', (req, res) => {
    const url = req.params.url;
    console.log(url)
    Post.find({
        url: url
    },
        (err, posts) => {
            if(posts.length !== 1)
            {
                return res.json({
                    success:false,
                    message:'Error'
                })
            }
            if(err)
            {
                return res.json({
                    success:false,
                    message:'Error'
                })
            }
            else
            {
                const post = posts[0]
                return res.json(
                    {
                        success:true,
                        title:post.title,
                        input:post.text_box_input
                    }
                )
            }
        })

});


router.post('/editor/upload', (req, res) => {
    const uploadData = req.body;
    const { title } = uploadData;
    const { input } = uploadData;
    var p = new Post();
    p.text_box_input = input;
    p.title = title;
    p.url = randomstring.generate(6)
    
    p.save();
    return res.json(
        {
            success: true,
            message: 'Post saved',
            url:p.url
        }
    )

})

module.exports = router;