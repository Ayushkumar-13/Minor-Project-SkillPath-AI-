// Dynamic Roadmap Generation Engine - SkillPath AI
// Core domain curricula structures and custom dynamic adaptation logic.

// Helper to pick N random items from an array
export const getRandomSubset = (arr, count = 5) => {
  if (!arr || arr.length === 0) return [];
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, arr.length));
};

const DOMAIN_CURRICULA = {
  MERN: [
    {
      id: 'mern_mod_1',
      title: 'Frontend Foundations (HTML, CSS, Modern JS)',
      description: 'Master standard semantic markup, modern responsive CSS layouts, ES6+ JavaScript structures, and event-driven browser operations.',
      baseDuration: 6,
      skillsCovered: ['html', 'css', 'javascript', 'es6', 'dom'],
      tasks: [
        { id: 'mern_t_1', title: 'Learn semantic HTML5 elements and SEO-friendly structures', difficulty: 'beginner', learningResources: [{ title: 'MDN Semantic HTML Guide', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics', type: 'article' }] },
        { id: 'mern_t_2', title: 'Build a responsive Flexbox & CSS Grid portfolio layout', difficulty: 'beginner', learningResources: [{ title: 'CSS Tricks Grid Guide', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', type: 'article' }] },
        { id: 'mern_t_3', title: 'Understand ES6 features (Destructuring, Arrow functions, Array methods, Promises)', difficulty: 'intermediate', learningResources: [{ title: 'JavaScript.info Modern JS', url: 'https://javascript.info/', type: 'tutorial' }] },
        { id: 'mern_t_4', title: 'Create an event-driven web counter using local storage state persistence', difficulty: 'intermediate', learningResources: [{ title: 'Wes Bos JavaScript30', url: 'https://javascript30.com/', type: 'video' }] }
      ],
      quizzes: [
        { id: 'mern_q1_1', question: 'Which HTML5 element represents self-contained, independent composition?', options: ['<section>', '<article>', '<div>', '<aside>'], correctAnswer: 1, explanation: 'The <article> element is designed for self-contained, independent compositions that are distributable or reusable.' },
        { id: 'mern_q1_2', question: 'What is the correct value of grid-template-columns to create 3 equal fluid columns?', options: ['repeat(3, 1fr)', '3fr 3fr 3fr', 'repeat(3, 33%)', '1fr 1fr 1fr 100px'], correctAnswer: 0, explanation: 'repeat(3, 1fr) is the standard and cleanest way to declare three equal columns using grid fractional units.' },
        { id: 'mern_q1_3', question: 'Which JS Array method returns a new array with all elements that pass a test?', options: ['map()', 'forEach()', 'filter()', 'reduce()'], correctAnswer: 2, explanation: 'filter() creates a shallow copy of a portion of a given array, filtered down to just the elements that pass the test.' },
        { id: 'mern_q1_4', question: 'What does a Promise state change from PENDING to resolved mean?', options: ['Fulfilled', 'Rejected', 'Settled', 'Completed'], correctAnswer: 0, explanation: 'A successful promise resolution transitions its state to fulfilled.' },
        { id: 'mern_q1_5', question: 'How do you store an object in localStorage?', options: ['localStorage.setItem("key", obj)', 'localStorage.setItem("key", JSON.stringify(obj))', 'localStorage.setObject("key", obj)', 'localStorage.store(obj)'], correctAnswer: 1, explanation: 'localStorage only stores strings, so objects must be serialized using JSON.stringify before saving.' },
        { id: 'mern_q1_6', question: 'What is the difference between Event Bubbling and Event Capturing?', options: ['Bubbling travels up the DOM tree; Capturing travels down.', 'Bubbling travels down the DOM tree; Capturing travels up.', 'Bubbling resets the form; Capturing submits it.', 'No difference; they are identical.'], correctAnswer: 0, explanation: 'Event capturing flows from the document root down to the target element, whereas bubbling flows from the target element back up to the document root.' },
        { id: 'mern_q1_7', question: 'Which CSS property forces borders and padding to be included in the total width and height calculations?', options: ['box-sizing: content-box', 'box-sizing: border-box', 'display: grid', 'padding-behavior: inline'], correctAnswer: 1, explanation: 'box-sizing: border-box ensures padding and borders are calculated inside the declared height/width boundaries, preventing layout overflows.' },
        { id: 'mern_q1_8', question: 'What does the JavaScript keyword "use strict" do?', options: ['Restricts standard loop variables', 'Enforces strict syntax rules and throws exceptions for silent errors', 'Compresses DOM element nodes', 'Speeds up memory allocations'], correctAnswer: 1, explanation: 'Strict mode makes it easier to write "secure" JavaScript by transforming bad practices or silent syntax bugs into descriptive exceptions.' },
        { id: 'mern_q1_9', question: 'What is event delegation in browser programming?', options: ['Binding listeners to every child item', 'Attaching a single event listener to a parent node to manage child triggers through event bubbling', 'Passing page events to cloud variables', 'Bypassing security boundaries'], correctAnswer: 1, explanation: 'Event delegation utilizes event bubbling to manage events on a single parent listener, reducing DOM listener allocations and memory overhead.' },
        { id: 'mern_q1_10', question: 'Which comparison operator evaluates both the value and the type of operands strictly?', options: ['==', '!=', '===', 'equals()'], correctAnswer: 2, explanation: 'The strict equality operator (===) compares both operand value and data type without performing implicit type coercions.' }
      ]
    },
    {
      id: 'mern_mod_2',
      title: 'React.js SPA Development',
      description: 'Deep dive into React core concepts, hooks state management, functional components, routing, and form handlings.',
      baseDuration: 8,
      skillsCovered: ['react', 'components', 'hooks', 'routing', 'vite'],
      tasks: [
        { id: 'mern_t_5', title: 'Initialize a React SPA using Vite, configuring custom Tailwind styles', difficulty: 'beginner', learningResources: [{ title: 'Vite Getting Started', url: 'https://vitejs.dev/guide/', type: 'docs' }] },
        { id: 'mern_t_6', title: 'Master useState, useEffect, and custom modular hook creation', difficulty: 'intermediate', learningResources: [{ title: 'Official React Dev Docs - Hooks', url: 'https://react.dev/reference/react/hooks', type: 'docs' }] },
        { id: 'mern_t_7', title: 'Implement dynamic SPA client-side routing using React Router v6', difficulty: 'intermediate', learningResources: [{ title: 'React Router Tutorial', url: 'https://reactrouter.com/en/main/start/tutorial', type: 'tutorial' }] },
        { id: 'mern_t_8', title: 'Manage complex user inputs and client-side form validations safely', difficulty: 'intermediate', learningResources: [{ title: 'React Hook Form Guide', url: 'https://react-hook-form.com/', type: 'docs' }] }
      ],
      quizzes: [
        { id: 'mern_q2_1', question: 'Which React Hook is used to perform side effects in functional components?', options: ['useState', 'useReducer', 'useCallback', 'useEffect'], correctAnswer: 3, explanation: 'useEffect lets you synchronize a component with an external system or trigger side effects like network fetches or DOM alterations.' },
        { id: 'mern_q2_2', question: 'What is a critical rule regarding React Hook execution?', options: ['Hooks must be called inside loops', 'Hooks must be called at the top level of your functional component', 'Hooks must be declared inside nested functions', 'Hooks must be called asynchronously'], correctAnswer: 1, explanation: 'Hooks must always be declared at the top level of React functions, before any early returns or conditional blocks.' },
        { id: 'mern_q2_3', question: 'In React Router v6, how do you specify a dynamic URL parameter route?', options: ['<Route path="user/:id" />', '<Route path="user/id" />', '<Route path="user?id" />', '<Route path="user/param/id" />'], correctAnswer: 0, explanation: 'A colon (:) denotes a dynamic segment parameter in React Router paths.' },
        { id: 'mern_q2_4', question: 'What is the purpose of passing a dependency array to the useEffect hook?', options: ['To execute the effect on every single rerender', 'To restrict execution to only when specified values change', 'To load API keys safely', 'To bind local storage values'], correctAnswer: 1, explanation: 'The dependency array determines when the effect should fire; if empty, it runs once after initial mount.' },
        { id: 'mern_q2_5', question: 'What optimization does React.memo perform?', options: ['Saves components to local storage', 'Memoizes state variables automatically', 'Skips component re-rendering if its props are unchanged', 'Validates form states'], correctAnswer: 2, explanation: 'React.memo is a higher-order component that optimizes performance by skipping re-renders of components when incoming props do not change.' },
        { id: 'mern_q2_6', question: 'What is the primary difference between useMemo and useCallback?', options: ['useMemo caches calculated values; useCallback caches callback functions.', 'useMemo handles async loops; useCallback does not.', 'useMemo is for CSS rendering; useCallback is for JS engines.', 'They are identical.'], correctAnswer: 0, explanation: 'useMemo executes a calculation and caches its returned value; useCallback caches the functional pointer itself to prevent child re-renders.' },
        { id: 'mern_q2_7', question: 'How do you clean up side effects (like subscriptions or timers) in useEffect?', options: ['Call useEffect.cleanup()', 'Return a function containing cleanup logic from the useEffect callback', 'Pass an empty object to the dependency array', 'Delete the component file'], correctAnswer: 1, explanation: 'If your effect returns a cleanup function, React will automatically execute it when the component unmounts or before re-running the effect.' },
        { id: 'mern_q2_8', question: 'What is the purpose of the React key prop in lists?', options: ['To encrypt list text', 'To uniquely identify sibling elements so React can optimize DOM diffing/reconciliation', 'To speed up file queries', 'To enable CSS variables'], correctAnswer: 1, explanation: 'Keys help React identify which items have changed, been added, or been removed, giving stable layouts during reconciliation.' },
        { id: 'mern_q2_9', question: 'What happens when a component\'s state variable is updated?', options: ['The entire page reloads', 'Only that component and its children are re-rendered in the virtual DOM', 'The database is written automatically', 'The server shuts down'], correctAnswer: 1, explanation: 'Updating a React state schedules a re-render of that component and its child sub-tree in the virtual DOM, syncing necessary updates to the actual browser DOM.' },
        { id: 'mern_q2_10', question: 'What is a React Synthetic Event?', options: ['An artificial error triggered by routers', 'A cross-browser wrapper around the browser\'s native event object to guarantee unified behavior', 'A mock event used only in unit tests', 'A dynamic CSS class'], correctAnswer: 1, explanation: 'React wraps native events inside a SyntheticEvent object to ensure absolute cross-browser API uniformity and event pooling optimizations.' }
      ]
    },
    {
      id: 'mern_mod_3',
      title: 'Backend with Node.js & Express.js',
      description: 'Architecting robust servers, understanding middlewares, routing, custom JSON error payloads, and controller paradigms.',
      baseDuration: 8,
      skillsCovered: ['node', 'express', 'rest-api', 'middleware'],
      tasks: [
        { id: 'mern_t_9', title: 'Set up an Express server with structured folders and Nodemon autoreloads', difficulty: 'beginner', learningResources: [{ title: 'Express Hello World Guide', url: 'https://expressjs.com/en/starter/hello-world.html', type: 'docs' }] },
        { id: 'mern_t_10', title: 'Write standard reusable logging, validation, and error middlewares', difficulty: 'intermediate', learningResources: [{ title: 'Express Middleware Writing', url: 'https://expressjs.com/en/guide/writing-middleware.html', type: 'docs' }] },
        { id: 'mern_t_11', title: 'Implement structured MVC controllers mapping standard CRUD operations', difficulty: 'intermediate', learningResources: [{ title: 'Mozilla Express MVC Tutorial', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website', type: 'tutorial' }] }
      ],
      quizzes: [
        { id: 'mern_q3_1', question: 'What is the signature of standard Express error-handling middleware?', options: ['(req, res, next)', '(err, req, res)', '(err, req, res, next)', '(req, res, next, err)'], correctAnswer: 2, explanation: 'Express identifies error handling middlewares by expecting exactly 4 arguments: (err, req, res, next).' },
        { id: 'mern_q3_2', question: 'What is Node.js primarily built upon?', options: ['Chrome V8 Engine', 'Microsoft Chakra Engine', 'Mozilla SpiderMonkey', 'Webkit Engine'], correctAnswer: 0, explanation: 'Node.js is built on top of Google Chrome\'s V8 open-source JavaScript runtime engine.' },
        { id: 'mern_q3_3', question: 'Which status code denotes a successful resource creation?', options: ['200 OK', '201 Created', '204 No Content', '302 Found'], correctAnswer: 1, explanation: 'The 201 Created status code indicates the request has succeeded and led to creation of a resource.' },
        { id: 'mern_q3_4', question: 'What does "npm" stand for in Node ecosystem?', options: ['Node Product Manager', 'Network Program Module', 'Node Package Manager', 'Non-parsed Method'], correctAnswer: 2, explanation: 'npm stands for Node Package Manager, the standard registry and package client for Node packages.' },
        { id: 'mern_q3_5', question: 'How is request body parsed in modern Express?', options: ['Using req.body() function', 'Express.json() middleware', 'Body parser module only', 'It is parsed by default without middleware'], correctAnswer: 1, explanation: 'modern Express has built-in express.json() middleware to automatically parse incoming JSON payloads.' },
        { id: 'mern_q3_6', question: 'What is the purpose of Node.js Event Loop?', options: ['To perform multi-threaded CPU heavy tasks', 'To handle non-blocking asynchronous I/O operations on a single thread', 'To loop through static array files', 'To encrypt route pathways'], correctAnswer: 1, explanation: 'The Event Loop offloads asynchronous kernel tasks and triggers callbacks sequentially, enabling extremely high concurrency over a single thread.' },
        { id: 'mern_q3_7', question: 'Which core Node module provides asynchronous file operations?', options: ['http', 'fs', 'path', 'os'], correctAnswer: 1, explanation: 'The fs (File System) module allows interacting with files in a non-blocking or synchronous manner.' },
        { id: 'mern_q3_8', question: 'What does the "next()" function accomplish inside an Express middleware?', options: ['Halts request processes', 'Passes controller triggers to the next middleware or router in the stack', 'Redirects request addresses', 'Closes database channels'], correctAnswer: 1, explanation: 'If the current middleware does not end the request-response cycle, it must call next() to pass execution down the middleware stack.' },
        { id: 'mern_q3_9', question: 'What is the utility of Nodemon in development?', options: ['Compiles JavaScript into assembly', 'Automatically restarts the Node.js process whenever codebase changes are saved', 'Encrypts user credential entries', 'Manages cloud API deployments'], correctAnswer: 1, explanation: 'Nodemon increases developer velocity by watching files and auto-restarting Node servers upon edits.' },
        { id: 'mern_q3_10', question: 'Which Node.js design pattern is standard to manage stream-based resource pipes?', options: ['Event Emitter', 'Stream Piping (.pipe())', 'Observer Pattern', 'Singleton Instance'], correctAnswer: 1, explanation: 'Streams represent fluid flows of readable/writable chunks. Piping streams with .pipe() optimizes memory by handling backpressure automatically.' }
      ]
    },
    {
      id: 'mern_mod_4',
      title: 'Database & Security (MongoDB, JWT Auth)',
      description: 'Understanding ODM Mongoose, complex schemas, secure password hashing with bcryptjs, and JWT generation/validation.',
      baseDuration: 10,
      skillsCovered: ['mongodb', 'mongoose', 'jwt', 'bcrypt', 'security'],
      tasks: [
        { id: 'mern_t_12', title: 'Design user models and project schemas using Mongoose validation layers', difficulty: 'intermediate', learningResources: [{ title: 'Mongoose Schemas Guide', url: 'https://mongoosejs.com/docs/guide.html', type: 'docs' }] },
        { id: 'mern_t_13', title: 'Implement secure signup using bcrypt salt hashing techniques', difficulty: 'advanced', learningResources: [{ title: 'Bcrypt Hashing Security', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html', type: 'article' }] },
        { id: 'mern_t_14', title: 'Secure backend routes with custom JWT token validation headers', difficulty: 'advanced', learningResources: [{ title: 'Auth0 JWT Introduction', url: 'https://jwt.io/introduction', type: 'docs' }] }
      ],
      quizzes: [
        { id: 'mern_q4_1', question: 'What is MongoDB classified as?', options: ['Relational Database', 'Graph Database', 'Document-oriented NoSQL Database', 'Key-Value Cache'], correctAnswer: 2, explanation: 'MongoDB stores data as fluid document structures resembling JSON, making it a document NoSQL database.' },
        { id: 'mern_q4_2', question: 'Which encryption algorithm is standard for secure password hashing in MERN?', options: ['MD5', 'SHA-1', 'bcrypt', 'Base64'], correctAnswer: 2, explanation: 'bcrypt is a robust password hashing algorithm designed to resist brute-force hardware cracking attacks.' },
        { id: 'mern_q4_3', question: 'What are the three parts of a JWT token separated by periods?', options: ['Key, Value, Signature', 'Header, Payload, Signature', 'Token, Data, Cipher', 'User, Data, Integrity'], correctAnswer: 1, explanation: 'JWT consists of three sections: Header (algorithm & token type), Payload (claims), and Signature.' },
        { id: 'mern_q4_4', question: 'In Mongoose, how do you reference another collection item (foreign key)?', options: ['type: Schema.Types.ObjectId, ref: "ModelName"', 'type: String, foreign: true', 'type: Array, items: "ModelName"', 'type: Reference'], correctAnswer: 0, explanation: 'Setting type to mongoose.Schema.Types.ObjectId and ref to the model establishes a clean collection reference.' },
        { id: 'mern_q4_5', question: 'What is the purpose of CORS middleware in backend development?', options: ['To encrypt database entries', 'To sign JWT authentication tokens', 'To permit or restrict resources requests from outer domains', 'To speed up query response rates'], correctAnswer: 2, explanation: 'CORS (Cross-Origin Resource Sharing) tells the browser whether to allow requests from external domains.' },
        { id: 'mern_q4_6', question: 'What does a Mongoose "pre-save" hook accomplish?', options: ['Pre-compiles collection files', 'Executes custom logic (e.g. hashing passwords) immediately before saving documents into MongoDB', 'Performs schema backups', 'Truncates tables'], correctAnswer: 1, explanation: 'A pre("save") schema middleware automatically hooks into the saving stream, letting developers alter parameters like passwords before they write to the disk.' },
        { id: 'mern_q4_7', question: 'How is JWT signature verified in the backend?', options: ['By parsing public parameters', 'Comparing signature hashes compiled using a private custom secret key', 'Consulting external registers', 'Using basic Base64 decoding'], correctAnswer: 1, explanation: 'Backend verifies signature integrity by recalculating the header+payload hash using the server\'s secret key and confirming they match.' },
        { id: 'mern_q4_8', question: 'What does MongoDB "Indexing" improve?', options: ['Write operations speed', 'Read query execution speeds', 'Data encryption depths', 'Server bandwidth loads'], correctAnswer: 1, explanation: 'Indexes create highly optimized query trees, allowing MongoDB to fetch documents without scanning the entire collection, at the expense of slight write overhead.' },
        { id: 'mern_q4_9', question: 'What does "bcrypt salt rounds" represent?', options: ['Number of times the private key is printed', 'Complexity cost factor determining hash calculation iterations', 'Password string length requirements', 'Session timeout counts'], correctAnswer: 1, explanation: 'Salt rounds determine the CPU cost coefficient. Higher values increase hashing complexity exponentially, preventing brute-force dictionary attacks.' },
        { id: 'mern_q4_10', question: 'What is the difference between Access Tokens and Refresh Tokens?', options: ['Access tokens are short-lived for api authorization; Refresh tokens are long-lived to safely regenerate access keys.', 'Access tokens are stored in database arrays; Refresh tokens are not.', 'Access tokens are decrypted; Refresh tokens are clear text.', 'No difference.'], correctAnswer: 0, explanation: 'Access tokens authorize active calls and expire rapidly; Refresh tokens are securely saved to safely grant fresh access tokens without forcing manual logins.' }
      ]
    }
  ],
  DSA: [
    {
      id: 'dsa_mod_1',
      title: 'Time & Space Complexity, Arrays & Lists',
      description: 'Master Big-O analysis, memory layout, array operations, sliding window techniques, and linked list structures.',
      baseDuration: 7,
      skillsCovered: ['big-o', 'complexity', 'arrays', 'linked-list'],
      tasks: [
        { id: 'dsa_t_1', title: 'Analyze time complexity (Big-O) of search and sort algorithms', difficulty: 'beginner', learningResources: [{ title: 'Big-O Cheat Sheet', url: 'https://www.bigocheatsheet.com/', type: 'article' }] },
        { id: 'dsa_t_2', title: 'Implement standard operations (Insert, Delete, Reverse) on Single/Double Linked Lists', difficulty: 'intermediate', learningResources: [{ title: 'GeeksForGeeks Linked Lists', url: 'https://www.geeksforgeeks.org/data-structures/linked-list/', type: 'tutorial' }] },
        { id: 'dsa_t_3', title: 'Solve standard Sliding Window and Two Pointer array exercises', difficulty: 'intermediate', learningResources: [{ title: 'LeetCode Two Pointer Curated', url: 'https://leetcode.com/tag/two-pointers/', type: 'practice' }] }
      ],
      quizzes: [
        { id: 'dsa_q1_1', question: 'What is the time complexity of searching in an unsorted array of size N?', options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'], correctAnswer: 2, explanation: 'Without order, you must traverse all N items in the worst case, yielding O(N).' },
        { id: 'dsa_q1_2', question: 'What is the space complexity of a recursively reversed linked list?', options: ['O(1)', 'O(N) due to recursion stack', 'O(N^2)', 'O(log N)'], correctAnswer: 1, explanation: 'A recursive call stack stores stack frames proportional to the number of nodes, yielding O(N).' },
        { id: 'dsa_q1_3', question: 'Which array technique is best to find the maximum sum subarray of size K?', options: ['Two Pointers', 'Binary Search', 'Sliding Window', 'Depth First Search'], correctAnswer: 2, explanation: 'Sliding window keeps track of a window of size K, adjusting boundary indices efficiently in O(N).' },
        { id: 'dsa_q1_4', question: 'Which structure enables constant O(1) random index access?', options: ['Linked List', 'Array', 'Binary Tree', 'Queue'], correctAnswer: 1, explanation: 'Arrays allocate contiguous memory blocks, enabling simple pointer math to fetch entries in constant time.' },
        { id: 'dsa_q1_5', question: 'In a doubly linked list, how many pointers does each node contain?', options: ['One', 'Two', 'Three', 'None'], correctAnswer: 1, explanation: 'A doubly linked list node contains two pointers: one pointing forward to the next node, and one backward to the previous node.' },
        { id: 'dsa_q1_6', question: 'What is the time complexity of binary search on a sorted array of size N?', options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'], correctAnswer: 1, explanation: 'Binary search halves the search space at each comparison step, achieving an optimal logarithmic O(log N) runtime.' },
        { id: 'dsa_q1_7', question: 'Which pointer strategy is optimal for detecting a cycle inside a Singly Linked List?', options: ['Binary Search pointers', 'Floyd\'s Cycle Finding algorithm (Slow and Fast pointers)', 'Random array indices', 'Nested nested loops'], correctAnswer: 1, explanation: 'Floyd\'s cycle algorithm uses a slow pointer (1 step) and fast pointer (2 steps). If a cycle exists, they will eventually meet.' },
        { id: 'dsa_q1_8', question: 'What is the time complexity of inserting an item at the head of a Singly Linked List?', options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'], correctAnswer: 2, explanation: 'Inserting at the head requires simply pointing the new node\'s next pointer to the current head and resetting the head pointer, taking constant O(1) time.' },
        { id: 'dsa_q1_9', question: 'What is amortized time complexity analysis?', options: ['Calculating worst-case speeds of recursion', 'Averaging the time taken by an operation over a sequence of actions, demonstrating that occasional expensive steps are offset by mostly cheap ones', 'Analyzing memory layout compression', 'Profiling database network queries'], correctAnswer: 1, explanation: 'Amortized analysis guarantees the average performance of an action over time, like dynamic array resizing.' },
        { id: 'dsa_q1_10', question: 'In contiguous array memory allocation, how is indexing mathematically solved?', options: ['Using database lookup files', 'BaseAddress + Index * ElementSize', 'Hashing index strings', 'Depth first searches'], correctAnswer: 1, explanation: 'Array indexing uses simple pointer arithmetic to locate target element offsets inside contiguous memory blocks instantly.' }
      ]
    },
    {
      id: 'dsa_mod_2',
      title: 'Stacks, Queues, and Hashing',
      description: 'Understanding LIFO/FIFO patterns, hash map collision mechanisms, and applications in expression evaluation.',
      baseDuration: 7,
      skillsCovered: ['stack', 'queue', 'hashmap', 'hashing'],
      tasks: [
        { id: 'dsa_t_4', title: 'Implement custom stack and queue using arrays and nodes', difficulty: 'beginner', learningResources: [{ title: 'Visualgo Stack/Queue', url: 'https://visualgo.net/en/list', type: 'interactive' }] },
        { id: 'dsa_t_5', title: 'Solve the Valid Parentheses string matching exercise using stack', difficulty: 'intermediate', learningResources: [{ title: 'LeetCode Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', type: 'practice' }] },
        { id: 'dsa_t_6', title: 'Build a hash map class handling standard bucket collision hashing', difficulty: 'advanced', learningResources: [{ title: 'Hash Collision Handling', url: 'https://www.hackerearth.com/practice/data-structures/hash-tables/basics-of-hash-tables/tutorial/', type: 'tutorial' }] }
      ],
      quizzes: [
        { id: 'dsa_q2_1', question: 'What structural access policy is associated with Stacks?', options: ['FIFO', 'LIFO', 'LILO', 'Random Access'], correctAnswer: 1, explanation: 'Stacks are Last-In First-Out (LIFO), meaning the last item inserted is the first one retrieved.' },
        { id: 'dsa_q2_2', question: 'What occurs when two distinct keys yield identical hashed integers?', options: ['Collision', 'Buffer overflow', 'De-hashing', 'Null Pointer'], correctAnswer: 0, explanation: 'A collision happens when different keys compile to the exact same hash address.' },
        { id: 'dsa_q2_3', question: 'What is the average time complexity of Hash Map lookup operations?', options: ['O(log N)', 'O(1)', 'O(N)', 'O(N log N)'], correctAnswer: 1, explanation: 'With a well-distributed hash function, bucket check resolves in O(1) average time.' },
        { id: 'dsa_q2_4', question: 'Which structure is optimal for managing printer document job sequences?', options: ['Stack', 'Binary Search Tree', 'Queue', 'Array'], correctAnswer: 2, explanation: 'Queues maintain First-In First-Out order, scheduling files according to arrival order.' },
        { id: 'dsa_q2_5', question: 'What is the standard time complexity of stack push and pop operations?', options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'], correctAnswer: 2, explanation: 'Pushing or popping elements from the top of the stack takes constant O(1) time.' },
        { id: 'dsa_q2_6', question: 'What is a circular queue data structure?', options: ['A queue that holds only circles', 'A linear queue where the last position is connected back to the first position to reuse empty slots', 'A nested stack loop', 'A binary search tree'], correctAnswer: 1, explanation: 'Circular queues optimize memory by wrapping indices back to 0 using modulo operations, reclaiming empty slots vacated by dequeues.' },
        { id: 'dsa_q2_7', question: 'What is the load factor of a hash table?', options: ['Calculated complexity rating', 'Number of elements divided by the total number of buckets (buckets capacity)', 'Total byte size of collision files', 'Ratio of null references'], correctAnswer: 1, explanation: 'Load factor (n/k) evaluates table fullness. Exceeding thresholds triggers resizing to prevent collision bottlenecks.' },
        { id: 'dsa_q2_8', question: 'What is a monotonic stack?', options: ['A stack that stores only identical integers', 'A stack that maintains elements in strict increasing or decreasing sorted order', 'A stack with variable buffer sizing', 'A linear queue'], correctAnswer: 1, explanation: 'Monotonic stacks maintain sorting invariants by popping elements violating order during pushes, highly efficient for next-greater-element challenges.' },
        { id: 'dsa_q2_9', question: 'Which collision resolution strategy uses linked list chains inside buckets?', options: ['Linear Probing', 'Chaining (Open Addressing)', 'Separate Chaining', 'Double Hashing'], correctAnswer: 2, explanation: 'Separate Chaining places elements hashing to the same bucket in a linked list chain, maintaining bucket modularity.' },
        { id: 'dsa_q2_10', question: 'Which linear ADT evaluates postfix expressions efficiently?', options: ['Queue', 'Linked List', 'Stack', 'Binary Tree'], correctAnswer: 2, explanation: 'Stacks store operands, popping and executing operations sequentially as operator symbols are parsed.' }
      ]
    }
  ],
  Cybersecurity: [
    {
      id: 'cyber_mod_1',
      title: 'Network Protocols & Vulnerability Fundamentals',
      description: 'Understanding TCP/IP stacks, DNS records, OWASP Top 10 vulnerabilities, and security controls.',
      baseDuration: 8,
      skillsCovered: ['networking', 'dns', 'tcp-ip', 'owasp'],
      tasks: [
        { id: 'cyber_t_1', title: 'Analyze packet streams and TCP three-way handshakes in Wireshark', difficulty: 'beginner', learningResources: [{ title: 'Wireshark Beginner Guide', url: 'https://www.wireshark.org/docs/', type: 'docs' }] },
        { id: 'cyber_t_2', title: 'Research and write code demonstrating SQL Injection and XSS mitigations', difficulty: 'intermediate', learningResources: [{ title: 'OWASP Top 10 Cheatsheet', url: 'https://owasp.org/www-project-top-ten/', type: 'article' }] }
      ],
      quizzes: [
        { id: 'cyber_q1_1', question: 'Which TCP flag begins the three-way network handshake sequence?', options: ['ACK', 'FIN', 'SYN', 'RST'], correctAnswer: 2, explanation: 'SYN (Synchronize) is the first packet sent by a client to initialize a connection.' },
        { id: 'cyber_q1_2', question: 'Which attack injects malicious scripts directly into target browsers?', options: ['SQL Injection', 'Cross-Site Scripting (XSS)', 'CSRF', 'DDoS'], correctAnswer: 1, explanation: 'XSS injects client-side scripts executed by victim web page visitors.' },
        { id: 'cyber_q1_3', question: 'Which protocol secures HTTP transmissions using TLS encryptions?', options: ['HTTPS', 'SFTP', 'SSH', 'DNSSEC'], correctAnswer: 0, explanation: 'HTTPS encrypts browser payloads over TLS/SSL on port 443.' },
        { id: 'cyber_q1_4', question: 'What is the function of a firewall?', options: ['To compile security scripts', 'To monitor and filter inbound and outbound traffic based on rules', 'To hash database entries', 'To generate SSH keypairs'], correctAnswer: 1, explanation: 'Firewalls establish barriers between secure networks and unverified networks, inspecting packets according to set parameters.' },
        { id: 'cyber_q1_5', question: 'Which vulnerability allows attackers to read database secrets directly?', options: ['XSS', 'Buffer overflow', 'SQL Injection', 'Man-In-The-Middle'], correctAnswer: 2, explanation: 'SQL Injection allows arbitrary database queries to run directly by altering inputs.' },
        { id: 'cyber_q1_6', question: 'What is DNS Cache Poisoning (Spoofing)?', options: ['Flooding domain servers with traffic', 'Injecting falsified DNS mapping entries into resolvers to redirect users to malicious clones', 'Scanning domain ports', 'Bypassing route guards'], correctAnswer: 1, explanation: 'Spoofing DNS cache tricks local resolvers into returning incorrect IP target mappings, routing visitors onto spoofed phishing domains.' },
        { id: 'cyber_q1_7', question: 'What protection is provided by ASLR (Address Space Layout Randomization)?', options: ['Data transmission encryption', 'Randomizing memory locations of key program modules to prevent buffer overflow shell execution', 'Updating user logins automatically', 'Hashing files'], correctAnswer: 1, explanation: 'ASLR makes memory addresses unpredictable, preventing attackers from executing code payloads on fixed stack locations.' },
        { id: 'cyber_q1_8', question: 'What is the main difference between symmetric and asymmetric cryptography?', options: ['Symmetric uses one shared key; Asymmetric uses a public-private keypair.', 'Symmetric is for DB files; Asymmetric is for browser pages.', 'Symmetric is slower than asymmetric.', 'No difference.'], correctAnswer: 0, explanation: 'Symmetric encryption relies on a single shared key for both encrypting and decrypting; asymmetric encryption employs public-private keypairs.' },
        { id: 'cyber_q1_9', question: 'Which HTTP security header mitigates XSS risks by defining safe script sources?', options: ['Strict-Transport-Security', 'Content-Security-Policy (CSP)', 'X-Frame-Options', 'Referrer-Policy'], correctAnswer: 1, explanation: 'CSP headers direct browsers to fetch and execute scripts only from whitelisted domain origins, rendering injected scripts inert.' },
        { id: 'cyber_q1_10', question: 'What is a Cross-Site Request Forgery (CSRF) exploit?', options: ['Reading browser memory dumps', 'Tricking browsers into firing unauthorized API commands under user session context', 'Forcing local server resets', 'Cracking JWT tokens'], correctAnswer: 1, explanation: 'CSRF exploits trust states. Browser credentials (cookies) are automatically attached to cross-domain requests, tricking systems into executing changes.' }
      ]
    }
  ],
  'AI/ML': [
    {
      id: 'aiml_mod_1',
      title: 'Python for Data Science & Math Core',
      description: 'Master Numpy arrays, Pandas frames, Linear Algebra matrices, and Probability equations.',
      baseDuration: 8,
      skillsCovered: ['python', 'numpy', 'pandas', 'algebra'],
      tasks: [
        { id: 'aiml_t_1', title: 'Manipulate high-dimensional vectors and solve linear systems with Numpy', difficulty: 'beginner', learningResources: [{ title: 'Numpy Quickstart', url: 'https://numpy.org/doc/stable/user/quickstart.html', type: 'tutorial' }] },
        { id: 'aiml_t_2', title: 'Filter, group, and clean missing values inside CSV data frames using Pandas', difficulty: 'intermediate', learningResources: [{ title: 'Kaggle Pandas Course', url: 'https://www.kaggle.com/learn/pandas', type: 'tutorial' }] }
      ],
      quizzes: [
        { id: 'aiml_q1_1', question: 'Which Pandas function loads comma-separated value tables into DataFrames?', options: ['read_json()', 'load_csv()', 'read_csv()', 'open_dataframe()'], correctAnswer: 2, explanation: 'pd.read_csv() compiles CSV files into Pandas DataFrames.' },
        { id: 'aiml_q1_2', question: 'What does Linear Algebra matrix multiplication represent in networks?', options: ['Data storage', 'Affine layer transformations', 'Regular expression checks', 'Loss parsing'], correctAnswer: 1, explanation: 'Neural layers execute dot products of weights and input matrices, constituting affine transformations.' },
        { id: 'aiml_q1_3', question: 'What does standard Numpy array slicing `arr[:2, 1:3]` output?', options: ['Row index 0-1, Column index 1-2', 'Row index 1-2, Column index 1-3', 'Row index 0-2, Column index 0-2', 'Error'], correctAnswer: 0, explanation: 'Python slices are exclusive of the upper limit; index :2 yields indices 0,1 while 1:3 yields 1,2.' },
        { id: 'aiml_q1_4', question: 'What statistics metric measures how spread out a data distribution is?', options: ['Median', 'Mean', 'Standard Deviation', 'Mode'], correctAnswer: 2, explanation: 'Standard Deviation quantifies dispersion or spread of values around their arithmetic mean.' },
        { id: 'aiml_q1_5', question: 'What is the main advantage of Numpy vectors over standard Python lists?', options: ['Easier file system access', 'Automatic cloud synchronization', 'Vectorized execution on contiguous memory segments', 'Support for nested strings'], correctAnswer: 2, explanation: 'Numpy achieves speed by wrapping vector instructions in precompiled C code over contiguous memory buffers.' },
        { id: 'aiml_q1_6', question: 'What is the primary difference between Pandas .loc and .iloc operators?', options: ['.loc uses label-based indexing; .iloc uses integer-location based indexing.', '.loc queries database rows; .iloc loops arrays.', '.loc is faster than .iloc.', 'No difference.'], correctAnswer: 0, explanation: '.loc fetches records matching specific labels or conditions, whereas .iloc extracts items based strictly on numerical indices.' },
        { id: 'aiml_q1_7', question: 'What is the mathematical purpose of L2 regularization (Ridge)?', options: ['To drop columns automatically', 'To penalize the sum of squared weights, shifting coefficients towards zero to prevent overfitting', 'To accelerate gradient steps', 'To calculate accuracy coefficients'], correctAnswer: 1, explanation: 'L2 regularization adds a quadratic weight penalty (L2 norm) to the loss function, preventing weights from ballooning and over-relying on single inputs.' },
        { id: 'aiml_q1_8', question: 'What does the transpose of a matrix A (written A^T) accomplish?', options: ['Inverts the matrix elements', 'Swaps the row indices and column indices of the matrix', 'Resets matrix elements to 0', 'Multiplies elements by -1'], correctAnswer: 1, explanation: 'Transposition flips a matrix over its diagonal, converting its columns to rows and rows to columns.' },
        { id: 'aiml_q1_9', question: 'What does Gradient Descent attempt to accomplish during neural network training?', options: ['To increase loss metrics', 'To iteratively update weights in the direction of steepest descent to minimize cost function outputs', 'To compile code packages', 'To serialize models'], correctAnswer: 1, explanation: 'Gradient descent computes derivative weights to step values towards local minima, optimizing predictive performance.' },
        { id: 'aiml_q1_10', question: 'What is a Standard Normal Distribution?', options: ['A distribution with mean = 1 and std = 1', 'A symmetric Gaussian distribution centered with mean = 0 and standard deviation = 1', 'A linear distribution', 'An exponential curve'], correctAnswer: 1, explanation: 'The standard normal distribution is a bell curve with a center of zero and standard deviation dispersion factor of one.' }
      ]
    }
  ],
  'Data Analytics': [
    {
      id: 'da_mod_1',
      title: 'SQL Queries, Aggregations, & Joins',
      description: 'Master advanced database queries, GROUP BY operations, aggregate functions, and multi-table JOINs.',
      baseDuration: 7,
      skillsCovered: ['sql', 'queries', 'joins', 'aggregations'],
      tasks: [
        { id: 'da_t_1', title: 'Write SQL queries using INNER, LEFT, RIGHT, and FULL OUTER JOINS', difficulty: 'beginner', learningResources: [{ title: 'SQL Joins Explained', url: 'https://www.w3schools.com/sql/sql_join.asp', type: 'article' }] },
        { id: 'da_t_2', title: 'Analyze sample databases using aggregate functions (SUM, AVG, COUNT, GROUP BY, HAVING)', difficulty: 'intermediate', learningResources: [{ title: 'SQL Aggregations', url: 'https://mode.com/sql-tutorial/sql-aggregate-functions/', type: 'tutorial' }] }
      ],
      quizzes: [
        { id: 'da_q1_1', question: 'Which JOIN returns all records when there is a match in either left or right table?', options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'], correctAnswer: 3, explanation: 'FULL OUTER JOIN returns all matching and unmatching records from both tables.' },
        { id: 'da_q1_2', question: 'Which keyword filters records after they have been aggregated with GROUP BY?', options: ['WHERE', 'HAVING', 'FILTER', 'LIMIT'], correctAnswer: 1, explanation: 'HAVING filters aggregated output, whereas WHERE filters raw rows before aggregation.' },
        { id: 'da_q1_3', question: 'What function counts only the unique occurrences of database column entries?', options: ['COUNT(*)', 'COUNT(DISTINCT column)', 'SUM(column)', 'GROUP_COUNT(column)'], correctAnswer: 1, explanation: 'COUNT(DISTINCT column) removes duplicate values before compiling the count.' },
        { id: 'da_q1_4', question: 'What does primary key validation guarantee in SQL databases?', options: ['Speedy encryption', 'Entity uniqueness and non-null values', 'Automatic indexation deletion', 'Foreign mapping constraints'], correctAnswer: 1, explanation: 'A primary key is a unique key containing only distinct entries, which cannot hold null entries.' },
        { id: 'da_q1_5', question: 'Which command organizes queries by column values in descending order?', options: ['SORT DESC', 'ORDER BY column DESC', 'GROUP BY column DESC', 'SEQUENCE column DOWN'], correctAnswer: 1, explanation: 'ORDER BY column DESC is the standard SQL syntax to sorting records in descending order.' },
        { id: 'da_q1_6', question: 'What is a SQL Window Function?', options: ['A function that adjusts the command window size', 'An analytical function that executes calculations across a set of table rows related to the current row, without collapsing the individual rows', 'A database cleanup function', 'An index creation method'], correctAnswer: 1, explanation: 'Window functions (like OVER(PARTITION BY...)) perform aggregations across partition frames while keeping row structural integrity.' },
        { id: 'da_q1_7', question: 'What is the primary difference between ROW_NUMBER() and DENSE_RANK()?', options: ['ROW_NUMBER increments sequentially without duplicates; DENSE_RANK assigns duplicate values to matching values without skipping rank integers.', 'ROW_NUMBER is faster.', 'ROW_NUMBER is for strings; DENSE_RANK is for integers.', 'No difference.'], correctAnswer: 0, explanation: 'ROW_NUMBER always increments sequential integers (1, 2, 3...); DENSE_RANK assigns equal rank to duplicates without leaving gaps (1, 2, 2, 3).' },
        { id: 'da_q1_8', question: 'What does a SQL Common Table Expression (CTE) accomplish?', options: ['Encrypts table rows', 'Defines a temporary, named result set that exists strictly within the context of a single query command (WITH clause)', 'Creates databases', 'Injects foreign mappings'], correctAnswer: 1, explanation: 'CTEs declare highly readable, temporary structured results using WITH clauses, replacing complex nested queries.' },
        { id: 'da_q1_9', question: 'How is a SQL Database Index optimized?', options: ['Compressing data byte sizes', 'Using B-Tree structures to bypass full sequential table scans and locate rows in log time', 'Auto-deleting NULL elements', 'Hashing all character values'], correctAnswer: 1, explanation: 'Indexes create structured lookup trees (typically B-Trees), enabling data engines to fetch matching records in O(log N) instead of O(N) table scans.' },
        { id: 'da_q1_10', question: 'What is relational Third Normal Form (3NF) structural state?', options: ['Having no duplicate keys', 'A table in 2NF containing zero transitive dependencies between non-primary key attributes', 'A database with multiple indexations', 'A single document array'], correctAnswer: 1, explanation: '3NF ensures that all non-key columns depend strictly on the primary key, eliminating transitive redundancy.' }
      ]
    }
  ]
};

// Helper: fallback templates if domain isn't fully expanded
const getFallbackModules = (domain) => {
  return [
    {
      id: `${domain.toLowerCase()}_mod_1`,
      title: `${domain} Foundations & Tooling Setup`,
      description: `Get familiar with core paradigms, environmental configuration, and main CLI tooling for ${domain}.`,
      durationDays: 5,
      tasks: [
        { id: `${domain.toLowerCase()}_t_1`, title: `Install required compilers, IDE dependencies, and verify CLI path configuration`, difficulty: 'beginner', learningResources: [{ title: 'Getting Started Guide', url: 'https://google.com', type: 'search' }] },
        { id: `${domain.toLowerCase()}_t_2`, title: `Build and run a localized 'Hello World' shell program validating compilation`, difficulty: 'beginner', learningResources: [{ title: 'Verify Syntax', url: 'https://google.com', type: 'search' }] }
      ],
      quizzes: [
        { id: `${domain.toLowerCase()}_q1_1`, question: `What is the first step in starting a new ${domain} path?`, options: ['Writing production code', 'Installing and verifying localized environment tooling', 'Deploying to servers', 'Taking certifications'], correctAnswer: 1, explanation: 'Validating compiler installation guarantees stable compilation.' },
        { id: `${domain.toLowerCase()}_q1_2`, question: `What standard script validates compiler installations?`, options: ['Hello World printout', 'Complex network requests', 'Database connection queries', 'Memory leak runs'], correctAnswer: 0, explanation: 'Simple Hello World logs prove execution pipelines function.' },
        { id: `${domain.toLowerCase()}_q1_3`, question: `How do you handle workspace problems?`, options: ['Give up', 'Verify environment variables and path setups', 'Reset operating system', 'Delete IDE'], correctAnswer: 1, explanation: 'PATH configs resolve the majority of terminal execution issues.' },
        { id: `${domain.toLowerCase()}_q1_4`, question: `Why are structure paradigms helpful?`, options: ['They slow down builds', 'They provide common models and structure for scalability', 'They bypass security limits', 'They replace package managers'], correctAnswer: 1, explanation: 'Architectures standardize design, making project code collaborative and robust.' },
        { id: `${domain.toLowerCase()}_q1_5`, question: `What helps speed up domain learning velocity?`, options: ['Skipping exercises', 'Consistent daily practice and concept quizzes', 'Watching videos on 3x speed', 'Copying answers blindly'], correctAnswer: 1, explanation: 'Frequent recall quizzes reinforce retention and strengthen pathways.' },
        { id: `${domain.toLowerCase()}_q1_6`, question: 'Which study method is most effective for long-term skill retention?', options: ['Cramming before assessments', 'Spaced repetition combined with active retrieval practice', 'Reading documentation passively', 'Relying solely on AI tool outputs'], correctAnswer: 1, explanation: 'Spaced repetition and active recall strengthen cognitive neural pathways, securing concepts in long-term memory.' },
        { id: `${domain.toLowerCase()}_q1_7`, question: 'What is a critical component of learning programming?', options: ['Memorizing all syntax structures', 'Developing computational problem-solving and algorithmic thinking abilities', 'Buying the most expensive hardware laptop', 'Writing code only when fully inspired'], correctAnswer: 1, explanation: 'Algorithmic thinking is language-independent. Mastering logic constructs allows developers to quickly adapt to any tech stack.' },
        { id: `${domain.toLowerCase()}_q1_8`, question: 'What does active coding (hands-on practice) build over passive reading?', options: ['Higher syntax speeds', 'Contextual pattern recognition and muscle memory for debugging codebase errors', 'More social followers', 'Bigger file sizes'], correctAnswer: 1, explanation: 'Failing, parsing error logs, and compiling code builds essential debugging patterns that cannot be absorbed passively.' },
        { id: `${domain.toLowerCase()}_q1_9`, question: 'How should you approach complex technical problems?', options: ['Write massive block modules blindly', 'Break down the task into smaller, isolated, and highly testable sub-problems', 'Avoid changing paths', 'Restart immediately'], correctAnswer: 1, explanation: 'Decomposition isolates issues, reducing structural cognitive load and making it straightforward to test and verify solutions.' },
        { id: `${domain.toLowerCase()}_q1_10`, question: 'What does modularity mean in codebase architectures?', options: ['Writing all functions in one large text file', 'Structuring code into distinct, highly focused, and loosely coupled independent modules', 'Restricting folder permissions', 'Removing documentation files'], correctAnswer: 1, explanation: 'Modular programs isolate scope, making code reusable, understandable, and highly maintainable.' }
      ]
    }
  ];
};

/**
 * Generates a highly personalized roadmap.
 * @param {object} params User preferences
 * @returns {object} Roadmap structure
 */
export const generateRoadmapData = (params) => {
  const { domain, careerGoal, skillLevel, dailyStudyTime, interests = [], existingSkills = [] } = params;

  // Retrieve base curriculum for the selected domain, or use fallback
  const baseCurriculum = DOMAIN_CURRICULA[domain] || getFallbackModules(domain);
  const normalizedExistingSkills = existingSkills.map(s => s.toLowerCase().trim());

  // Deep clone to safely manipulate elements
  const adaptedModules = JSON.parse(JSON.stringify(baseCurriculum));

  let totalTasks = 0;
  let preCompletedTasks = 0;

  adaptedModules.forEach(mod => {
    // 1. Adapt Duration based on daily study time (higher study time = shorter duration)
    // 2 hours/day is the standard baseline (1.0 factor)
    const timeFactor = 2 / Math.max(0.5, dailyStudyTime);
    mod.durationDays = Math.ceil(mod.baseDuration ? mod.baseDuration * timeFactor : 5 * timeFactor);

    // Draw exactly 5 randomized questions from the expanded 10-question master pool!
    mod.quizzes = getRandomSubset(mod.quizzes, 5);

    // 2. Process tasks and existing skills matching
    mod.tasks.forEach(task => {
      totalTasks++;

      // Check if task is covered by existing skills
      const hasSkill = normalizedExistingSkills.some(skill => {
        // If skill name matches title keywords or the module covered skills
        return task.title.toLowerCase().includes(skill) || 
               (mod.skillsCovered && mod.skillsCovered.includes(skill));
      });

      if (hasSkill) {
        task.completed = true;
        preCompletedTasks++;
      }

      // 3. Customize task instructions for career goals or skill level
      if (skillLevel === 'advanced') {
        task.title = `[Advanced Integration] ${task.title} with security hardening & load profiling`;
        task.difficulty = 'advanced';
      } else if (skillLevel === 'intermediate') {
        task.difficulty = 'intermediate';
      }
    });

    // 4. Inject specific interest-based project challenges
    if (interests.length > 0) {
      const primaryInterest = interests[0];
      const interestTask = {
        id: `${mod.id}_interest_challenge`,
        title: `Implement custom ${primaryInterest}-themed exercise validating module core topics`,
        completed: false,
        difficulty: skillLevel,
        learningResources: [{
          title: `Project idea: Build a personalized ${primaryInterest} prototype`,
          url: 'https://github.com',
          type: 'project'
        }]
      };
      mod.tasks.push(interestTask);
      totalTasks++;
    }
  });

  // Calculate starting progress based on pre-completed existing skills
  const progress = totalTasks > 0 ? Math.round((preCompletedTasks / totalTasks) * 100) : 0;

  return {
    domain,
    careerGoal,
    skillLevel,
    dailyStudyTime,
    interests,
    existingSkills,
    progress,
    completedTasksCount: preCompletedTasks,
    weakAreas: [],
    modules: adaptedModules
  };
};

// Share Master curricula config structure for runtime endpoints
export { DOMAIN_CURRICULA, getFallbackModules };
