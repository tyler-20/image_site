const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({
    dest: '../front-end/public/images',
    limits: {
        fileSize: 100000000,
    },
});

const pictureSchema = new mongoose.Schema({
    title: String,
    desc: String,
    path: String,
    upvotes: Number,
    namesWhoLiked: [String],
});

const Picture = mongoose.model('Picture', pictureSchema);

const userSchema = new mongoose.Schema({
    username: String,
    likedImageID: [String],
});

const User = mongoose.model('User', userSchema);

// connect to the database
mongoose.connect('mongodb://localhost:27017/social', {
    useNewUrlParser: true
});


app.post('/api/photos', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

app.post('/api/items', async (req, res) => {
    const pic = new Picture({
        title: req.body.title,
        desc: req.body.desc,
        path: req.body.path,
        upvotes: 0,
    });
    try {
        await pic.save();
        res.send(pic);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/items', async (req, res) => {
  try {
    // let limit = (req.params.limit && req.params.limit > 0)? req.params.limit: 10;
    // let start = (req.params.start && req.params.start > 0)? req.params.start: 0;
    let pictures = await Picture.find({});
    res.send(pictures);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/whoami/:username', async (req, res) => {
    try {
        let user = await User.findOne({username: req.params.username});
        if (user) {
            res.send(user.username)
        } else {
            user = new User({
                username: req.params.username,
                likedImageID: []
            });
            await user.save();
            res.send(user.username);
        }
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    let picture = await Picture.deleteOne({
      _id: req.params.id,
    });
    res.sendStatus(200).send(picture);
  } catch (error) {
    console.log(error);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    let picture = await Picture.findOne({ _id: req.params.id});
    picture.title = req.body.title;
    pic.desc = req.body.desc;
    await item.save();

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.put('/api/upvote/:user/:picid', async (req, res) => {
    try {
        let user = await User.findOne({ username: req.params.user} )
        let picture = await Picture.findOne({ _id: req.params.picid });

        likedImageID = new Set(user.likedImageID)
        namesWhoLiked = new Set(picture.namesWhoLiked)

        if (likedImageID.has(req.params.picid)) {
            picture.upvotes -= 1;
            likedImageID.delete(req.params.picid);
            namesWhoLiked.delete(user.username)
            upvote = false;
        } else {
            picture.upvotes += 1;
            namesWhoLiked.add(user.username);
            likedImageID.add(req.params.picid);
        }

        user.likedImageID = Array.from(likedImageID);
        picture.namesWhoLiked = Array.from(namesWhoLiked);
        
        picture.save();
        user.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/api/liked/:user", async (req, res) => {
    try {
        let user = await User.findOne({username: req.params.user});
        res.send(user.likedImageID);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/api/likedimages/:user", async (req, res) => {
    try {
        let user = await User.findOne({username: req.params.user});
        let query = user.likedImageID.map((id) => {return {_id: id};});
        if (query.length === 0) {
            res.sendStatus(200);
            return;
        }
        let pics = await Picture.find({$or: query});
        res.send(pics);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});


app.listen(3001, () => console.log('Server listening on port 3001!'));
