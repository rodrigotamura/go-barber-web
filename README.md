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
