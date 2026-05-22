// masterModulePool.js — Full domain module pool with scoring metadata

export const getRandomSubset = (arr, count = 5) => {
  if (!arr || !arr.length) return [];
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, Math.min(count, arr.length));
};

// ─── MERN POOL ────────────────────────────────────────────────────────────────
const MERN_POOL = [
  {
    id: 'mern_html_css', title: 'HTML5 & CSS3 Foundations',
    description: 'Semantic markup, Flexbox, CSS Grid, responsive design principles.',
    difficulty: 'beginner', baseDays: 5, prerequisites: [],
    skillsCovered: ['html', 'css', 'responsive'],
    tags: ['ui', 'frontend', 'web'],
    careerGoalScores: { 'frontend developer': 10, 'full stack developer': 8, 'mern developer': 8, 'backend developer': 3 },
    tasks: [
      { id: 'mern_html_t1', title: 'Build a responsive portfolio page using semantic HTML5 elements', completed: false, difficulty: 'beginner', learningResources: [{ title: 'MDN HTML Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', type: 'article' }] },
      { id: 'mern_html_t2', title: 'Create multi-column layouts using CSS Grid and Flexbox', completed: false, difficulty: 'beginner', learningResources: [{ title: 'CSS Grid Guide', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', type: 'article' }] },
    ],
    quizzes: [
      { id: 'mq1', question: 'Which HTML5 element represents self-contained content?', options: ['<section>', '<article>', '<div>', '<span>'], correctAnswer: 1, explanation: '<article> is for self-contained, distributable content.' },
      { id: 'mq2', question: 'Which CSS property creates a 3-column equal-width grid?', options: ['grid-columns: 3', 'repeat(3, 1fr)', 'columns: 3', 'flex: 3'], correctAnswer: 1, explanation: 'repeat(3, 1fr) inside grid-template-columns creates 3 equal columns.' },
      { id: 'mq3', question: 'What does box-sizing: border-box do?', options: ['Adds extra padding', 'Includes padding and border in element total size', 'Removes margin', 'Sets border style'], correctAnswer: 1, explanation: 'border-box ensures padding+border are inside the declared width.' },
      { id: 'mq4', question: 'Which unit is relative to the viewport width?', options: ['em', 'rem', 'vw', 'px'], correctAnswer: 2, explanation: 'vw is 1% of the viewport width.' },
      { id: 'mq5', question: 'What is the default display value of a <div>?', options: ['inline', 'block', 'flex', 'grid'], correctAnswer: 1, explanation: '<div> is a block-level element by default.' },
      { id: 'mq6', question: 'Which pseudo-class targets the first child element?', options: [':first', ':first-child', ':nth(1)', ':initial'], correctAnswer: 1, explanation: ':first-child selects the element that is the first child of its parent.' },
      { id: 'mq7', question: 'What does position: absolute do?', options: ['Fixes element to viewport', 'Positions relative to nearest positioned ancestor', 'Removes from flow relative to body', 'Stacks on top of all elements'], correctAnswer: 1, explanation: 'absolute positions the element relative to its nearest non-static ancestor.' },
      { id: 'mq8', question: 'Which CSS property controls stacking order?', options: ['order', 'z-index', 'position', 'layer'], correctAnswer: 1, explanation: 'z-index controls the stack level of positioned elements.' },
      { id: 'mq9', question: 'What does media query @media (max-width: 768px) target?', options: ['Screens wider than 768px', 'Screens 768px or narrower', 'Print layouts only', 'Retina displays'], correctAnswer: 1, explanation: 'max-width: 768px applies styles on screens up to 768px wide.' },
      { id: 'mq10', question: 'Which value of align-items centers children vertically in a flex container?', options: ['justify', 'center', 'middle', 'stretch'], correctAnswer: 1, explanation: 'align-items: center centers children on the cross axis.' },
    ]
  },
  {
    id: 'mern_js_core', title: 'Modern JavaScript (ES6+)',
    description: 'Closures, async/await, destructuring, modules, event loop.',
    difficulty: 'beginner', baseDays: 7, prerequisites: ['mern_html_css'],
    skillsCovered: ['javascript', 'es6', 'async'],
    tags: ['frontend', 'backend', 'web'],
    careerGoalScores: { 'frontend developer': 10, 'full stack developer': 10, 'mern developer': 10, 'backend developer': 8 },
    tasks: [
      { id: 'mern_js_t1', title: 'Build a promise chain that fetches weather data and handles errors gracefully', completed: false, difficulty: 'beginner', learningResources: [{ title: 'JavaScript.info Async', url: 'https://javascript.info/async', type: 'tutorial' }] },
      { id: 'mern_js_t2', title: 'Implement a module system with ES6 imports/exports and closures', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'MDN Modules', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules', type: 'article' }] },
    ],
    quizzes: [
      { id: 'jsq1', question: 'What does Array.prototype.filter() return?', options: ['Modified original array', 'New filtered array', 'Boolean', 'Index'], correctAnswer: 1, explanation: 'filter() returns a new array without mutating the original.' },
      { id: 'jsq2', question: 'What is a closure?', options: ['A function that returns undefined', 'A function that retains access to its outer scope after execution', 'An arrow function', 'A promise'], correctAnswer: 1, explanation: 'Closures allow inner functions to access outer function variables.' },
      { id: 'jsq3', question: 'What does the spread operator (...) do?', options: ['Compresses arrays', 'Expands iterables into individual elements', 'Creates closures', 'Declares variables'], correctAnswer: 1, explanation: 'Spread expands arrays/objects into individual elements.' },
      { id: 'jsq4', question: 'Which keyword prevents variable re-declaration?', options: ['var', 'let', 'const', 'def'], correctAnswer: 2, explanation: 'const prevents reassignment; let prevents re-declaration in the same scope.' },
      { id: 'jsq5', question: 'What does async/await simplify?', options: ['DOM manipulation', 'Promise-based asynchronous code', 'Module imports', 'Event listeners'], correctAnswer: 1, explanation: 'async/await is syntactic sugar over Promises for readable async code.' },
      { id: 'jsq6', question: 'What is the output of typeof null?', options: ['"null"', '"object"', '"undefined"', '"boolean"'], correctAnswer: 1, explanation: 'typeof null returns "object" due to a historical JavaScript bug.' },
      { id: 'jsq7', question: 'What does JSON.parse() do?', options: ['Converts object to string', 'Converts JSON string to JS object', 'Validates JSON schema', 'Minifies JSON'], correctAnswer: 1, explanation: 'JSON.parse() deserializes a JSON string into a JavaScript object.' },
      { id: 'jsq8', question: 'What is event bubbling?', options: ['Events firing before DOM loads', 'Events propagating upward from child to parent', 'Events captured at root first', 'Async event queue'], correctAnswer: 1, explanation: 'Bubbling means the event fires on the target then propagates up the DOM.' },
      { id: 'jsq9', question: 'Which method removes the last element of an array?', options: ['shift()', 'pop()', 'splice()', 'delete()'], correctAnswer: 1, explanation: 'pop() removes and returns the last element of an array.' },
      { id: 'jsq10', question: 'What is a Promise in JavaScript?', options: ['A synchronous callback', 'An object representing eventual completion or failure of async operations', 'A type of loop', 'A module pattern'], correctAnswer: 1, explanation: 'Promises represent the eventual result of an asynchronous operation.' },
    ]
  },
  {
    id: 'mern_react_core', title: 'React.js Core — Components & Hooks',
    description: 'Functional components, useState, useEffect, props, React Router.',
    difficulty: 'intermediate', baseDays: 8, prerequisites: ['mern_js_core'],
    skillsCovered: ['react', 'components', 'hooks'],
    tags: ['frontend', 'ui', 'react'],
    careerGoalScores: { 'frontend developer': 10, 'full stack developer': 9, 'mern developer': 10, 'backend developer': 2 },
    tasks: [
      { id: 'mern_react_t1', title: 'Build a CRUD todo app using useState and useEffect hooks', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'React Docs', url: 'https://react.dev', type: 'docs' }] },
      { id: 'mern_react_t2', title: 'Implement client-side routing with React Router v6 protected routes', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'React Router Docs', url: 'https://reactrouter.com', type: 'docs' }] },
    ],
    quizzes: [
      { id: 'rq1', question: 'Which hook manages local component state?', options: ['useRef', 'useEffect', 'useState', 'useMemo'], correctAnswer: 2, explanation: 'useState declares a reactive state variable and its setter.' },
      { id: 'rq2', question: 'What triggers a component re-render?', options: ['DOM mutation', 'State or prop change', 'Window resize', 'console.log'], correctAnswer: 1, explanation: 'React re-renders when state or props change.' },
      { id: 'rq3', question: 'What does useEffect with an empty array [] do?', options: ['Runs every render', 'Runs only on mount', 'Never runs', 'Runs on unmount only'], correctAnswer: 1, explanation: 'An empty dependency array means the effect runs once after the initial render.' },
      { id: 'rq4', question: 'What is the purpose of the key prop in lists?', options: ['CSS targeting', 'Unique identification for reconciliation', 'Animation triggers', 'Accessibility'], correctAnswer: 1, explanation: 'Keys help React identify which items have changed in a list.' },
      { id: 'rq5', question: 'What does React.memo do?', options: ['Caches async data', 'Memoizes component to skip re-renders on unchanged props', 'Adds memoization to hooks', 'Creates global state'], correctAnswer: 1, explanation: 'React.memo wraps a component to skip re-renders if props are unchanged.' },
      { id: 'rq6', question: 'How do you pass data from parent to child?', options: ['Via context only', 'Via props', 'Via state lifting only', 'Via refs'], correctAnswer: 1, explanation: 'Props are the standard mechanism for parent-to-child data flow in React.' },
      { id: 'rq7', question: 'What is the virtual DOM?', options: ['A server-side DOM', 'A lightweight JS representation of the real DOM for efficient diffing', 'A shadow DOM', 'A React component tree'], correctAnswer: 1, explanation: 'React maintains a virtual DOM to compute minimal real DOM updates.' },
      { id: 'rq8', question: 'Which hook runs cleanup on component unmount?', options: ['useState', 'useCallback', 'useEffect returning a function', 'useRef'], correctAnswer: 2, explanation: 'Returning a cleanup function from useEffect runs it on unmount.' },
      { id: 'rq9', question: 'What is JSX?', options: ['A JS framework', 'Syntax extension allowing HTML-like code in JavaScript', 'A CSS preprocessor', 'A build tool'], correctAnswer: 1, explanation: 'JSX is transpiled by Babel into React.createElement calls.' },
      { id: 'rq10', question: 'How do you lift state up in React?', options: ['Use Redux only', 'Move state to the nearest common ancestor component', 'Use localStorage', 'Use refs'], correctAnswer: 1, explanation: 'State lifting shares state between siblings by moving it to their common parent.' },
    ]
  },
  {
    id: 'mern_react_advanced', title: 'React Advanced — Context, Redux & Performance',
    description: 'Context API, Redux Toolkit, useMemo, useCallback, code splitting.',
    difficulty: 'advanced', baseDays: 8, prerequisites: ['mern_react_core'],
    skillsCovered: ['react', 'redux', 'context', 'performance'],
    tags: ['frontend', 'react', 'state-management'],
    careerGoalScores: { 'frontend developer': 10, 'full stack developer': 7, 'mern developer': 8, 'backend developer': 1 },
    tasks: [
      { id: 'mern_radv_t1', title: 'Refactor a prop-drilled app to use React Context API', completed: false, difficulty: 'advanced', learningResources: [{ title: 'React Context', url: 'https://react.dev/reference/react/createContext', type: 'docs' }] },
      { id: 'mern_radv_t2', title: 'Implement Redux Toolkit with async thunks for API state', completed: false, difficulty: 'advanced', learningResources: [{ title: 'Redux Toolkit', url: 'https://redux-toolkit.js.org', type: 'docs' }] },
    ],
    quizzes: [
      { id: 'radv_q1', question: 'What problem does Context API solve?', options: ['HTTP requests', 'Prop drilling', 'CSS styling', 'Routing'], correctAnswer: 1, explanation: 'Context avoids passing props through many intermediate components.' },
      { id: 'radv_q2', question: 'What does useMemo cache?', options: ['Functions', 'DOM elements', 'Computed values', 'API calls'], correctAnswer: 2, explanation: 'useMemo memoizes the result of a computation to avoid recalculation.' },
      { id: 'radv_q3', question: 'What is a Redux slice?', options: ['A UI component', 'A collection of reducer logic and actions for a feature', 'A middleware', 'A router config'], correctAnswer: 1, explanation: 'createSlice generates actions and reducers for a feature in one place.' },
      { id: 'radv_q4', question: 'What does React.lazy() enable?', options: ['Server-side rendering', 'Code splitting with dynamic imports', 'Concurrent rendering', 'Suspense fallback'], correctAnswer: 1, explanation: 'React.lazy() loads components only when they are needed.' },
      { id: 'radv_q5', question: 'When should you use useCallback?', options: ['To cache a value', 'To memoize a callback function passed to child components', 'To fetch data', 'To access DOM'], correctAnswer: 1, explanation: 'useCallback prevents unnecessary re-creation of functions on every render.' },
      { id: 'radv_q6', question: 'What is the Redux dispatch function used for?', options: ['Rendering components', 'Sending actions to the store', 'Subscribing to state', 'Creating middleware'], correctAnswer: 1, explanation: 'dispatch sends actions to the Redux store to trigger state changes.' },
      { id: 'radv_q7', question: 'What is React Suspense?', options: ['A CSS animation', 'A component that shows a fallback while lazy content loads', 'An error boundary', 'A context provider'], correctAnswer: 1, explanation: 'Suspense wraps lazy-loaded components and shows a fallback while loading.' },
      { id: 'radv_q8', question: 'What does the Redux selector do?', options: ['Modifies state', 'Extracts specific pieces of state from the store', 'Creates actions', 'Dispatches async calls'], correctAnswer: 1, explanation: 'Selectors are functions that derive and return specific state slices.' },
      { id: 'radv_q9', question: 'What is the purpose of the Provider component in Redux?', options: ['Creates the store', 'Wraps the app to make the store available to all components', 'Dispatches actions', 'Creates slices'], correctAnswer: 1, explanation: 'Provider makes the Redux store accessible throughout the component tree.' },
      { id: 'radv_q10', question: 'What does createAsyncThunk do?', options: ['Creates synchronous reducers', 'Generates thunks for handling async logic with pending/fulfilled/rejected states', 'Replaces Axios', 'Validates API responses'], correctAnswer: 1, explanation: 'createAsyncThunk handles the full lifecycle of an async operation automatically.' },
    ]
  },
  {
    id: 'mern_node_express', title: 'Node.js & Express.js API Design',
    description: 'Server setup, REST API, middleware, error handling, MVC pattern.',
    difficulty: 'intermediate', baseDays: 8, prerequisites: ['mern_js_core'],
    skillsCovered: ['node', 'express', 'rest-api', 'middleware'],
    tags: ['backend', 'api', 'server'],
    careerGoalScores: { 'backend developer': 10, 'full stack developer': 10, 'mern developer': 10, 'frontend developer': 2 },
    tasks: [
      { id: 'mern_node_t1', title: 'Build a RESTful API with Express.js MVC structure and error middleware', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'Express.js Guide', url: 'https://expressjs.com/en/guide/routing.html', type: 'docs' }] },
      { id: 'mern_node_t2', title: 'Implement rate limiting, CORS, and helmet security headers', completed: false, difficulty: 'advanced', learningResources: [{ title: 'Express Security', url: 'https://expressjs.com/en/advanced/best-practice-security.html', type: 'article' }] },
    ],
    quizzes: [
      { id: 'nq1', question: 'What is the signature of Express error-handling middleware?', options: ['(req,res)', '(req,res,next)', '(err,req,res,next)', '(err,res)'], correctAnswer: 2, explanation: '4 parameters tell Express this is an error handler.' },
      { id: 'nq2', question: 'What does app.use() do?', options: ['Defines GET routes', 'Mounts middleware for all routes', 'Starts the server', 'Sets headers'], correctAnswer: 1, explanation: 'app.use() mounts middleware functions into the request pipeline.' },
      { id: 'nq3', question: 'Which HTTP method is idempotent and used for full updates?', options: ['POST', 'PATCH', 'PUT', 'DELETE'], correctAnswer: 2, explanation: 'PUT replaces the entire resource and is idempotent.' },
      { id: 'nq4', question: 'What does express.json() middleware do?', options: ['Sends JSON responses', 'Parses incoming JSON request bodies', 'Validates JSON schemas', 'Encodes JSON'], correctAnswer: 1, explanation: 'express.json() parses request bodies with Content-Type: application/json.' },
      { id: 'nq5', question: 'What is the purpose of next() in middleware?', options: ['Ends request cycle', 'Passes control to the next middleware/route handler', 'Retries request', 'Logs errors'], correctAnswer: 1, explanation: 'next() passes execution to the next matching middleware.' },
      { id: 'nq6', question: 'What HTTP status code means "resource not found"?', options: ['400', '403', '404', '500'], correctAnswer: 2, explanation: '404 Not Found is returned when a resource cannot be located.' },
      { id: 'nq7', question: 'What is CORS?', options: ['Content encoding standard', 'Mechanism controlling cross-origin HTTP requests', 'REST API pattern', 'Auth protocol'], correctAnswer: 1, explanation: 'CORS lets servers specify which origins can access their resources.' },
      { id: 'nq8', question: 'What is Nodemon used for?', options: ['Production server', 'Auto-restarting Node server on file changes', 'Load balancing', 'Minifying code'], correctAnswer: 1, explanation: 'Nodemon watches files and restarts the server automatically during development.' },
      { id: 'nq9', question: 'What does res.status(201).json() do?', options: ['Sets error status', 'Sends a 201 Created response with JSON body', 'Redirects request', 'Logs to console'], correctAnswer: 1, explanation: '201 Created signals successful resource creation.' },
      { id: 'nq10', question: 'What is the MVC pattern?', options: ['Mobile, Video, Content', 'Model-View-Controller separation of concerns', 'Middleware-Validation-Cache', 'Multi-Version Control'], correctAnswer: 1, explanation: 'MVC separates data (Model), UI (View), and logic (Controller).' },
    ]
  },
  {
    id: 'mern_mongo_auth', title: 'MongoDB, Mongoose & JWT Authentication',
    description: 'Schema design, validation, bcrypt password hashing, JWT auth flow.',
    difficulty: 'intermediate', baseDays: 9, prerequisites: ['mern_node_express'],
    skillsCovered: ['mongodb', 'mongoose', 'jwt', 'bcrypt', 'security'],
    tags: ['backend', 'database', 'auth', 'security'],
    careerGoalScores: { 'backend developer': 10, 'full stack developer': 10, 'mern developer': 10, 'frontend developer': 3 },
    tasks: [
      { id: 'mern_mongo_t1', title: 'Design a MongoDB schema with Mongoose validators and pre-save hooks', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'Mongoose Guide', url: 'https://mongoosejs.com/docs/guide.html', type: 'docs' }] },
      { id: 'mern_mongo_t2', title: 'Implement full JWT login/signup with bcrypt password hashing', completed: false, difficulty: 'advanced', learningResources: [{ title: 'JWT.io Introduction', url: 'https://jwt.io/introduction', type: 'article' }] },
    ],
    quizzes: [
      { id: 'mdbq1', question: 'What type of database is MongoDB?', options: ['Relational', 'Graph', 'Document NoSQL', 'Key-Value'], correctAnswer: 2, explanation: 'MongoDB stores data as BSON documents, making it a document-oriented NoSQL DB.' },
      { id: 'mdbq2', question: 'What algorithm is recommended for password hashing?', options: ['MD5', 'SHA-1', 'bcrypt', 'Base64'], correctAnswer: 2, explanation: 'bcrypt is adaptive and resistant to brute-force attacks.' },
      { id: 'mdbq3', question: 'What are the 3 parts of a JWT?', options: ['Key, Value, Sig', 'Header, Payload, Signature', 'User, Token, Expiry', 'Auth, Data, Hash'], correctAnswer: 1, explanation: 'JWTs consist of Header.Payload.Signature encoded in Base64.' },
      { id: 'mdbq4', question: 'How do you reference another collection in Mongoose?', options: ['type: String, ref: true', 'type: ObjectId, ref: "Model"', 'type: Array, foreign: "Model"', 'type: Ref'], correctAnswer: 1, explanation: 'Schema.Types.ObjectId with ref establishes a collection reference.' },
      { id: 'mdbq5', question: 'What does a Mongoose pre-save hook do?', options: ['Validates schema', 'Runs custom logic before document is saved', 'Sends webhooks', 'Creates indexes'], correctAnswer: 1, explanation: 'pre("save") hooks intercept the save operation to run middleware logic.' },
      { id: 'mdbq6', question: 'What is bcrypt salt rounds?', options: ['Password length requirement', 'Cost factor determining hashing complexity', 'Number of DB writes', 'Token expiry duration'], correctAnswer: 1, explanation: 'Salt rounds exponentially increase hashing time, making brute-force harder.' },
      { id: 'mdbq7', question: 'What does JWT verify() do?', options: ['Creates a token', 'Checks token validity and decodes payload', 'Refreshes token', 'Logs user out'], correctAnswer: 1, explanation: 'jwt.verify() validates signature and decodes the token payload.' },
      { id: 'mdbq8', question: 'What is MongoDB indexing used for?', options: ['Data encryption', 'Speeding up read query performance', 'Schema validation', 'Write batching'], correctAnswer: 1, explanation: 'Indexes create optimized data structures to avoid full collection scans.' },
      { id: 'mdbq9', question: 'What does mongoose.populate() do?', options: ['Seeds the database', 'Replaces ObjectId references with actual documents', 'Creates virtuals', 'Runs aggregations'], correctAnswer: 1, explanation: 'populate() performs a join-like operation to fetch referenced documents.' },
      { id: 'mdbq10', question: 'Where should JWT tokens be stored securely in a browser?', options: ['localStorage', 'sessionStorage', 'HttpOnly Cookies', 'IndexedDB'], correctAnswer: 2, explanation: 'HttpOnly cookies are inaccessible to JavaScript, protecting against XSS.' },
    ]
  },
  {
    id: 'mern_testing', title: 'Testing — Jest & React Testing Library',
    description: 'Unit testing, integration testing, mocking, test-driven development.',
    difficulty: 'advanced', baseDays: 6, prerequisites: ['mern_react_core', 'mern_node_express'],
    skillsCovered: ['testing', 'jest', 'tdd'],
    tags: ['testing', 'quality', 'backend', 'frontend'],
    careerGoalScores: { 'full stack developer': 9, 'frontend developer': 8, 'backend developer': 8, 'mern developer': 7 },
    tasks: [
      { id: 'mern_test_t1', title: 'Write unit tests for utility functions with Jest and 80%+ coverage', completed: false, difficulty: 'advanced', learningResources: [{ title: 'Jest Docs', url: 'https://jestjs.io/docs/getting-started', type: 'docs' }] },
    ],
    quizzes: [
      { id: 'tq1', question: 'What is TDD?', options: ['Test Data Driven', 'Write tests before code', 'Testing after deployment', 'Type-Driven Development'], correctAnswer: 1, explanation: 'TDD involves writing failing tests first, then writing code to pass them.' },
      { id: 'tq2', question: 'What does jest.mock() do?', options: ['Runs tests faster', 'Replaces a module with a mock implementation', 'Creates test data', 'Asserts equality'], correctAnswer: 1, explanation: 'jest.mock() replaces the module so its side effects can be controlled.' },
      { id: 'tq3', question: 'What is code coverage?', options: ['Lines of code written', 'Percentage of code executed by tests', 'Test suite size', 'Bug count metric'], correctAnswer: 1, explanation: 'Code coverage measures how much production code is executed by tests.' },
      { id: 'tq4', question: 'What does expect().toEqual() check?', options: ['Reference equality', 'Deep value equality', 'Type equality', 'Length equality'], correctAnswer: 1, explanation: 'toEqual performs deep equality checking on objects and arrays.' },
      { id: 'tq5', question: 'What is the purpose of beforeEach() in Jest?', options: ['Runs after all tests', 'Runs setup code before each test', 'Creates mock modules', 'Imports test fixtures'], correctAnswer: 1, explanation: 'beforeEach runs a setup function before every test in the describe block.' },
      { id: 'tq6', question: 'What is an integration test?', options: ['Tests single functions', 'Tests how multiple units work together', 'Tests UIs only', 'Performance benchmark'], correctAnswer: 1, explanation: 'Integration tests verify that multiple components/layers work correctly together.' },
      { id: 'tq7', question: 'What does screen.getByText() do in RTL?', options: ['Queries DOM by test ID', 'Finds an element by its text content', 'Mocks user clicks', 'Waits for async updates'], correctAnswer: 1, explanation: 'getByText finds a DOM element that contains the specified text.' },
      { id: 'tq8', question: 'What is a snapshot test?', options: ['Takes a screenshot', 'Serializes a component output and compares future renders to it', 'Tests API responses', 'Validates CSS'], correctAnswer: 1, explanation: 'Snapshot tests detect unintended UI changes by comparing rendered output.' },
      { id: 'tq9', question: 'What does fireEvent.click() do in RTL?', options: ['Opens browser', 'Simulates a click on a DOM element', 'Asserts event handlers', 'Mocks window.click'], correctAnswer: 1, explanation: 'fireEvent.click() dispatches a click event on the specified element.' },
      { id: 'tq10', question: 'What is a spy in Jest?', options: ['A test runner', 'A function that records calls without altering behavior', 'An assertion matcher', 'A code analyzer'], correctAnswer: 1, explanation: 'Spies (jest.spyOn) track calls to a function while preserving its implementation.' },
    ]
  },
  {
    id: 'mern_fullstack_project', title: 'Full Stack MERN Capstone Project',
    description: 'Build a production-ready app with auth, CRUD, deployment pipeline.',
    difficulty: 'advanced', baseDays: 12, prerequisites: ['mern_mongo_auth', 'mern_react_core'],
    skillsCovered: ['fullstack', 'deployment', 'project'],
    tags: ['fullstack', 'project', 'capstone'],
    careerGoalScores: { 'full stack developer': 10, 'mern developer': 10, 'frontend developer': 6, 'backend developer': 6 },
    tasks: [
      { id: 'mern_cap_t1', title: 'Design system architecture and create ERD for your full stack app', completed: false, difficulty: 'advanced', learningResources: [{ title: 'System Design Basics', url: 'https://github.com/donnemartin/system-design-primer', type: 'article' }] },
      { id: 'mern_cap_t2', title: 'Deploy backend to Render and frontend to Vercel with CI/CD', completed: false, difficulty: 'advanced', learningResources: [{ title: 'Render Docs', url: 'https://render.com/docs', type: 'docs' }] },
    ],
    quizzes: [
      { id: 'capq1', question: 'What is a monorepo?', options: ['Single database', 'Multiple projects in one repository', 'Microservice pattern', 'Single-page app'], correctAnswer: 1, explanation: 'A monorepo hosts multiple related projects in a single version-controlled repo.' },
      { id: 'capq2', question: 'What does CI/CD stand for?', options: ['Code Integration/Code Deployment', 'Continuous Integration/Continuous Deployment', 'Client Interface/Component Delivery', 'Code Inspection/Code Delivery'], correctAnswer: 1, explanation: 'CI/CD automates building, testing, and deploying code changes.' },
      { id: 'capq3', question: 'What is an environment variable?', options: ['A CSS variable', 'A runtime configuration value stored outside source code', 'A JavaScript global', 'A Docker command'], correctAnswer: 1, explanation: 'Env vars store sensitive config (API keys, DB URIs) outside the codebase.' },
      { id: 'capq4', question: 'What is a reverse proxy?', options: ['A database proxy', 'A server that forwards client requests to backend servers', 'A CDN node', 'An API gateway only'], correctAnswer: 1, explanation: 'Reverse proxies (like Nginx) handle SSL, load balancing, and routing.' },
      { id: 'capq5', question: 'What does HTTPS provide over HTTP?', options: ['Faster speeds', 'TLS encrypted data transmission', 'Better caching', 'REST compliance'], correctAnswer: 1, explanation: 'HTTPS encrypts data in transit, preventing interception and tampering.' },
      { id: 'capq6', question: 'What is a load balancer?', options: ['Database optimizer', 'Distributes incoming traffic across multiple server instances', 'Memory manager', 'API rate limiter'], correctAnswer: 1, explanation: 'Load balancers distribute requests to prevent any single server from being overwhelmed.' },
      { id: 'capq7', question: 'What is Docker used for?', options: ['Database hosting', 'Containerizing applications for consistent environments', 'Frontend bundling', 'Testing automation'], correctAnswer: 1, explanation: 'Docker packages apps with their dependencies into portable containers.' },
      { id: 'capq8', question: 'What is a CDN?', options: ['Code Dependency Network', 'Geographically distributed servers delivering content faster to users', 'Central Database Node', 'Continuous Deployment Network'], correctAnswer: 1, explanation: 'CDNs cache assets close to users to reduce latency.' },
      { id: 'capq9', question: 'What is horizontal scaling?', options: ['Making a server more powerful', 'Adding more server instances to distribute load', 'Increasing database storage', 'Compressing code'], correctAnswer: 1, explanation: 'Horizontal scaling adds more machines rather than upgrading existing ones.' },
      { id: 'capq10', question: 'What does a health check endpoint typically return?', options: ['User data', 'Server status and uptime metrics', 'API documentation', 'Auth tokens'], correctAnswer: 1, explanation: 'Health checks report server readiness for load balancers and monitoring.' },
    ]
  },
];

