# About this project

Welcome! This is **GoBarber - Providers App**!

![go-barber](./img/app.gif)

Basically it is an application made with ReactJS with several features and resources. GoBarber - Providers App is consuming [GoBarber API](https://github.com/rodrigotamura/go-stack-2019/tree/master/module02), made with Express Framework.

- [Extras about routes](#extras-about-routes)
  - [Protecting Routes](#protecting-routes)
  - [Creating custom 404 page](#creating-custom-404-page)
- [Using root import](#using-root-import)
- [Using Unform](#using-unform)
- [Validating](#validating)
- [Configuring Store](#configuring-store)
  - [Adding Redux, Saga, Immer and its features](#adding-redux--saga--immer-and-its-features)
- [Implementing Authentication](#implementing-authentication)
- [Storing profile](#storing-profile)
  - [Persisting data - Redux Persist](#persisting-data---redux-persist)
- [Refactoring Reducer](#refactoring-reducer)
- [Treating with invalid login](#treating-with-invalid-login)
- [Authenticated Requests](#authenticated-requests)
- [Scrollbar](#scrollbar)
- [Calculating date and time with Date FNS](#calculating-date-and-time-with-date-fns)
- [Updating avatar](#updating-avatar)
- [Schedule - Timezones and UTC](#schedule---timezones-and-utc)

# Extras about routes

### Protecting Routes

How could we protect specific pages, like Dashboard and Profile?

1. Create [/src/routes/Route.js](./src/routes/Route.js) (open this file for further details).
2. Add `isPrivate` at the routes we want to protect (accessed by a authenticated user only) within [/src/Routes/index.js])(./src/Routes/index.js):

```javascript
<Route path="/dashboard" component={Dashboard} isPrivate />
```

3. Remove _Route_ importation from _react-router-dom_ and import _/src/routes/Route.js_ into [/src/routes/index.js](./src/routes/index.js).

```javascript
import { Switch } from 'react-router-dom';
import Route from './Route';
```

Now every route which has `isPrivate` will be protected.

NOTE that we created a kind of middleware in Routes, intercepting with a custom `<Route>` in order to implement protected routes.

### Creating custom 404 page

At [/src/routes/index.js](./src/routes/index.js) we will add a new route (latest one):

```javascript
<Switch>
  // another routes
  <Route path="/" component={() => <h1>404</h1>} />
  // It could be a component as a file
</Switch>
```

# Using root import

Every time we want to call some file in our scripts, like:

```javascript
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
```

We must indicate `../.../../../` 😓 every time! And it is very boring to do that!

However, if we want to simplify this process making it less boring, we need to install an extra plugin from Babel (remembering that Babel transpiles our code in a manner that the browsers understand). But we know that a project created through `yarn create react-app`, Babel and Webpack's configurations are encapsuled in their packages (we do not have an easily access in its configurations). we need to install two libs which allow us to configure in our manner these settings within a project created by `creat react-app`:

`$ yarn add customize-cra react-app-rewired babel-plugin-root-import -D`

Create [./config-overrides.js](./config-overrides.js). This file will be loaded by `react-app-rewired` and we can set any configurations. Please open it to see the configurations.

Now, `~/` represents `/src/` and we can call files like this:

```javascript
import SignIn from '~/pages/Signin';
import SignUp from '~/pages/Signup';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
```

Then, open [./package.json](./package.json) and change the scripts by:

```javascript
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-scripts eject"
},
```

However ESLint will not understand this `~` and will warn this callings as errors. 🤔
To solve this, install:
`$ yarn add eslint-import-resolver-babel-plugin-root-import -D`

Open [./.eslintrc.js](./.eslintrc.js) and add this configuration under `rules` configs:

```javascript
rules: { ... },
settings: {
  "import/resolver": {
    "babel-plugin-root-import": {
      rootPathSuffix: "src"
  }
}}
```

It's done! ESlint now may understand `~/` importings.

Wait! There is a last configuration we should make! 😒

If you try to open `'~/pages/Signin'` with <kbd>CTRL</kbd>+<kbd>Right-click</kbd>, VSCode will not open this file automatically. To solve it create [./jsconfig.json](./jsconfig.json). Open this file for further details.

# Using Unform

By default, if we want to get the inputs values (from authentication and registration) we should create states monitoring every changes in these inputs by `onChange` storing them into a state variable, and get these variables submiting to API.

We have a lib which create performatic forms which we can use in our ReactJS projects:

`$ yarn add @rocketseat/unform`

1. Import it within [SignIn page](./src/pages/Signin/index.js)

```javascript
import { Form, Input } from '@rocketseat/unform';
```

2. Replace `<form>` into `<Form>` and `<input>` into `<Input>`;
3. Add in each `<Input>` a `name`;
4. Add `<Form onSubmit={handleSubmit}>` and include a new function:

```javascript
function handleSubmit(data) {
  console.tron.log(data);
}
```

5. Try it submitting something and you will see each input along with its value.

# Validating

Let's implement validation which it will prevent the user to submit form with invalid inputs.

Install: `$ yarn add yup`
(Yes! this Yup we've implemented in our GoBarber's backend 👍! [Click here to remember](https://github.com/rodrigotamura/go-stack-2019/tree/master/module02#validation) and go back here again!)

Please, open [Signin page](.src/pages/Signin/index.js) and [Signup page](./src/pages/Signun/index.js) to see the implementations.

Now, trying validation you will see the error messages:

![validate error](./img/validate.png)

We could apply some stylization on these error messages [here](./src/pages/_layouts/auth/styles.js).

As long as there ae errors in the validation, the form will not submit.

# Configuring Store

The authentication we will make using Redux, because the JWT token must be available in whole application. It includes also the user's informations which we will use them on many components, e.g. Header component which indicates who is logged in.

### Adding Redux, Saga, Immer and its features

For a deeper understanding about it, [click here](https://github.com/rodrigotamura/go-stack-2019/tree/master/module04/flux#configuring-redux).

However in a nutshell we'll explain again about Redux and Saga implementations:

1. Install `$ yarn add redux redux-saga react-redux reactotron-redux reactotron-redux-saga immer`
2. Create these folders and files under `/src/`:

![redux files](./img/redux-files.png)

3. Coding [reducer](./src/store/modules/auth/reducer.js);
4. Coding [actions](./src/store/modules/auth/actions.js);
5. Coding [sagas](./src/store/modules/auth/sagas.js);
6. Coding [rootReducer](./src/store/modules/rootReducer.js);
7. Coding [rootSaga](./src/store/modules/rootSaga.js);
8. Coding [Redux configuration](./src/store/index.js);

   8.1 We will create [/src/store/createStore.js](./src/store/createStore.js) in order to not make so big the [Redux configuration](./src/store/index.js);

9. Configuring [Reactotron config](./src/config/ReactotronConfig.js) for Redux recognition;

   9.1 Open [Redux configuration](./src/store/index.js);
   9.2 Open [/src/store/createStore.js](./src/store/createStore.js);

10. Open [App.js](./src/App.js)
11. Test it, openning Reactotron Destop, and adding a new _state_ called `auth`:

![Reactotron+Redux](./img/reactotron-redux.png)

# Implementing Authentication

1. Create functions `signInRequest()`, `signInSuccess()` and `signFailure()` in [actions](./src/store/modules/auth/actions.js);
2. Open [sagas](./src/store/modules/auth/sagas.js) and code `signIn()` function;
3. Open [Signin page](.src/pages/Signin/index.js) and implement React Hooks (`useDispatch`), and import `signInRequest()` from `/src/store/modules/auth/actions.js` which SignIn component need to fire in order to Saga listen on it and make the authentication process;

Now, if you try to sign in again with correct e-mail and password, Reactotron DEsktop will show us:

![Reactotron+Auth](./img/reactotron-auth.png)

Note that `CALL` (calling API) is returning successfully the JWT token, and `PUT` is sending `token` and `user` with its values into `@auth/SIGN_IN_SUCCESS`.

We need now to make the variable `signed` within [Route](src/routes/Route.js) receives dynamically wether user is logged in or not:

![Auth variable](./img/auth-variable.png)

To make it, we need firstly open [reducer](./src/store/modules/auth/reducer.js) and set the `INITIAL_STATE` and add a new behavior when the action `@auth/SIGN_IN_SUCCESS` is fired. Remembering that our token and user's informations retrieved from API are stored in `payload` object within`action`:

![Reducer action](./img/reducer-action.png)

If you try to login again, Reactotron will show us that **auth reducer** has the follow data:

![Reactotron Token](./img/reactotron-token.png)

Open [Route](src/routes/Route.js) and import Redux configurations and `signed` variable will receive the Redux's state:

![Route Redux](./img/route-redux.png)

# Storing profile

Till now, if the user login into the application properly and refresh the page, it will lose its profile data and token.

In order to store the user informations (not token yet), we will create another Reducer called User. Because token is a kind of information related to authentication, and user's profile (e.g. name, e-mail address, etc.) is related to profile itself.

So, let's create:

- [User reducer](./src/store/modules/user/reducer.js);
- [User actions](./src/store/modules/user/actions.js);
- [User sagas](./src/store/modules/user/sagas.js);

Do not forget to import in [rootReducer](./src/store/modules/rootReducer.js) and [rootSaga](./src/store/modules/rootSaga.js).

Open Reactotron Desktop, and add user in State. Login again and you will see:

![Reactotron user](./img/reactotron-user.png)

### Persisting data - Redux Persist

Let's make now the user's data stored in Redux does not lose when user close or refresh the page.

We will use a lib called **Redux Persist**:

`$ yarn add redux-persist`

Create a new file: [/src/store/persistReducers.js](./src/store/persistReducers.js). Open it to check out further implementations.

Redux Persist can persist data in a local storage, database, async storage (React Native), and so on.
In this approach we will are importing and using:

```javascript
import storage from 'redux-persist/lib/storage';
```

It is setting our application is going to use **local storage**, when our application is running over a browser, or **async storage (which is SQLite DB)** when our application is running over mobile (React Native).

Now, open [Redux configuration](./src/store/index.js) and include extra configurations in order to use Redux Persist.

![Redux Persist](./img/redux-persist.png)

Open [App.js](./src/App.js) and [Route](./src/routes/Route.js), change the importing of store from './store' to `import { store } from '~/store'`.

At [App.js](./src/App.js) let's apply extra settings:

![Persist app](./img/persist-app.png)

`PersistGate` will render the content of `<Router>` only after taken the information in Storage from our application.

Refreshing the application, you might see at Reactotron Desktop some extra logs:

![Reactotron persist](./img/reactotron-persist.png)

`REHYDRATE` means that it went to storage of the application, has taken the data which are saved (you may see `payload->auth / user`) and include them into Redux.

Now, if you try to login in the application with the right credentials and refresh the page, probably you will keep logged in, and Reactotron will display within `REHYDRATE` the data of the logged user:

![Chrome Persist](./img/chrome-persist.png)

# Refactoring Reducer

Maybe you are realizing that the code in [Auth Reducer](./src/store/modules/auth/reducer.js) is repeating `return produce(state, draft => { .... })`:

![Reducer repeat](./img/reducer-repeat.png)

We could refactory it transforming into:

![Reducer repeat new](./img/reducer-repeat-new.png)

# Treating with invalid login

Open [Auth Sagas](./src/store/modules/auth/sagas.js) and simply let's implement an error handling with `try/catch`.

# Authenticated Requests

We need now add token at each requesting header with Axios.

Open [Auth Sagas](./src/store/modules/auth/sagas.js) and include:

```javascript
api.defaults.headers.Authorization = `Bearer ${token}`;
```

For testing purpose, let's open [Dashboard page](./src/pages/Dashboard/index.js) and make an API request within component:

```javascript
import React from 'react';
import api from '~/services/api';

// import { Container } from './styles';

export default function Dashboard() {
  api.get('appointments');
  return <h1>Dashboard</h1>;
}
```

Run application, open _Network_ tab in developer tools and try to login with coorect credentials. Probably you should see:

![Developer Tools](./img/developer-tools.png)

Look at `Status` which is `200`. It means that JWT authentication is working 👍.

However, if the user refresh the page, it will return an error, because `signin()` of SAGAS is not running.

To solve it, firstly let's open Timeline menu in Reactotron Desktop. You will see that `persist/REHYDRATE` is persisting user's data, including its token.

A very increadible thing we can do is to **listen to `persist/REHYDRATE`**. Open [Auth Sagas](./src/store/modules/auth/sagas.js) and you can implement:

```javascript
export function setToken({ payload }) {
  if (!payload) return; // if payload is empty, meaning that user is not loggedin

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
```

Now, every time when `persist/REHYDRATE` is fired, `setToken()` will be executed, setting token part of header requests.

# Scrollbar

In our [Notification Component](./src/components/Notifications/index.js) we need to add a scrollbar, because we do not want a large list transpassing the viewport.

Let's install `$ yarn add react-perfect-scrollbar`.

Now, include a styled component (let's call it `Scroll`) surrounding the content of our list and add it into [Styled Component from Notifications](./src/components/Notifications/styles.js).

Finally add the styles from React Perfect Scrollbar into [Global Styles](./src/styles/global.js)

# Calculating date and time with Date FNS

At Notifications, we want to display the relative date time which a notification was created:

![Notification date](./img/notification-date.png)

If we make a GET request to notifications from GoBarber API, we will get these data:

![Notification created](./img/notification-created.png)

So, by `created_at` we will calc how long the notification was created.

In order to make this calc, let's install a new lib:

`$ yarn add date-fns@next` (@next means more recent version)

Open [Notification Component](./src/components/Notifications/index.js) to check out further informations.

# Updating avatar

Create [/src/pages/Profile/AvatarInput/index.js](./src/pages/Profile/AvatarInput/index.js). Import:

```javascript
import { useField } from '@rocketseat/unform';
```

`useField()` is a React Hook which will help to build personal fields in a component.

Our goal is to show the current avatar. When user choose another avatar from file, it will show a preview of it.

# Schedule - Timezones and UTC

Listing the schedules at [/src/pages/Dashboard/index.js](./src/pages/Dashboard/index.js) we have some inconsistences.

Our frontend is taking the time from the local computer of user/client (`new Date()`), however the time of schedules from API are stored without timezone (global format or UTC - in Brazil UTC is -3).

If we want to make some comparision between dates from client's computer and our API computer is to set the front end works also with UTC.

To do it, we will install a lib `$ yarn add date-fns-tz` which deals with timezones. Import it where we need to implement it (our case is within [Dashboard component](./src/pages/Dashboard/index.js)):

```javascript
import { utcToZonedTime } from 'date-fns-tz';
```

This `utcToZonedTime` will convert the timezone onto UTC (without timezone).
