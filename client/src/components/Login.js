import NavBar from "./NavBar"

function Login () {

    return (
        <div>
            <NavBar />
            <div className="Login">
                <form className="LoginForm">
                    <input placeholder="Username"></input>
                    <input placeholder="Password"></input>
                </form>
            </div>
        </div>
    )
}

export default Login