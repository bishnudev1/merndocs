# mern-stack-22
Mongoose-Express-React-Node Documentation 2022 

## 1. Pre-Requisites
- HTML
- CSS
- Javascript
- ECMAScript 6
- Bootstrap (Optional)
- Postman
- VS Code

## 2. Introduction to Node JS [ Backend + Database Setup ]
### Creating Hello World on <b>Node JS</b>
- Install Node https://nodejs.org/en/download/
- Create a App ```npm init```
- Creating our Server entry point ```server.js```
- Creating a basic server in server.js
```bash
const http = require('http');
const port = 4500 || process.env.PORT;

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.end("Hello,World");
});

server.listen(port)
```
- Run the server ```node server.js``` on your console/terminal
- Now your basic <b>Hello,World</b> server is running on http://localhost:4500/

### Creating Hello World on <b>Express JS</b>
- Express JS is a library of Node JS. It reduces the code and helps us to code faster the same piece of code. It also helps to connect MongoDB easily.
- Install Express ```npm i express```
```bash
const express = require('express');

const port = 4500 || process.env.PORT;

const server = express();

server.get('/',(req,res) => {
    res.send("Hello,World");
});

server.listen(port);
```
- Creating Multiple Endpoints on Express
```bash
server.get('/About',(req,res) => {
    res.send("Hello,About,Section");
});

server.get('/Contact',(req,res) => {
    res.send("Hello,Contact,Section");
});
```
- Run the server by ```node server.js```
- Get About http://localhost:4500/About
- Get Contact http://localhost:4500/Contact

### Setting Nodemon
- It's a module of Express that allows to restart the server automatically when any changes are detected in code base.
- Install ```npm i nodemon -D```
- Add ```"start": "nodemon server.js"``` in package.json
- Start server ```npm start```

### Middlewars in Express
- MiddleWars are used in Express to Authenticate between Endpoints/Routes.
```bash
let isLoggedIn = true;

const MiddleWare = (req,res,next) => {
    console.log("MiddleWare Connected");
    if(isLoggedIn === true){
        next();
    }
    else{
        res.status(404).send("You are not Logged In");
    }
}
```
- Now use it any Endpoint
```bash
server.get('/About',MiddleWare,(req,res) => {
    res.send("Hello,About,Section");
});
```
- You can add any security authenticate in MiddleWars() just like isLogged() here, without passing it the next() method won't be called and use can't be redirecte to next Endpoint.

### How to Connect Express Server to MongoDB Atlas ?
Setting our MongoDB Atlass
- Create an Account on MongoDB Atlas https://bit.ly/3yKaX08 & create a Cluster
- Go to Collection -> Add my own Data & Create a Database with Collection name
- Now Connect your Atlas with ```Connect your application``` method
- Copy the connection source ```mongodb+srv://Bishnudev:<password>@cluster0.xbtjhqo.mongodb.net/?retryWrites=true&w=majority``` 
Setting our Express With Mongoose
- Install Mongoose ```npm i mongoose```
- Import Mongoose ```const mongoose = require('mongoose');```
- Connect to MongoDB Atlass With Promises
```bash
mongoose.connect('mongodb+srv://Bishnudev:<Password>@cluster0.xbtjhqo.mongodb.net/mern-db?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch((error) => {
    console.log(error);
});
```
### Secure our Connection Code with dotenv
- Install ```npm i dotenv```
- Create ```type nul > config.env```
- Add Database Path in it
```bash
DATABASE = mongodb+srv://Bishnudev:<Password>@cluster0.xbtjhqo.mongodb.net/mern-db?retryWrites=true&w=majority
```
- Import ```const dotenv = require("dotenv");
- Now use dotenv to secure your Database Password
```bash
dotenv.config({path:'./config.env'});

const db = process.env.DATABASE;
```
- Now instead of giving direct MongoDB Atlas URL Use db
```bash
mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch((error) => {
    console.log(error);
});
```
- Now create a file ```.gitignore``` and add the file in it ```config.env``` & save.

### Creating a Database Model
```bash
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const Model = moongose.model('user-data',UserSchema);

