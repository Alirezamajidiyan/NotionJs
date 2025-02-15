# react-notionjs

A lightweight notification library for React.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install the package via npm:

```bash
npm install react-notionjs
```

Make sure you have `react` as a peer dependency:

```bash
npm install react
```

## Usage

Here is a simple example of how to use `react-notionjs`:

1. Basic Setup
First, import the library into your project and wrap your main component with the
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NotificationProvider } from "react-notionjs";
import "react-notionjs/dist/styles.css"; // Default styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NotificationProvider>
    <App />
  </NotificationProvider>
);
```
2. Displaying Notifications
To display notifications, use the useNotification hook:

```jsx
import React from "react";
import { useNotification } from "react-notionjs";

const App = () => {
  const { addNotification } = useNotification();

  const showNotification = () => {
    addNotification({
      type: "success", // Notification type (success, error, warning, info, alert)
      message: "This is a success message!",
      duration: 3000, // Display duration in milliseconds
      dismissible: true, // Allow manual dismissal
      style: "default", // Style (default, outlined, filled)
    });
  };

  return (
    <div>
      <button onClick={showNotification}>Show Notification</button>
    </div>
  );
};

export default App;

```



- `message` (string): The message to display in the notification.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.