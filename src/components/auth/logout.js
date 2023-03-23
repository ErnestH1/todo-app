import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Logout() {
  const history = useHistory();

  useEffect(() => {
    // Call your logout API or clear user token from local storage
    // ...

    // Redirect to login page
    history.push("/login");
  }, [history]);

  return null;
}

export default Logout;