module.exports = Model;
```
### Router in Express
- Using Routes instead of Using Normal Server is a good practice.
```bash
const express = require('express');

const router = express.Router();

router.get('/',(req,res) => {
    console.log("HomePage Connected");
    res.send("Hello,World");
});

module.exports = router;

server.use(router);
```
### Getting All Users(If Exist in DB) Through Express (Pre Request )
- It should handled a promise as we are fetching data.
- find() is a MongoDB method which returns all data's in the DB.
```bash
router.get('/UserList', async (req,res) => {
    const Response = await Model.find();
    res.json(Response);
});
```
### Adding a User in DB ( Post Request )
- new Constructor calls Model Database and add CreateUser in it.
- req.body helds the json data on /AddUser Endpoint.
- save() is a mongoose method which save the session after a Post Request.
- <b>fineOne()</b> search all emails from the database & using isExist promise function if there's already an email same named it will give error or the email & other datas will be stored in the DB.
```bash
router.post('/AddUser',(req,res) => {
    const CreateUser = req.body;
    const NewUser = new Model(CreateUser);
    NewUser.save();
    res.json(NewUser);
});
```

### Creating Register Endpoint With Validations Using Promises
- We can destructure all values(name, email) from the body so that we can add validation in it
- Instead of ```const CreateUser = req.body```
- We can use ```const { name, email, number, profession, password, c_password } = req.body;```
```bash
router.post('/Register', (req, res) => {
    const { name, email, number, profession, password, c_password } = req.body;
    if (!name || !email || !number || !profession || !password || !c_password) {
        res.status(422).json({ error: "Please give the all details properly" })
    }
    Model.findOne({ email: email }).then((isExist) => {
        if (isExist) {
            res.status(422).json({ error: "Email already exists" });
        }
        const NewUser = new Model({ name, email, number, profession, password, c_password });
        NewUser.save().then(() => {
            alert("User registered successfully");
        }).catch((err) => {
            res.status(201).json({ message: "User registered successfully" });
        })
    }).catch((error) => {
        res.status(422).json({ error: error });
    });

});
```
### Creating Register Endpoint With Validations Using Async-Await (Modern ECMAScript 6 Snippet)
```bash
router.post('/Register', async(req, res) => {
    const { name, email, number, profession, password, c_password } = req.body;
    if (!name || !email || !number || !profession || !password || !c_password) {
        res.status(422).json({ error: "Please give the all details properly" })
    }
    try {
        const response = await Model.findOne({ email: email });
        if (response)
            res.status(422).json({ error: "Email already exists" });
        const NewUser = new Model({ name, email, number, profession, password, c_password });
        await NewUser.save();
        res.status(201).json({ message: "User registered successfully" });
        
    } catch (error) {
        console.log(error);
    }
});
```
### Creating a Login Endpoint With Email Validation
```bash
router.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: "Please give the login details properly" })
    }
    try {
        const isValid = await Model.findOne({ email: email });

        if (isValid)
            res.status(201).json({ message: "Login successfull" });
        else
            res.status(422).json({ error: "Incorrect login details" });
    } catch (error) {
        console.log(error);
    }
});
```
### Securing Password Using Bcrypt.js
- Config in <b>Model.js</b>
- Install ``` npm i bcryptjs```
- Import ```const bcrypt = require("bcryptjs");```
```bash
ModelSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12); 
        this.c_password = await bcrypt.hash(this.c_password,12); 
    }
    next();
});
```
### Checking Email & Password While Validating Login Form
- Modifying <b>Try Block</b> of Email Validation
```bash
        const isValid = await Model.findOne({ email: email });

        if (isValid) {
            const isMatch = await bcrypt.compare(password, isValid.password);
            if (isMatch) {
                res.status(201).json({ message: "Login successfull" });
            }
            else {
                res.status(422).json({ error: "Incorrect login details" });
            }
        }
        else
            res.status(422).json({ error: "Incorrect login details" });
