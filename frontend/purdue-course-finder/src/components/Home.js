import logo from '../logo.svg';
import "../App.css";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>This is the default home page, it will be replaced when the maps tasks are implemented.</h2>
        <h4>Quick links to some pages:</h4>
        <form action="/login">
          <input type="submit" value="Login Page" />
        </form>
        <form action="/signup">
          <input type="submit" value="Signup Page" />
        </form>
        <form action="/tutorial">
          <input type="submit" value="Tutorial Page" />
        </form>
        <form action="/deleteacct">
          <input type="submit" value="Delete Account Page" />
        </form>
        <form action="/modifyAccount">
          <input type="submit" value="Modify Account Page" />
        </form>
        <form action="/courses">
          <input type="submit" value="Courses Page" />
        </form>
      </header>
    </div>
  );
}

export default Home;