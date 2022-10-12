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
        <form action="/subjects">
          <input type="submit" value="Subjects" />
        </form>

      </header>
    </div>
  );
}

export default Home;