// ─── DSA POOL ─────────────────────────────────────────────────────────────────
const DSA_POOL = [
  {
    id: 'dsa_complexity', title: 'Time & Space Complexity (Big-O)',
    description: 'Analyze algorithm efficiency, Big-O notation, best/worst/average cases.',
    difficulty: 'beginner', baseDays: 4, prerequisites: [],
    skillsCovered: ['big-o', 'complexity', 'analysis'],
    tags: ['algorithms', 'theory', 'interview'],
    careerGoalScores: { 'placement preparation': 10, 'competitive programmer': 10, 'full stack developer': 5, 'backend developer': 6 },
    tasks: [
      { id: 'dsa_co_t1', title: 'Analyze time complexity of 10 standard code snippets and document findings', completed: false, difficulty: 'beginner', learningResources: [{ title: 'Big-O Cheat Sheet', url: 'https://www.bigocheatsheet.com', type: 'article' }] },
    ],
    quizzes: [
      { id: 'biq1', question: 'What is the time complexity of binary search?', options: ['O(N)', 'O(log N)', 'O(1)', 'O(N²)'], correctAnswer: 1, explanation: 'Binary search halves the search space each step.' },
      { id: 'biq2', question: 'What is the time complexity of linear search?', options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'], correctAnswer: 2, explanation: 'In the worst case, linear search checks all N elements.' },
      { id: 'biq3', question: 'Which sorting algorithm has O(N log N) average case?', options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort'], correctAnswer: 2, explanation: 'Merge Sort divides and merges in O(N log N) guaranteed.' },
      { id: 'biq4', question: 'What does O(1) mean?', options: ['Linear time', 'Constant time regardless of input size', 'Quadratic time', 'Logarithmic time'], correctAnswer: 1, explanation: 'O(1) means the operation takes the same time regardless of N.' },
      { id: 'biq5', question: 'What is space complexity?', options: ['Disk storage used', 'Memory used relative to input size', 'Network bandwidth', 'Code file size'], correctAnswer: 1, explanation: 'Space complexity measures auxiliary memory an algorithm needs.' },
      { id: 'biq6', question: 'What is the time complexity of accessing an array element by index?', options: ['O(N)', 'O(log N)', 'O(1)', 'O(N²)'], correctAnswer: 2, explanation: 'Array index access uses pointer arithmetic, taking constant time.' },
      { id: 'biq7', question: 'Bubble Sort has which worst-case time complexity?', options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(log N)'], correctAnswer: 2, explanation: 'Bubble sort compares each pair of adjacent elements — O(N²) comparisons.' },
      { id: 'biq8', question: 'What is amortized analysis?', options: ['Worst-case per operation', 'Average cost per operation over a sequence of operations', 'Best-case analysis', 'Space analysis'], correctAnswer: 1, explanation: 'Amortized analysis averages cost across many operations for a tighter bound.' },
      { id: 'biq9', question: 'Which data structure provides O(1) average lookup?', options: ['Array', 'Linked List', 'Hash Table', 'Binary Tree'], correctAnswer: 2, explanation: 'Hash tables use hashing to achieve O(1) average lookup.' },
      { id: 'biq10', question: 'What is the space complexity of a recursive DFS on a graph with N nodes?', options: ['O(1)', 'O(N)', 'O(N²)', 'O(log N)'], correctAnswer: 1, explanation: 'Recursive DFS uses call stack proportional to the depth, up to O(N).' },
    ]
  },
  {
    id: 'dsa_arrays_strings', title: 'Arrays, Strings & Two Pointers',
    description: 'Sliding window, two pointers, prefix sums, string manipulation.',
    difficulty: 'beginner', baseDays: 6, prerequisites: ['dsa_complexity'],
    skillsCovered: ['arrays', 'strings', 'two-pointer', 'sliding-window'],
    tags: ['interview', 'algorithms', 'patterns'],
    careerGoalScores: { 'placement preparation': 10, 'competitive programmer': 10, 'full stack developer': 4, 'backend developer': 5 },
    tasks: [
      { id: 'dsa_arr_t1', title: 'Solve 5 sliding window problems (max subarray, longest substring)', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'LeetCode Sliding Window', url: 'https://leetcode.com/tag/sliding-window/', type: 'practice' }] },
    ],
    quizzes: [
      { id: 'aq1', question: 'Two Sum problem optimal solution uses which data structure?', options: ['Stack', 'Queue', 'Hash Map', 'Binary Tree'], correctAnswer: 2, explanation: 'A hash map stores complements for O(N) lookup.' },
      { id: 'aq2', question: 'What is a sliding window technique?', options: ['Sorting arrays in windows', 'Moving a fixed-size range over data to compute results efficiently', 'Graph traversal', 'Recursive splitting'], correctAnswer: 1, explanation: 'Sliding window avoids recomputation by adjusting window boundaries.' },
      { id: 'aq3', question: 'What is a prefix sum array?', options: ['Reversed array', 'Array where each element is sum of all previous elements', 'Sorted array', 'Difference array'], correctAnswer: 1, explanation: 'Prefix sums enable O(1) range sum queries after O(N) preprocessing.' },
      { id: 'aq4', question: 'Which approach finds duplicates in an array in O(N) time and O(1) space?', options: ['Sorting', 'Hash Set', 'Floyd\'s cycle detection', 'Nested loops'], correctAnswer: 2, explanation: 'Floyd\'s algorithm detects cycles (duplicates) in O(N) time with O(1) space.' },
      { id: 'aq5', question: 'What is the two-pointer technique best for?', options: ['Tree traversal', 'Sorted array pair problems', 'Hash table operations', 'Dynamic programming'], correctAnswer: 1, explanation: 'Two pointers work efficiently on sorted arrays for pair/triplet problems.' },
      { id: 'aq6', question: 'Reversing a string in-place has which complexity?', options: ['O(N²)', 'O(N)', 'O(log N)', 'O(1)'], correctAnswer: 1, explanation: 'Swapping characters linearly takes O(N) with O(1) extra space.' },
      { id: 'aq7', question: 'What is Kadane\'s algorithm used for?', options: ['Shortest path', 'Maximum subarray sum in O(N)', 'String matching', 'Sorting'], correctAnswer: 1, explanation: 'Kadane\'s algorithm finds the maximum contiguous subarray sum efficiently.' },
      { id: 'aq8', question: 'How do you check if a string is a palindrome optimally?', options: ['Reverse and compare O(N)', 'Two pointers from ends O(N)', 'Hash all chars O(N)', 'Sort and compare O(N log N)'], correctAnswer: 1, explanation: 'Two pointers from both ends check characters in a single O(N) pass.' },
      { id: 'aq9', question: 'What is a subarray?', options: ['Non-contiguous elements', 'Contiguous portion of an array', 'Sorted subset', 'Reversed array'], correctAnswer: 1, explanation: 'A subarray is a contiguous slice of an array.' },
      { id: 'aq10', question: 'Dutch National Flag algorithm sorts an array with how many distinct values?', options: ['2', '3', '4', 'Any'], correctAnswer: 1, explanation: 'Dutch National Flag partitions an array with 3 distinct values in O(N).' },
    ]
  },
  {
    id: 'dsa_linked_lists', title: 'Linked Lists — Singly & Doubly',
    description: 'Node operations, reversal, cycle detection, merge, Floyd\'s algorithm.',
    difficulty: 'beginner', baseDays: 5, prerequisites: ['dsa_complexity'],
    skillsCovered: ['linked-list', 'pointers', 'data-structures'],
    tags: ['interview', 'data-structures'],
    careerGoalScores: { 'placement preparation': 10, 'competitive programmer': 8, 'backend developer': 5 },
    tasks: [
      { id: 'dsa_ll_t1', title: 'Implement LinkedList class with insert, delete, reverse, and cycle detect', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'GeeksforGeeks LL', url: 'https://www.geeksforgeeks.org/data-structures/linked-list/', type: 'tutorial' }] },
    ],
    quizzes: [
      { id: 'llq1', question: 'How to detect a cycle in a linked list optimally?', options: ['Hash set O(N) space', 'Floyd\'s cycle (slow/fast pointers) O(1) space', 'Sort nodes', 'Compare all pairs'], correctAnswer: 1, explanation: 'Floyd\'s uses slow+fast pointers meeting inside cycle.' },
      { id: 'llq2', question: 'Inserting at the head of a singly linked list is?', options: ['O(N)', 'O(log N)', 'O(1)', 'O(N²)'], correctAnswer: 2, explanation: 'Head insertion just redirects the head pointer — constant time.' },
      { id: 'llq3', question: 'What is a doubly linked list?', options: ['Two separate lists', 'Nodes with both next and prev pointers', 'Circular list', 'Binary tree'], correctAnswer: 1, explanation: 'Doubly linked list nodes have pointers to both next and previous nodes.' },
      { id: 'llq4', question: 'How to find the middle of a linked list efficiently?', options: ['Count then traverse', 'Slow/fast pointer — slow reaches middle when fast reaches end', 'Sort then find median', 'Stack approach'], correctAnswer: 1, explanation: 'Fast pointer moves 2x; when fast reaches end, slow is at middle.' },
      { id: 'llq5', question: 'Deleting a node by value in a singly linked list requires?', options: ['O(1)', 'O(N) traversal to find node', 'O(log N)', 'O(N²)'], correctAnswer: 1, explanation: 'You must traverse the list to find the target node.' },
      { id: 'llq6', question: 'How to reverse a singly linked list in-place?', options: ['Create new list', '3 pointers (prev, curr, next) iteratively', 'Stack-based reversal', 'Recursive only'], correctAnswer: 1, explanation: '3-pointer iterative reversal runs in O(N) time with O(1) space.' },
      { id: 'llq7', question: 'What is the main disadvantage of linked lists vs arrays?', options: ['No insertion at head', 'No O(1) random access by index', 'Cannot store integers', 'Fixed size'], correctAnswer: 1, explanation: 'Linked lists require O(N) traversal to access index N.' },
      { id: 'llq8', question: 'Merging two sorted linked lists has which complexity?', options: ['O(N²)', 'O(N + M)', 'O(log N)', 'O(N log N)'], correctAnswer: 1, explanation: 'Merge scans both lists linearly — O(N+M) where N and M are lengths.' },
      { id: 'llq9', question: 'What is a sentinel/dummy node in linked list operations?', options: ['The last node', 'A placeholder node simplifying edge case handling', 'The head node', 'A cycle marker'], correctAnswer: 1, explanation: 'Dummy nodes eliminate special cases for empty list or head deletion.' },
      { id: 'llq10', question: 'How do you find the Nth node from the end of a linked list?', options: ['Count length then traverse', 'Two pointers N apart', 'Sort descending', 'Stack all nodes'], correctAnswer: 1, explanation: 'Place pointer 1 at head+N, pointer 2 at head; when pointer 1 reaches end, pointer 2 is at Nth from end.' },
    ]
  },
  {
    id: 'dsa_trees', title: 'Binary Trees & BST',
    description: 'Tree traversals, BST operations, height, diameter, LCA, balanced trees.',
    difficulty: 'intermediate', baseDays: 7, prerequisites: ['dsa_linked_lists'],
    skillsCovered: ['trees', 'bst', 'recursion', 'traversal'],
    tags: ['interview', 'data-structures', 'recursion'],
    careerGoalScores: { 'placement preparation': 10, 'competitive programmer': 10, 'backend developer': 5 },
    tasks: [
      { id: 'dsa_tr_t1', title: 'Implement BFS, DFS (pre/in/post-order) traversals iteratively and recursively', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'Visualgo Trees', url: 'https://visualgo.net/en/bst', type: 'interactive' }] },
    ],
    quizzes: [
      { id: 'trq1', question: 'In-order traversal of a BST gives nodes in?', options: ['Random order', 'Ascending sorted order', 'Descending order', 'Level order'], correctAnswer: 1, explanation: 'BST in-order (left, root, right) yields sorted ascending sequence.' },
      { id: 'trq2', question: 'What is the height of a tree with 1 node?', options: ['-1', '0', '1', '2'], correctAnswer: 1, explanation: 'A single node tree has height 0 (0 edges from root to leaf).' },
      { id: 'trq3', question: 'What is a balanced binary tree?', options: ['All leaves at same level', 'Height difference of subtrees ≤ 1 at every node', 'Complete binary tree only', 'Full binary tree'], correctAnswer: 1, explanation: 'A balanced tree has subtree heights differing by at most 1 at every node.' },
      { id: 'trq4', question: 'BFS traversal uses which data structure?', options: ['Stack', 'Queue', 'Heap', 'Hash Map'], correctAnswer: 1, explanation: 'BFS uses a queue to process nodes level by level.' },
      { id: 'trq5', question: 'What is the LCA (Lowest Common Ancestor)?', options: ['Root of tree', 'Deepest node that is ancestor of both given nodes', 'Leftmost leaf', 'Parent of both nodes'], correctAnswer: 1, explanation: 'LCA is the deepest node that has both target nodes as descendants.' },
      { id: 'trq6', question: 'BST search has what average time complexity?', options: ['O(N)', 'O(N²)', 'O(log N)', 'O(1)'], correctAnswer: 2, explanation: 'BST search eliminates half the tree at each step — O(log N) average.' },
      { id: 'trq7', question: 'What is a perfect binary tree?', options: ['All nodes have 2 children, all leaves at same level', 'Has maximum nodes at every level except last', 'Height equals number of nodes', 'Random structure'], correctAnswer: 0, explanation: 'A perfect tree has all internal nodes with 2 children and all leaves at same depth.' },
      { id: 'trq8', question: 'What algorithm finds the diameter (longest path) of a binary tree?', options: ['Simple DFS height', 'DFS returning height and updating global diameter at each node', 'BFS level count', 'Topological sort'], correctAnswer: 1, explanation: 'Diameter = max of (left height + right height + 2) across all nodes.' },
      { id: 'trq9', question: 'Post-order traversal visits nodes in which order?', options: ['Root, Left, Right', 'Left, Root, Right', 'Left, Right, Root', 'Right, Root, Left'], correctAnswer: 2, explanation: 'Post-order visits left subtree, right subtree, then the root.' },
      { id: 'trq10', question: 'What makes a BST invalid?', options: ['Having duplicate values', 'A node whose value is not greater than ALL nodes in its left subtree', 'Unbalanced structure', 'Missing leaves'], correctAnswer: 1, explanation: 'BST property requires left subtree values < root < right subtree values for ALL descendants.' },
    ]
  },
  {
    id: 'dsa_graphs', title: 'Graphs — BFS, DFS, Shortest Path',
    description: 'Graph representations, BFS, DFS, Dijkstra, topological sort, union-find.',
    difficulty: 'intermediate', baseDays: 8, prerequisites: ['dsa_trees'],
    skillsCovered: ['graphs', 'bfs', 'dfs', 'shortest-path'],
    tags: ['interview', 'algorithms', 'competitive'],
    careerGoalScores: { 'placement preparation': 10, 'competitive programmer': 10, 'backend developer': 4 },
    tasks: [
      { id: 'dsa_gr_t1', title: 'Implement BFS and DFS for graph, detect cycles, and find connected components', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'Graph Algorithms', url: 'https://cp-algorithms.com/graph/bfs.html', type: 'article' }] },
    ],
    quizzes: [
      { id: 'gq1', question: 'Which algorithm finds the shortest path in an unweighted graph?', options: ['DFS', 'Dijkstra', 'BFS', 'Bellman-Ford'], correctAnswer: 2, explanation: 'BFS explores level by level, guaranteeing shortest path in unweighted graphs.' },
      { id: 'gq2', question: 'What is an adjacency list representation?', options: ['2D matrix', 'Array of lists where index i stores neighbors of vertex i', 'Edge weight matrix', 'Degree array'], correctAnswer: 1, explanation: 'Adjacency lists are memory-efficient for sparse graphs.' },
      { id: 'gq3', question: 'Dijkstra\'s algorithm fails with?', options: ['Dense graphs', 'Disconnected graphs', 'Negative weight edges', 'Directed graphs'], correctAnswer: 2, explanation: 'Dijkstra\'s greedy assumption breaks with negative weights.' },
      { id: 'gq4', question: 'What is topological sort used for?', options: ['Cycle detection only', 'Ordering tasks with dependencies in a DAG', 'Finding shortest path', 'Minimum spanning tree'], correctAnswer: 1, explanation: 'Topological sort linearizes a DAG respecting dependency order.' },
      { id: 'gq5', question: 'Union-Find data structure is used for?', options: ['Shortest paths', 'Detecting connected components and cycles', 'BFS ordering', 'Tree height'], correctAnswer: 1, explanation: 'Union-Find efficiently merges sets and checks connectivity.' },
      { id: 'gq6', question: 'What is a directed acyclic graph (DAG)?', options: ['Graph with no edges', 'Directed graph with no cycles', 'Undirected graph', 'Complete graph'], correctAnswer: 1, explanation: 'DAGs have directed edges but no way to return to a starting node.' },
      { id: 'gq7', question: 'What is the time complexity of Dijkstra with a priority queue?', options: ['O(V²)', 'O(E log V)', 'O(VE)', 'O(V + E)'], correctAnswer: 1, explanation: 'Dijkstra with a min-heap runs in O((V + E) log V).' },
      { id: 'gq8', question: 'What is a bipartite graph?', options: ['Graph with 2 vertices', 'Graph whose vertices can be split into 2 sets with edges only between sets', 'Complete graph', 'Planar graph'], correctAnswer: 1, explanation: 'Bipartite graphs can be 2-colored — BFS detects this property.' },
      { id: 'gq9', question: 'DFS uses which data structure internally (or implicitly)?', options: ['Queue', 'Heap', 'Stack (call stack)', 'Hash Map'], correctAnswer: 2, explanation: 'DFS uses a stack — either explicit or through recursion call stack.' },
      { id: 'gq10', question: 'What is Bellman-Ford algorithm used for?', options: ['Minimum spanning tree', 'Shortest path with negative weight edges', 'Topological sort', 'Cycle detection in undirected graphs'], correctAnswer: 1, explanation: 'Bellman-Ford handles negative weights and detects negative cycles.' },
    ]
  },
  {
    id: 'dsa_dp', title: 'Dynamic Programming',
    description: 'Memoization, tabulation, 0/1 knapsack, LCS, LIS, coin change patterns.',
    difficulty: 'advanced', baseDays: 10, prerequisites: ['dsa_trees'],
    skillsCovered: ['dp', 'memoization', 'optimization'],
    tags: ['interview', 'algorithms', 'competitive'],
    careerGoalScores: { 'placement preparation': 10, 'competitive programmer': 10, 'backend developer': 4 },
    tasks: [
      { id: 'dsa_dp_t1', title: 'Solve 0/1 Knapsack, Coin Change, LCS, and LIS with both memoization and tabulation', completed: false, difficulty: 'advanced', learningResources: [{ title: 'DP Patterns', url: 'https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns', type: 'article' }] },
    ],
    quizzes: [
      { id: 'dpq1', question: 'What is overlapping subproblems property?', options: ['No repeated work', 'Same subproblems are solved multiple times in naive recursion', 'All subproblems are independent', 'Linear subproblem structure'], correctAnswer: 1, explanation: 'DP applies when the same subproblems appear repeatedly in recursive solutions.' },
      { id: 'dpq2', question: 'What is memoization?', options: ['Tabular bottom-up DP', 'Top-down DP caching recursive results', 'Greedy optimization', 'Space optimization technique'], correctAnswer: 1, explanation: 'Memoization stores results of expensive recursive calls to avoid recomputation.' },
      { id: 'dpq3', question: 'Coin Change problem finds?', options: ['Maximum coins', 'Minimum coins to make a target amount', 'All coin combinations', 'Largest coin denomination'], correctAnswer: 1, explanation: 'Classic DP: dp[i] = min coins to make amount i.' },
      { id: 'dpq4', question: 'LCS stands for?', options: ['Longest Common Substring', 'Longest Common Subsequence', 'Longest Consecutive Sequence', 'Least Common Set'], correctAnswer: 1, explanation: 'LCS finds the longest subsequence present in both strings.' },
      { id: 'dpq5', question: 'What is the optimal substructure property?', options: ['Subproblems overlap', 'Optimal solution to problem contains optimal solutions to subproblems', 'No recursion needed', 'All states are independent'], correctAnswer: 1, explanation: 'If a problem\'s optimal solution includes optimal solutions to its subproblems, DP applies.' },
      { id: 'dpq6', question: 'What is the time complexity of the 0/1 Knapsack DP solution?', options: ['O(N)', 'O(N × W)', 'O(2^N)', 'O(N log N)'], correctAnswer: 1, explanation: 'Knapsack fills an N×W table — O(N×W) where N is items and W is capacity.' },
      { id: 'dpq7', question: 'What is the difference between 0/1 Knapsack and Unbounded Knapsack?', options: ['Weight limit difference', '0/1 uses each item once; Unbounded allows unlimited use of each item', 'Value type difference', 'Same algorithm'], correctAnswer: 1, explanation: 'Unbounded Knapsack allows reusing items; 0/1 selects each item at most once.' },
      { id: 'dpq8', question: 'What characterizes a greedy algorithm vs DP?', options: ['Greedy considers all subproblems; DP takes the first best choice', 'Greedy makes locally optimal choices; DP considers all possibilities', 'No difference', 'DP is always faster'], correctAnswer: 1, explanation: 'Greedy is faster but only works when local optimal choices lead to global optimum.' },
      { id: 'dpq9', question: 'Fibonacci with memoization has which time complexity?', options: ['O(2^N)', 'O(N)', 'O(N²)', 'O(log N)'], correctAnswer: 1, explanation: 'Memoization computes each Fibonacci number only once — O(N).' },
      { id: 'dpq10', question: 'What is the LIS problem?', options: ['Longest Integer Set', 'Longest Increasing Subsequence in an array', 'Least Integer Subset', 'Linear Index Search'], correctAnswer: 1, explanation: 'LIS finds the longest subsequence where each element is larger than the previous.' },
    ]
  },
];

