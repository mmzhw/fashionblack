import 'babel-polyfill';
import dva from 'dva';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js-image-plugin/lib/plugin.css';
import './styles/normal.css';
import { history } from './utils/history.js';

// import createHistory from 'history/createBrowserHistory';

// const app = dva();
// 1. Initialize
const app = dva({
    history,
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/index').default);
app.model(require('./models/activity').default);
app.model(require('./models/acdetail').default);
app.model(require('./models/option').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
