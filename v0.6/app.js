const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const morgan = require('morgan');

const userController = require('./controllers/user');
const routeGuard = require('./middleware/routeGuard');

const analyzer = require('./util/analyze');

const User = require('./models/user');
const Room = require('./models/room');
const UserRoom = require('./models/user-room');
const Game = require('./models/game');
const League = require('./models/league');
const Prediction = require('./models/prediction');
const RoomLeague = require('./models/room-league');
const Request = require('./models/request');
const Message = require('./models/message');

const app = express();
const csrfProtection = csrf();
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const roomRoutes = require('./routes/room');

//??
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false }));

//??
app.use(flash());
app.use(morgan('dev'));

// Initialize variables for all pages ??
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user ? req.session.user : null;
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.newMessagesCnt = req.session.newMessagesCnt;
  next();
});


app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use(adminRoutes);
app.use(homeRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(roomRoutes);

app.use(errorController.get404);

User.hasMany(Room);
Room.belongsTo(User);

User.belongsToMany(Room, { through: UserRoom });
Room.belongsToMany(User, { through: UserRoom });

League.hasMany(Game);
Game.belongsTo(League);

User.hasMany(Prediction);
Prediction.belongsTo(User);
Game.hasMany(Prediction);
Prediction.belongsTo(Game);
Room.hasMany(Prediction);
Prediction.belongsTo(Room);
User.hasMany(Request);
Request.belongsTo(User);

Room.belongsToMany(League, { through: RoomLeague });
League.belongsToMany(Room, { through: RoomLeague });



sequelize
  // First sync is for populating database with models, second one is for regular use
  // .sync({ force: true })
  .sync()
  .then(cart => {
    setInterval(analyzer.analyzeGames, 5000);
    setInterval(analyzer.analyzeRoomEnd, 10000);
    setInterval(analyzer.analyzeRoomStart, 11000);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