// ─── CYBERSECURITY POOL ───────────────────────────────────────────────────────
const CYBER_POOL = [
  {
    id: 'cyber_networking', title: 'Networking Fundamentals & Protocols',
    description: 'TCP/IP stack, DNS, HTTP/S, OSI model, packet analysis with Wireshark.',
    difficulty: 'beginner', baseDays: 6, prerequisites: [],
    skillsCovered: ['networking', 'tcp-ip', 'dns', 'protocols'],
    tags: ['security', 'network', 'fundamentals'],
    careerGoalScores: { 'cybersecurity analyst': 10, 'backend developer': 4, 'devops engineer': 6 },
    tasks: [
      { id: 'cyber_net_t1', title: 'Analyze HTTP, DNS, and TCP packets using Wireshark on sample captures', completed: false, difficulty: 'beginner', learningResources: [{ title: 'Wireshark Docs', url: 'https://www.wireshark.org/docs/', type: 'docs' }] },
    ],
    quizzes: [
      { id: 'cyq1', question: 'Which TCP flag initiates the three-way handshake?', options: ['ACK', 'FIN', 'SYN', 'RST'], correctAnswer: 2, explanation: 'SYN (Synchronize) starts the TCP connection process.' },
      { id: 'cyq2', question: 'What is DNS?', options: ['Data Network Security', 'Domain Name System — maps domain names to IP addresses', 'Dynamic Node Service', 'Distributed Name Server'], correctAnswer: 1, explanation: 'DNS translates human-readable domain names to machine-readable IP addresses.' },
      { id: 'cyq3', question: 'Which OSI layer does HTTPS operate on?', options: ['Layer 3 — Network', 'Layer 4 — Transport', 'Layer 7 — Application', 'Layer 6 — Presentation'], correctAnswer: 2, explanation: 'HTTPS is an application-layer protocol built on TLS.' },
      { id: 'cyq4', question: 'What is ARP used for?', options: ['Resolving IPs to domain names', 'Mapping IP addresses to MAC addresses on a LAN', 'Routing between networks', 'Encrypting packets'], correctAnswer: 1, explanation: 'ARP resolves a known IP address to its physical MAC address.' },
      { id: 'cyq5', question: 'What port does HTTPS use by default?', options: ['80', '8080', '443', '22'], correctAnswer: 2, explanation: 'HTTPS operates on port 443.' },
      { id: 'cyq6', question: 'What is a subnet mask?', options: ['Network speed limit', 'Determines which portion of an IP is network vs host', 'Firewall rule', 'Routing table entry'], correctAnswer: 1, explanation: 'Subnet masks separate the network and host portions of an IP address.' },
      { id: 'cyq7', question: 'What is a firewall?', options: ['Antivirus software', 'Network security system filtering traffic by rules', 'Encryption algorithm', 'VPN endpoint'], correctAnswer: 1, explanation: 'Firewalls monitor and control incoming/outgoing traffic based on security rules.' },
      { id: 'cyq8', question: 'UDP differs from TCP by?', options: ['Using IP headers', 'Being connectionless with no delivery guarantee', 'Operating on port 443', 'Using 3-way handshake'], correctAnswer: 1, explanation: 'UDP sends datagrams without establishing connections or guaranteeing delivery.' },
      { id: 'cyq9', question: 'What is a packet sniffer?', options: ['Network optimizer', 'Tool capturing and analyzing network traffic packets', 'Malware type', 'DNS resolver'], correctAnswer: 1, explanation: 'Packet sniffers (like Wireshark) capture raw network packets for analysis.' },
      { id: 'cyq10', question: 'What does NAT do?', options: ['Encrypts data', 'Translates private IP addresses to public IP addresses', 'Routes between VLANs', 'Assigns MAC addresses'], correctAnswer: 1, explanation: 'NAT allows multiple devices to share a single public IP address.' },
    ]
  },
  {
    id: 'cyber_owasp', title: 'OWASP Top 10 & Web Application Security',
    description: 'XSS, SQL injection, CSRF, IDOR, insecure deserialization, and mitigations.',
    difficulty: 'intermediate', baseDays: 8, prerequisites: ['cyber_networking'],
    skillsCovered: ['owasp', 'xss', 'sql-injection', 'csrf'],
    tags: ['security', 'web', 'pentesting'],
    careerGoalScores: { 'cybersecurity analyst': 10, 'full stack developer': 6, 'backend developer': 7 },
    tasks: [
      { id: 'cyber_ow_t1', title: 'Exploit and mitigate XSS, SQLi, and CSRF on DVWA (Damn Vulnerable Web App)', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', type: 'article' }] },
    ],
    quizzes: [
      { id: 'owq1', question: 'XSS stands for?', options: ['Extra Style Sheets', 'Cross-Site Scripting', 'Cross-Server Sync', 'Extended Security Standard'], correctAnswer: 1, explanation: 'XSS allows attackers to inject malicious scripts into web pages.' },
      { id: 'owq2', question: 'Which input handling prevents SQL Injection?', options: ['Client-side validation', 'Parameterized queries / prepared statements', 'URL encoding', 'HTTPS'], correctAnswer: 1, explanation: 'Parameterized queries prevent user input from being interpreted as SQL.' },
      { id: 'owq3', question: 'What is CSRF?', options: ['Code Security Review Form', 'Attack forcing users to execute unwanted actions using their active session', 'Cookie Security Reference Format', 'Cross-Server Request File'], correctAnswer: 1, explanation: 'CSRF exploits browser automatic cookie sending to forge authenticated requests.' },
      { id: 'owq4', question: 'What is IDOR?', options: ['Indirect Data Object Routing', 'Insecure Direct Object Reference — accessing others\' data by modifying IDs', 'Internal Data Operation Restriction', 'Input Data Output Routing'], correctAnswer: 1, explanation: 'IDOR occurs when apps expose internal objects without authorization checks.' },
      { id: 'owq5', question: 'Which HTTP header mitigates XSS?', options: ['X-Frame-Options', 'Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options'], correctAnswer: 1, explanation: 'CSP defines allowed script sources, blocking injected malicious scripts.' },
      { id: 'owq6', question: 'What is security misconfiguration?', options: ['Wrong CSS', 'Insecure default settings, open cloud storage, debug mode in production', 'SQL injection', 'Broken session'], correctAnswer: 1, explanation: 'Security misconfiguration is the most commonly found OWASP issue.' },
      { id: 'owq7', question: 'What prevents CSRF attacks?', options: ['HTTPS', 'Unpredictable CSRF tokens in forms', 'Input sanitization', 'Password hashing'], correctAnswer: 1, explanation: 'CSRF tokens ensure only your own forms can submit requests to your server.' },
      { id: 'owq8', question: 'What is stored XSS?', options: ['XSS in URL parameters', 'Malicious script permanently stored in database and served to all users', 'XSS via cookies', 'DOM-based injection'], correctAnswer: 1, explanation: 'Stored XSS persists in the database and executes for every user loading the page.' },
      { id: 'owq9', question: 'What does HTTPS protect against but NOT from XSS?', options: ['Injection attacks', 'Man-in-the-middle interception of data in transit', 'Input validation failures', 'Session fixation'], correctAnswer: 1, explanation: 'HTTPS encrypts transit only; it cannot prevent injected scripts already on the page.' },
      { id: 'owq10', question: 'What is the principle of least privilege?', options: ['Use complex passwords', 'Grant users only the minimum access required for their role', 'Encrypt all data', 'Use MFA everywhere'], correctAnswer: 1, explanation: 'Least privilege reduces the attack surface by limiting unnecessary permissions.' },
    ]
  },
];

// ─── AI/ML POOL ───────────────────────────────────────────────────────────────
const AIML_POOL = [
  {
    id: 'aiml_python_ds', title: 'Python for Data Science (NumPy & Pandas)',
    description: 'Vectorized computing, DataFrame operations, data cleaning, EDA.',
    difficulty: 'beginner', baseDays: 7, prerequisites: [],
    skillsCovered: ['python', 'numpy', 'pandas', 'eda'],
    tags: ['data', 'python', 'ml', 'analytics'],
    careerGoalScores: { 'data scientist': 10, 'machine learning engineer': 10, 'ai engineer': 9, 'data analyst': 8 },
    tasks: [
      { id: 'aiml_py_t1', title: 'Perform full EDA on a Kaggle dataset using Pandas and Matplotlib', completed: false, difficulty: 'beginner', learningResources: [{ title: 'Kaggle Pandas Course', url: 'https://www.kaggle.com/learn/pandas', type: 'tutorial' }] },
    ],
    quizzes: [
      { id: 'pyq1', question: 'What does pd.read_csv() return?', options: ['JSON object', 'Pandas DataFrame', 'NumPy array', 'Dictionary'], correctAnswer: 1, explanation: 'pd.read_csv() loads a CSV file into a Pandas DataFrame.' },
      { id: 'pyq2', question: 'What does df.dropna() do?', options: ['Fills missing values', 'Removes rows with missing values', 'Replaces NaN with 0', 'Creates copy'], correctAnswer: 1, explanation: 'dropna() removes rows (or columns) containing NaN values.' },
      { id: 'pyq3', question: 'What is the main advantage of NumPy over Python lists?', options: ['Dynamic typing', 'Vectorized C-speed operations on fixed-type contiguous memory', 'Built-in sorting', 'Thread safety'], correctAnswer: 1, explanation: 'NumPy operations run in compiled C, far faster than Python loops.' },
      { id: 'pyq4', question: 'What does df.groupby("col").mean() do?', options: ['Sorts by column', 'Groups rows by column value and computes mean per group', 'Filters rows', 'Merges DataFrames'], correctAnswer: 1, explanation: 'groupby().mean() computes the mean of each numeric column for each group.' },
      { id: 'pyq5', question: 'What does .iloc[] do in Pandas?', options: ['Label-based indexing', 'Integer-position based indexing', 'Boolean masking', 'SQL query'], correctAnswer: 1, explanation: '.iloc[] selects rows/columns by integer position.' },
      { id: 'pyq6', question: 'What is standard deviation?', options: ['Average of all values', 'Measure of dispersion around the mean', 'Maximum value', 'Range'], correctAnswer: 1, explanation: 'Standard deviation quantifies how spread out values are from the mean.' },
      { id: 'pyq7', question: 'What does np.reshape() do?', options: ['Sorts array', 'Changes array shape without changing data', 'Transposes matrix', 'Flattens array'], correctAnswer: 1, explanation: 'reshape() returns a view with a new shape, data unchanged.' },
      { id: 'pyq8', question: 'What is a correlation coefficient?', options: ['Difference between variables', 'Statistical measure of linear relationship between two variables (-1 to 1)', 'Regression coefficient', 'P-value'], correctAnswer: 1, explanation: 'Correlation coefficient measures the strength and direction of linear relationship.' },
      { id: 'pyq9', question: 'What does df.merge() do?', options: ['Concatenates DataFrames', 'Joins two DataFrames on a common key column', 'Stacks DataFrames vertically', 'Pivots data'], correctAnswer: 1, explanation: 'merge() performs SQL-style joins between DataFrames.' },
      { id: 'pyq10', question: 'What is one-hot encoding used for?', options: ['Scaling numeric features', 'Converting categorical variables into binary columns', 'Normalizing distributions', 'Feature selection'], correctAnswer: 1, explanation: 'One-hot encoding creates binary columns for each category value.' },
    ]
  },
  {
    id: 'aiml_ml_core', title: 'Machine Learning Fundamentals',
    description: 'Supervised/unsupervised learning, regression, classification, model evaluation.',
    difficulty: 'intermediate', baseDays: 10, prerequisites: ['aiml_python_ds'],
    skillsCovered: ['ml', 'sklearn', 'regression', 'classification'],
    tags: ['ml', 'ai', 'data'],
    careerGoalScores: { 'data scientist': 10, 'machine learning engineer': 10, 'ai engineer': 9, 'data analyst': 5 },
    tasks: [
      { id: 'aiml_ml_t1', title: 'Train, evaluate, and tune a classification model using scikit-learn pipeline', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'Scikit-Learn Docs', url: 'https://scikit-learn.org/stable/', type: 'docs' }] },
    ],
    quizzes: [
      { id: 'mlq1', question: 'What is overfitting?', options: ['High bias, low variance', 'Model performs well on training data but poorly on unseen data', 'Underfitting problem', 'Low training accuracy'], correctAnswer: 1, explanation: 'Overfitting means the model memorized training data rather than learning general patterns.' },
      { id: 'mlq2', question: 'What does cross-validation do?', options: ['Increases training data', 'Evaluates model on multiple train/test splits to get reliable performance estimate', 'Reduces features', 'Normalizes data'], correctAnswer: 1, explanation: 'Cross-validation gives a more reliable model evaluation by using multiple data splits.' },
      { id: 'mlq3', question: 'What is a confusion matrix?', options: ['Loss function', 'Table showing TP, TN, FP, FN for classification evaluation', 'Feature correlation map', 'Weight matrix'], correctAnswer: 1, explanation: 'Confusion matrices visualize correct/incorrect predictions for each class.' },
      { id: 'mlq4', question: 'What does gradient descent minimize?', options: ['Training time', 'Loss function by iteratively adjusting weights', 'Model complexity', 'Data dimensionality'], correctAnswer: 1, explanation: 'Gradient descent updates weights in the direction that reduces loss most.' },
      { id: 'mlq5', question: 'What is L2 regularization (Ridge)?', options: ['Adds absolute value of weights to loss', 'Adds squared weights to loss to penalize large coefficients', 'Drops neurons randomly', 'Normalizes features'], correctAnswer: 1, explanation: 'L2 adds λΣw² to loss, shrinking weights toward zero.' },
      { id: 'mlq6', question: 'What is the bias-variance tradeoff?', options: ['Speed vs accuracy', 'Tension between underfitting (high bias) and overfitting (high variance)', 'Training vs test size', 'Feature vs sample count'], correctAnswer: 1, explanation: 'Reducing bias often increases variance; finding the balance is the core ML challenge.' },
      { id: 'mlq7', question: 'What is feature scaling and why is it needed?', options: ['Removing features', 'Normalizing feature ranges so algorithms converge faster and fairly weight features', 'Encoding categories', 'Selecting top features'], correctAnswer: 1, explanation: 'Algorithms like KNN and gradient descent are sensitive to feature scale differences.' },
      { id: 'mlq8', question: 'What does precision measure?', options: ['Of all positives, how many are correct', 'Of predicted positives, how many are actually positive', 'Overall accuracy', 'Recall metric'], correctAnswer: 1, explanation: 'Precision = TP / (TP + FP) — quality of positive predictions.' },
      { id: 'mlq9', question: 'What is k in k-fold cross-validation?', options: ['Number of features', 'Number of equally-sized data partitions to use for validation', 'Learning rate', 'Number of epochs'], correctAnswer: 1, explanation: 'k-fold splits data into k parts, training k times each on a different validation fold.' },
      { id: 'mlq10', question: 'What is the difference between parameters and hyperparameters?', options: ['Same thing', 'Parameters are learned from data; hyperparameters are set before training', 'Hyperparameters are outputs', 'Parameters are fixed'], correctAnswer: 1, explanation: 'Weights are parameters (learned); learning rate, depth are hyperparameters (configured).' },
    ]
  },
];

