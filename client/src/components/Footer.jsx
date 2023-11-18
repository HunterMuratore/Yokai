import React from 'react';

function Footer() {
    const date = new Date();

    return (
        <>


            <footer className="footer mt-auto m-2 text-center">
            <hr className="mx-auto divider"></hr>
                <p className="copyright mb-1">&copy; {date.getFullYear()}</p>
                <p className="mb-1">
                    <span className="d-none d-sm-inline">Developed by Group 2</span>
                    <span className="d-inline d-sm-none">Dev'd by Group 2</span>
                </p>
                <div className="d-flex align-items-center mb-1">
                    <a href="https://github.com/Kev-Castro" target="_blank" rel="noopener noreferrer" className="text-dark me-3">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://github.com/Kev-Castro" target="_blank" rel="noopener noreferrer" className="text-dark me-3">
                        <i className="fab fa-facebook"></i>

                    </a>
                    <a href="https://github.com/Kev-Castro" target="_blank" rel="noopener noreferrer" className="text-dark ">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </footer>
        </>
    );
}

export default Footer;
