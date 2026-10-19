# Context API (explained using our To-Do List app)

## First, the problem

In our to-do app we have these components:

```
App
├── Header
├── AddTask        (needs to ADD a task)
└── TaskList       (needs to SHOW tasks)
    └── Task       (needs to DELETE a task)
```

All the tasks live in one array. And three different components need to touch that array:

- `AddTask` wants to put a new task in it
- `TaskList` wants to read it and show it
- `Task` wants to remove one from it

So where do we keep the array? It has to sit somewhere that all of them can reach. In the old code, that place was `App`. And the only way `App` could hand things down was **props**.

---

## Before Context (the old code, using props)

### App.jsx (old)

`App` was doing everything. It held the tasks, it had the add function, it had the remove function, and it passed all of them down by hand.

```jsx
const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTaskHandler = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };
  const removeTaskHandler = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <Header />
      <AddTask onAdd={addTaskHandler} />
      <TaskList onRemove={removeTaskHandler} tasks={tasks} />
    </div>
  );
};
```

### AddTask.jsx (old)

```jsx
const AddTask = (props) => {
  ...
  props.onAdd(newTask);
  ...
};
```

### TaskList.jsx (old)

Look at this one closely. `TaskList` takes `onRemove` but **never uses it itself**. It only takes it so it can pass it on to `Task`.

```jsx
const TaskList = ({ tasks, onRemove }) => {
  return (
    <div>
      {tasks.map((taskObj) => (
        <Task onRemove={onRemove} task={taskObj} key={taskObj.id} />
      ))}
    </div>
  );
};
```

### Task.jsx (old)

```jsx
const Task = ({ task, onRemove }) => {
  return (
    ...
    <button onClick={() => onRemove(task.id)}>Delete</button>
  );
};
```

### What was annoying here

Follow the delete function on its journey:

```
App  --onRemove-->  TaskList  --onRemove-->  Task  (finally uses it)
```

`TaskList` is just a middleman. It's like asking your friend to pass a note to someone at the back of the class. Your friend doesn't care what the note says, they're just passing it along.

This is called **prop drilling**. With 3 levels it's fine. But imagine 6 or 7 levels deep. Every component in the middle has to accept the prop and pass it down, even if it doesn't care about it. Rename one prop and you're editing 5 files.

---

## So what is Context?

Think of Context like a **water tank on the roof of a building**.

Without a tank, if someone on the 4th floor wants water, it has to be carried bucket by bucket from the ground floor, passed from floor 1 to floor 2 to floor 3 to floor 4. That's props.

With a tank on the roof, every flat just has a tap. Whoever needs water opens their own tap. Nobody in between has to carry anything.

In React terms:

- **The tank** = the Context (it holds `tasks`, `addTaskHandler`, `removeTaskHandler`)
- **Installing the tank over the building** = wrapping the app in a `Provider`
- **Opening a tap** = calling `useContext(TaskContext)` inside any component

That's honestly all it is. A shared box of data that any component inside it can grab from directly.

---

## After Context (the new code)

### Step 1: Make the tank (TaskContext.jsx)

We took all the task stuff **out of App** and moved it into its own file.

```jsx
import { createContext, useState } from "react";

const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTaskHandler = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };
  const removeTaskHandler = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTaskHandler, removeTaskHandler }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
```

Three things are happening here:

1. `createContext()` makes an empty box called `TaskContext`.
2. `TaskContextProvider` is a normal component. It has the `useState` and the two functions, same as App had before.
3. `<TaskContext.Provider value={...}>` puts those three things into the box. Whatever you put in `value` is what everyone else can take out.

And what's `{children}`? It just means "whatever I wrap you around, show that". So if we wrap `<App />` with it, `App` is the children.

### Step 2: Put the tank over the building (main.jsx)

```jsx
createRoot(document.getElementById("root")).render(
  <TaskContextProvider>
    <App />
  </TaskContextProvider>,
);
```

Now `App` and **everything inside App** (AddTask, TaskList, Task, all of them) can reach the box.

Important: a component can only use the context if it's **inside** the Provider. If it's outside, it gets nothing.

### Step 3: App becomes clean (App.jsx)

```jsx
const App = () => {
  return (
    <div className="App">
      <Header />
      <AddTask />
      <TaskList />
    </div>
  );
};
```

No `useState`. No functions. No props. App just lays out the page now. That's its only job.

### Step 4: Each component opens its own tap

**AddTask.jsx** only needs the add function:

```jsx
const { addTaskHandler } = useContext(TaskContext);
...
addTaskHandler(newTask);
```

**TaskList.jsx** only needs the tasks:

```jsx
const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div>
      {tasks.map((taskObj) => (
        <Task task={taskObj} key={taskObj.id} />
      ))}
    </div>
  );
};
```

Notice `onRemove` is gone. TaskList is not a middleman anymore.

**Task.jsx** grabs the remove function itself:

```jsx
const Task = ({ task }) => {
  const { removeTaskHandler } = useContext(TaskContext);
  ...
  <button onClick={() => removeTaskHandler(task.id)}>Delete</button>
};
```

We still pass `task` as a prop here, and that's fine. Each `Task` shows a different task, so the parent telling it "you are this one" makes sense. Context is for shared stuff, not for everything.

---

## Side by side comparison

| | Before (props) | After (Context) |
|---|---|---|
| Where tasks live | Inside `App` | Inside `TaskContextProvider` (its own file) |
| What App does | Holds state, has functions, passes props | Just shows the layout |
| How AddTask gets the add function | `props.onAdd` from App | `useContext(TaskContext)` |
| How TaskList gets tasks | `tasks` prop from App | `useContext(TaskContext)` |
| How Task gets delete | App → TaskList → Task (2 hops) | Takes it directly with `useContext` |
| Does TaskList carry stuff it doesn't use? | Yes, `onRemove` | No |
| Files touched to rename a function | App, TaskList, Task, AddTask | TaskContext + the one place that uses it |
| Extra setup needed | None | `createContext`, a Provider, wrap in `main.jsx` |

### The data flow, drawn out

**Before:**

```
            App (tasks, add, remove)
           /                      \
   onAdd  /                        \  tasks, onRemove
         v                          v
     AddTask                    TaskList
                                    |
                                    |  onRemove  (just passing it on)
                                    v
                                  Task
```

**After:**

```
        TaskContextProvider (tasks, add, remove)
                     |
                    App   (doesn't care, just layout)
           ..........|...........
           :         :          :
       AddTask    TaskList     Task
     (takes add) (takes tasks) (takes remove)
```

The dotted lines mean "reaches up and grabs it directly". Nobody passes anything by hand.

---

## When should I use Context, and when are props enough?

Use **props** when:
- the data only goes down one or two levels
- it's something specific to that one child (like which `task` a `Task` should show)

Use **Context** when:
- many components in different places need the same data
- you notice components passing props they don't even use (prop drilling)
- it's "app-wide" stuff, like the logged-in user, theme (dark/light), language, or a cart

One honest downside: when the value in the Provider changes, every component using that context re-renders. For a small to-do app that doesn't matter at all. For big apps people split things into multiple contexts, but don't worry about that yet.

---

## The 3 things to remember

1. **`createContext()`** makes the box.
2. **`<Something.Provider value={...}>`** fills the box and wraps the components that are allowed to use it.
3. **`useContext(Something)`** opens the box from inside any of those components.

Make it, wrap it, use it. That's Context.