// ─── DATA ANALYTICS POOL ──────────────────────────────────────────────────────
const DA_POOL = [
  {
    id: 'da_sql_core', title: 'SQL Fundamentals & Joins',
    description: 'SELECT, WHERE, JOINs, GROUP BY, HAVING, subqueries.',
    difficulty: 'beginner', baseDays: 6, prerequisites: [],
    skillsCovered: ['sql', 'queries', 'joins'],
    tags: ['analytics', 'data', 'database'],
    careerGoalScores: { 'data analyst': 10, 'backend developer': 7, 'data scientist': 6 },
    tasks: [
      { id: 'da_sql_t1', title: 'Write 20 SQL queries using all JOIN types, aggregations, and subqueries', completed: false, difficulty: 'beginner', learningResources: [{ title: 'SQLZoo', url: 'https://sqlzoo.net', type: 'interactive' }] },
    ],
    quizzes: [
      { id: 'sqlq1', question: 'Which JOIN returns only matching rows from both tables?', options: ['LEFT JOIN', 'FULL OUTER JOIN', 'INNER JOIN', 'CROSS JOIN'], correctAnswer: 2, explanation: 'INNER JOIN returns only rows with matching keys in both tables.' },
      { id: 'sqlq2', question: 'HAVING clause is used to filter?', options: ['Individual rows before grouping', 'Aggregated results after GROUP BY', 'Column names', 'Table names'], correctAnswer: 1, explanation: 'HAVING filters groups after GROUP BY, unlike WHERE which filters rows before.' },
      { id: 'sqlq3', question: 'What does COUNT(DISTINCT col) do?', options: ['Counts all rows', 'Counts unique non-null values in column', 'Counts null values', 'Counts groups'], correctAnswer: 1, explanation: 'COUNT(DISTINCT) removes duplicates before counting.' },
      { id: 'sqlq4', question: 'What does a primary key guarantee?', options: ['Fastest queries', 'Unique, non-null identifier for each row', 'Foreign table reference', 'Automatic indexing only'], correctAnswer: 1, explanation: 'Primary keys enforce uniqueness and non-null constraints on a column.' },
      { id: 'sqlq5', question: 'What is a subquery?', options: ['Secondary database', 'A query nested inside another query', 'Stored procedure', 'View definition'], correctAnswer: 1, explanation: 'Subqueries are nested SELECTs used inside WHERE, FROM, or SELECT clauses.' },
      { id: 'sqlq6', question: 'What does ORDER BY col DESC do?', options: ['Groups by column', 'Sorts results in descending order', 'Filters null values', 'Joins tables'], correctAnswer: 1, explanation: 'ORDER BY col DESC sorts the result set from largest to smallest.' },
      { id: 'sqlq7', question: 'What is a window function in SQL?', options: ['Filters a window of rows', 'Performs calculations across a set of rows related to current row without collapsing', 'Creates views', 'Partitions tables'], correctAnswer: 1, explanation: 'Window functions (like RANK, SUM OVER) compute across a partition while keeping rows.' },
      { id: 'sqlq8', question: 'What is the difference between WHERE and HAVING?', options: ['WHERE for strings, HAVING for numbers', 'WHERE filters rows before aggregation; HAVING filters after aggregation', 'WHERE is for joins; HAVING is for subqueries', 'No difference'], correctAnswer: 1, explanation: 'WHERE operates on individual rows; HAVING operates on grouped results.' },
      { id: 'sqlq9', question: 'What is a CTE (Common Table Expression)?', options: ['Permanent table', 'Temporary named result set defined with WITH clause within a single query', 'Stored procedure', 'Database trigger'], correctAnswer: 1, explanation: 'CTEs improve query readability by naming intermediate result sets.' },
      { id: 'sqlq10', question: 'What does COALESCE() do?', options: ['Concatenates strings', 'Returns the first non-null value from a list of arguments', 'Converts data types', 'Groups null values'], correctAnswer: 1, explanation: 'COALESCE(a, b, c) returns the first non-null value, useful for null handling.' },
    ]
  },
  {
    id: 'da_visualization', title: 'Data Visualization & BI Dashboards',
    description: 'Matplotlib, Seaborn, Plotly, Power BI / Tableau dashboard design.',
    difficulty: 'intermediate', baseDays: 7, prerequisites: ['da_sql_core'],
    skillsCovered: ['visualization', 'bi-tools', 'dashboard'],
    tags: ['analytics', 'visualization', 'data'],
    careerGoalScores: { 'data analyst': 10, 'data scientist': 7, 'backend developer': 2 },
    tasks: [
      { id: 'da_viz_t1', title: 'Build an interactive dashboard in Power BI or Tableau with 5 chart types', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'Tableau Public', url: 'https://public.tableau.com', type: 'interactive' }] },
    ],
    quizzes: [
      { id: 'vizq1', question: 'Which chart type shows distribution of a continuous variable?', options: ['Bar chart', 'Histogram', 'Pie chart', 'Scatter plot'], correctAnswer: 1, explanation: 'Histograms show frequency distribution of continuous data across bins.' },
      { id: 'vizq2', question: 'What is a scatter plot best for?', options: ['Part-to-whole relationships', 'Showing correlation between two numeric variables', 'Time series trends', 'Category comparisons'], correctAnswer: 1, explanation: 'Scatter plots reveal relationships and correlations between two continuous variables.' },
      { id: 'vizq3', question: 'What does a box plot show?', options: ['Trend over time', 'Median, quartiles, and outliers of a distribution', 'Category proportions', 'Correlation matrix'], correctAnswer: 1, explanation: 'Box plots display the 5-number summary: min, Q1, median, Q3, max.' },
      { id: 'vizq4', question: 'When should you use a pie chart?', options: ['Comparing many categories', 'Showing trend over time', 'Showing part-to-whole for 2-5 categories', 'Distribution analysis'], correctAnswer: 2, explanation: 'Pie charts work for few categories; too many slices become unreadable.' },
      { id: 'vizq5', question: 'What is a heatmap used for?', options: ['Geographic data', 'Showing magnitude of values across two categories using color intensity', 'Time series', 'Distribution'], correctAnswer: 1, explanation: 'Heatmaps encode values as colors in a matrix, ideal for correlation matrices.' },
      { id: 'vizq6', question: 'What does Seaborn\'s pairplot() show?', options: ['Single variable distribution', 'Pairwise relationships between all numeric columns in a dataset', 'Time series grid', 'Categorical comparisons'], correctAnswer: 1, explanation: 'pairplot() creates a grid of scatter plots for all numeric column pairs.' },
      { id: 'vizq7', question: 'What is a KPI in a BI dashboard?', options: ['Key Page Interaction', 'Key Performance Indicator — measurable value showing progress toward goals', 'Kernel Process Index', 'Knowledge Panel Item'], correctAnswer: 1, explanation: 'KPIs are quantifiable metrics used to evaluate success of an objective.' },
      { id: 'vizq8', question: 'What makes a dashboard misleading?', options: ['Too many colors', 'Truncated y-axis exaggerating small differences', 'Using bar charts', 'Dark background'], correctAnswer: 1, explanation: 'A truncated y-axis makes tiny differences appear dramatic, misleading viewers.' },
      { id: 'vizq9', question: 'What is Plotly used for in Python?', options: ['Machine learning', 'Creating interactive web-based data visualizations', 'Data cleaning', 'SQL queries'], correctAnswer: 1, explanation: 'Plotly creates interactive charts embeddable in web apps or Jupyter notebooks.' },
      { id: 'vizq10', question: 'What is a drill-down in BI?', options: ['Filtering by date', 'Navigating from summary data to more detailed underlying data', 'Exporting to Excel', 'Creating calculated fields'], correctAnswer: 1, explanation: 'Drill-down lets users click into aggregated data to see underlying details.' },
    ]
  },
];

// ─── MASTER POOL REGISTRY ─────────────────────────────────────────────────────
export const MASTER_POOL = {
  MERN:             MERN_POOL,
  DSA:              DSA_POOL,
  Cybersecurity:    CYBER_POOL,
  'AI/ML':          AIML_POOL,
  'Data Analytics': DA_POOL,
};

// Get pool for a given domain (case-insensitive fuzzy match)
export const getPoolForDomain = (domain) => {
  const key = Object.keys(MASTER_POOL).find(k =>
    k.toLowerCase() === (domain || '').toLowerCase()
  );
  return MASTER_POOL[key] || MERN_POOL;
};
