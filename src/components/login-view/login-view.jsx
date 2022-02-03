import React from "react";

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useStat('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /** send a request to the server for authentication */
        /** then call props.onLoggedIn(username) */
        // props.onLoggedIn(username);
    };

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password: 
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
        </form>
    );
}