```
### User Authentication Using JWT Token
- Install ```npm i jsonwebtoken```
- We only use JWT when someone Logged in not when User Register cause with it When Someone Logged in he/she will get an unique id with it he/she will get his secret creditenals like About Section/Bio, or Cart Items in eCommerce websites.
- Import ```const jwt = require('jsonwebtoken`);```
- Add token after validating email
```bash
            const token = await isValid.generateAuthToken();
            console.log(token);
```
- Declare a new List Schema <b>tokens</b> with <b>token</b> in Models
```bash
    tokens: [
        {
            token: {
                type: String,
                require : true
            }
        }
    ]
```
- Add generateAuthToken() method in Models
```bash
ModelSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({_id: this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};
```
### Storing Cookie With Session For Each Users
- ```Date.now() + 25892000000``` means after 30 days the user will be logged out automatically & have to login again.
```bash
            res.cookie("jwtoken",token,{
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
```
- Add Test Cookie in any Endpoint to get Cookies
```bash
server.get('/About',MiddleWare,(req,res) => {
    res.cookie("Test",'Bishnudev');
    res.send("Hello,About,Section");
});
```
## Introduction to React JS [ Frontend Setup ]
### Creating Hello World App in React
- Initialize ```npx create-react-app client```
- Edit <b>App.js</b>
- Delete unneeded files in <b>public</b> & <b>src</b> folder
```bash
import React from 'react'

const App = () => {
  return (
    <>
      <h1>Hello,World!</h1>
    </>
  )
}

export default App
```
- Run App ```npm start```

### Creating a Responsive Navbar using React-Bootstrap
- Create a new <b>Components</b> folder in <b>src</b> where all screens(Navbar,Footer,Home) pages will be stored.
- Create a new Screen/Component ```Navbar.js```
- Import Navbar in ```App.js``` 
```bash
import Navbar from './Components/Navbar';
```
- Initialize it by ```<Navbar />``` in <b>App.js</b>
- ```npm install bootstrap``` 
- Paste Bootsrap Script & Link in ```index.html/public```
```bash
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
crossorigin="anonymous"></script>
```
- Now go to Bootstrap.com/Components/Navbar -> Copy and Paste any navbar in ```Navbar.js```
- Edit & Customize it furthur on your own
### React-Router-Dom
it helps us to visit another Screen/Component/Page without Hot-Reloading
- Initialize ```npm i react-router-dom```
- Add BrowserRouter in ```index.js```
```bash
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);


```
- Create Route With Routes in ```App.js```
```bash
import { Routes, Route } from 'react-router-dom';
// Importing Routes,Route from React-Router
<Navbar />
<Routes>
    <Route exact path='/' element={<Home />} />
    <Route path='/About' element={<About />} />
</Routes>
// Wrapping With Base Routes will called BrowserRouter from ```index.js``` and Route has two props one is path [ Exact Path defines it will visible defaultly & Element takes it's Screen/Component value after we import it
```
- Creating Link in Navbar
```bash
import { Link } from 'react-router-dom';
// Instead of <b>a</b> tag we use<b>Link</b> tag just to avoid Hot Reloading, spacial feature of React
<Link class="nav-link" to='/About' >About</Link>
```
### Adding CSS Style in React
- Create a ```App.css``` in <>b</b> & Add style in it
```bash
.text-span-color{
    color: yellowgreen;
}
```
- Import it in ```App.js``` 
```bash
import './App.css';
```
- Now use styles globally in any Screen/Component
```bash
<p>Welcome <span className='text-span-color'>Bishnudev Khutia</span></p>
```
### Creating Registration(UI) Page With Input, Label, Placeholder, Textarea, Button
```bash
//Sample
    <form method='POST' action='/Register'>
        <label>Name</label>
        <input type='text' placeholder='Enter your name...' />
        <button className='submit-button' type='submit'>Register</button>
    </form>
```
### Creating Login Page in Same Way
```bash
    <form method='POST' action='/Login'>
      <label>Password</label>
      <input type='password' placeholder='Enter your password...' />
      <button className='submit-button' type='submit'>Login</button>
    </form>
```
### Creating Contact Us Page in Same Way
```bash
      <form method='POST' action='/Contact'>
        <label>Your Query</label>
        <textarea placeholder='How can I help you...?'/>
        <button className='submit-button' type='submit'>Submit</button>
      </form>
```
### Creating Home Page (Full JSX For Better Understand)
```bash
import React from 'react'

const Home = () => {
  return (
    <div className='flex-center flex-column-only'>
      <div style={{ "margin": "auto","textAlign" :"center"}}>
        <p>Welcome <span className='text-span-color'>Bishnudev Khutia</span></p>
        <h1>We're the MERN Developers</h1>
      </div>
    </div>
  )
}

export default Home;
// Styles are available in \client\src\App.css
```
### Creating About Page
- it's a bit lengthy so check \client\src\Components\About.js
### 404 Error Page in React
- Creating 404 Page
```bash
import React from 'react'

const Error = () => {
  return (
    <div>
        <h1>404 Bad Request!</h1>
    </div>
  )
}

export default Error
```
- Import it in <b<App.js</b> ```import ErrorPage from './Components/ErrorPage ';```
- Initialize it ```<Route path='*' element={<ErrorPage/>}></Route>```
### Storing Registration Form Data in React UseState ( useState Hook in React )
- Import useState ```import { useState } from 'react'```
- Create a State for name ```const [name, setName] = useState('');```
- Set <b>value</b> & <b>onChange</b> value of name input
```bash
<input value={name} onChange={(e) => { setName(e.target.value) }} type='text' placeholder='Enter your name...' />
```
- Creating the function to get name data
```bash
  function getContactData(e) {
    e.preventDefault();
    console.log(name);
  }
```
- Calling it via <b>Submit</b> button
```bash
<button onClick={getContactData} className='submit-button' type='submit'>Submit</button>
```
### Connecting our React Frontend with Express Backend
- Initialize ```npm i cors``` in <b>Backend</b> folder
- Import ```const cors = require('cors'); in <b>server.js</b>```
- Initialize ```server.use(cors());```
- Go to React(Frontend) ```package.json``` & Add Backend Server as Proxy
```bash
"proxy":"http://localhost:4500/",
```
### Connecting React Register Page With Express Register with Fetch API
- ```import { useState } from 'react'```
- ```import { useNavigate } from 'react-router-dom';```
- Initialize ```const navigate = useNavigate();```
- Set hooks for each form data to store datas using useState
```bash
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [profession, setProfession] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
```
- Setting Register Function in React with Async-Await & Fetch
```bash
  const registerData = async (e) => {
    e.preventDefault();

    const response = await fetch('/Register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name, email, number, profession, password, c_password
      })
    });

    const data = response.json();

    if (response.status === 422 || !data) {
      window.alert("Can't registered user!");
    }
    else {
      window.alert("Registration successfull");
      navigate('/Login');
    }
  }
```
### Connecting React Login Page with Validation via Express Login with Fetch API
- ```import { useState } from 'react'```
- ```import { useNavigate } from 'react-router-dom';```
- Initialize ```const navigate = useNavigate();```
- Set hooks for each form data to store datas using useState
```bash
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
```
### Setting Login Function in React with Async-Await & Fetch
```bash
  const loginData = async (e) => {
    e.preventDefault();

    const response = await fetch('/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data = await response.json();


    if (response.status === 422 || !data) {
      window.alert("Wrong user details!");
    }
    else if(response.status === 201 || data){
      window.alert("Login successfull");
      navigate('/');
    }

  }
```
### User Verifying Using JWT & Middlewar in Express
- Create a new folder ```Middlewars``` in Backend Directory & create ```Authentication.js```
```bash
const jwt = require('jsonwebtoken');
const User = require('../Models/Model');
const cookieParser = require("cookie-parser");


const Authenticate = async (req, res, next) => {

    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens:token": token });

        if (!rootUser) {
            throw new Error('User not found !');
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        return next();

    } catch (error) {
        res.status(401).send('Unauthorized User');
        console.log(error);
    }
};

module.exports = Authenticate;
```
- Sending the verifed user details to Express with Token
```bash
router.get('/About', Authenticate, (req, res) => {
    // res.cookie("Test", 'Bishnudev');
    res.send(req.rootUser);
});
```
- Pushing the user data to ```/About``` if user logged in or return to ```/Login``` using ```useEffect```
```bash
  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line -> To avoid deprecation warning
  }, []);
```
```bash
  const callAboutPage = async () => {
    try {
      const res = await fetch('/About', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      Setuser(data); -> Storing all user data from '/About' backend to ```user``` via ```useState``` below
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (error) {
      console.log("The error is : ", error);
      alert("Login First...");
      navigate('/Login');
    }
  }
```
- Setting dynamic user details data in About page using ```useState```
```bash
const [user,Setuser] = useState([]);
```
- Setting the data by
```bash
            <p><span>User ID</span> : {user._id}</p>
            <p><span>Name</span> : {user.name}</p>
            <p><span>Email</span> : {user.email}</p>
            <p><span>Phone</span> : {user.number}</p>
            <p><span>Profession</span> : {user.profession}</p>
```
### Setting Dynamic HomePage using Fetch
- Collect only name data from /About backend and show it with contition
- Calling getData() function with Promises to get data from server
```bash
  const getData = async () => {
    const res = await fetch('/About', {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data = await res.json();
    Setuser(data);
    setShow(true);
  }
```
- calling the function using useEffect() to call the function automatically while page is rendered
```bash
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
```
- Storing the data in useState
```bash
const [user, Setuser] = useState([]);
```
- Showing the data in Homepage
```bash
<h3>Welcome <span className='text-span-color'>{user.name}</span></h3>
<h2>Happy to see you back</h2>
```

### Storing Contact Us Page Data in React Through Express To Mongoose
- Create a new Model in \Models\ContactFeedback.js\
```bash
const mongoose = require('mongoose');

const ContactModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
});

const ContactFeedback = new mongoose.model('contact-feedback',ContactModel);

module.exports = ContactFeedback;
```
- Import it in Backend ```router.js```
- Storing Backend ```/Contact``` data to Mongoose ```contact-feedback``` model.
```bash
router.post('/Contact', (req, res) => {
    const { name, email, profession, feedback } = req.body;

    if (!name || !email || !profession || !feedback) {
        res.status(422).json({ error: "Please give the feedback properly" });
        return;
    }
    const getfeed = new ContactModel({ name, email, profession, feedback });

    getfeed.save().then(() => {
        res.status(201).json({ message: "Thanks for giving us feedback" });
        return;
    }).catch(() => {
        res.status(422).json({ error: "Something error occured" });
        return;
    })
});
```
- Merging React Contact Form With Express Backend using useState (Same Procedure as Register and Login)
```bash
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [feedback, setFeedback] = useState('');
```
```bash
  const getContactData = async (e) => {
    e.preventDefault();

    const sendResp = await fetch('/Contact', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name, email, profession, feedback
      })
    });

    const isSent = await sendResp.json();

    if (isSent.status === 422 || !isSent) {
      alert('Could not submit responses');
    }
    else {
      alert('Feedback submission successfully');
      console.log(isSent);
    }
  }
```
- Now Calling the function React Form
```bash
        <label>Name</label>
        <input value={name} onChange={(e) => { setName(e.target.value) }} type='text' placeholder='Enter your name...' />
        <label>Email</label>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type='email' placeholder='Enter your email...' />
        <label>Profession</label>
        <input value={profession} onChange={(e) => { setProfession(e.target.value) }} type='text' placeholder='Enter your work/job/profession...' />
        <label>Your Query</label>
        <textarea value={feedback} onChange={(e) => { setFeedback(e.target.value) }} placeholder='How can I help you...?' />
        <button onClick={getContactData} className='submit-button'>Submit</button>
```
### Implement ```Logout``` Features
- Creating ```Logout``` Button in ```Navbar.js```
```bash
<li class="nav-item">
    <Link class="nav-link" to='/Logout' >Logout</Link>
</li>
```
- Creating ```Logout``` Route in ```App.js```
```bash
import Logout from './Components/Logout';

<Route path='/Logout' element={<Logout />} />
```
- Creating ```Logout``` Backend in Express ```route.js```
clearCookie delete the session & User has to Login again
```bash
router.get('/Logout', (req, res) => {
    res.clearCookie("access_token", { path: "/" });
    res.status(200).send('User Logged Out');
});
```
- Creating ```Logout``` Component in Client(React) & Receiving Clear-Cookies Function From Express Backend ```(/Logout)```
```bash

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/Logout', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(() => {
            navigate('/Login');
        }).catch((error) => console.log(error));
    })

    return (
        <>
            // That's an empty JSX field cause we don't want to see anything logout page, just redirect the logout page with sign up page.
        </>
    )
}
```

### Register-Login & Logout Toggling with useReducer React
- Install Context API ```import { createContext } from 'react'``` in ```App.js```
- Initialize it ``` const UserContext = createContext();```
- Wrap ```App.js``` Routes in the ```<UserContext.Provider></UserContext.Provider>```
- ```import {useReducer} from 'react'```
- Initialize useReducer ```const [state, dispatch] = useReducer(reducer, initialState, init)```
- UserContext takes two params ```<UserContext.Provider value={state,dispatch}>```
- Create a new folder ```UseReducer``` in ```src``` & Create a new file ```Reducer.js```
- Define initialState & reducer
```bash
export const initialState = null;

export const reducer = (state,action) => {
    if(action.type === "USER"){
        return action.payload;
    }
    return state;
}
```
- Import it by ```import {initialState,reducer} from '../src/useReducer/Reducer';``` in <b>App.js</b>
- Now initialize use <b>ContextAPI</b> in ```Login.js```
```bash
import { useContext } from 'react';

import { UserContext } from '../App';
// Importing UserContext Data from App.js which we created using createContext

const {state,dispatch} = useContext(UserContext)
// Using App.js context in Login.js context
```
- Now we need to update dispatch(useReducer) just like setName or setPassword(useState) if we getting valid response
```bash
    else if (response.status === 201 || data) {
      dispatch({ type: "USER", payload: true }); -> Setting dispatch method here
      window.alert("Login successfull");
      navigate('/');
    }
```
- Now initialize use <b>ContextAPI</b> in ```Logout.js```
```bash
import { useContext } from 'react';

import { UserContext } from '../App';
// Importing UserContext Data from App.js which we created using createContext

const {state,dispatch} = useContext(UserContext)
// Using App.js context in Logout.js context
```
- Now we need to update dispatch(useReducer) just like setName or setPassword(useState) if we getting valid response
```bash
then(() => {
            dispatch({ type: "USER", payload: false }); -> In this case we set payload to false as we set it true in Login
            navigate('/Login');
        })
```
- Now Rendering Navbar Conditionally
If user is already logged in then we don't show the Register & Login Button in Navbar & if user is logged out then we don't show the Logout Button
- Import UserContext, useContext in ```Navbar.js```
- Initialize ```const { state, dispatch } = useContext(UserContext)```
```bash
  const RenderNavBar = () => {
    if (state) {
      return (
        <>
          <li class="nav-item">
            <Link class="nav-link" to='/Logout' >Logout</Link>
          </li>
        </>
      )
    }
    else {
      return (
        <>
          <li class="nav-item">
            <Link class="nav-link" to='/Login' >Login</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to='/Register' >Registration</Link>
          </li>
        </>
      )
    }
  }
```
- I cut off Home, About, Contact Button From Navbar to Short The Code Documentation. It will be added defaulty in both state = true & false cases.

### Run The App
- Install Node Modules ```npm i```
- Run The Server ```node server.js```
- Run The Client ```npm start```
- Acess ```http://localhost:3000/```
