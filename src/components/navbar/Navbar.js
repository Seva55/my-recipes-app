import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.scss';



const Navbar = (props) => {
    const {fire} = props;
    const [user, setUser] = React.useState('');

    const handleLogout = () => {
        fire.auth().signOut().then(() => setUser(""));
    };

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if(user){
                setUser(user);
            }else {
                setUser("");
            }
        })
    };

    React.useEffect(() => {
        if (fire) {
            authListener();
        }
    }, [fire]);

    return (
        <div className='navbar'>
            <div className='navbar-heading'>
                <h1>My Recipes <span>App</span></h1>
            </div>
            <div className='navbar-links'>
                <ul>
                    <Link to='/homePage'><li>Home</li></Link>
                    <Link to='/categories'><li>Categories</li></Link>
                    <Link to='/create'><li>Cacca</li></Link>
                    <Link to='/random'><li>Random</li></Link>
                    {!user ? <Link to='/login'>Login</Link> : <button onClick={handleLogout}>Logout</button>}
                  
                </ul>
            </div>
        </div>
    )
}

export default Navbar;