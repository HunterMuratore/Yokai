import { NavLink } from 'react-router-dom'

function NotFound () {
    return (
        <section className="d-flex flex-column justify-content-center mx-auto my-auto align-items-center">
            <h1 className="text-center text-2xl font-bold mt-5">Page Not Found!</h1>
            <h2 className="text-center text-xl font-bold mt-5">It seems you've lost your way.</h2>
            <h2 className="text-center text-xl font-bold mt-2">Click here to be escorted home.</h2>
            <NavLink to="/"><button className="my-btn text-sm py-2 px-3 rounded mt-3">Return Home</button></NavLink>
        </section>
    )
}


export default NotFound