import {React} from 'react'
import { Link } from 'react-router-dom'
// import { Grid, Button } from '@mui/material'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'

function Navbar({ fixed }) {
    // const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>
            <nav className="sticky top-0 z-99 flex flex-wrap items-center px-2 py-1 bg-gray-700 mb-3">
                <div className="container px-4 mx-auto flex flex-wrap items-center">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a
                            className="justify-start text-sm font-bold leading-relaxed inline-block whitespace-nowrap uppercase text-white"
                            href="#pablo"
                        >
                            <EmojiObjectsIcon className="flex items-center text-xs" />
                            <span className="ml-2">Light It Up!</span>
                        </a>
                        {/* <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button> */}
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center"

                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="nav-item">
                                <Link to="/nodes"
                                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                                    href="#pablo"
                                >
                                    Area Name |
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                                    href="#pablo"
                                >
                                    LOGOUT
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar
