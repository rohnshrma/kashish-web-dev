import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

// Shown when a loader/action throws or a component crashes (errorElement).
const ErrorPage = () => {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} - ${error.data}` // e.g. 404 - Product not found
    : "Something went wrong";

  return (
    <div>
      <h1>Oops</h1>
      <p>{message}</p>
      <Link to="/">Go home</Link>
    </div>
  );
};

export default ErrorPage;
