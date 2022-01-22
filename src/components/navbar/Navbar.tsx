import React, { FC } from "react";
import { NavLink } from "react-router-dom";

interface RouteConfig {
    link: string;
    label: string;
}

const Navbar: FC = () => {
    const routes: RouteConfig[] = [
        {
            link: "/movies",
            label: "Movies",
        },
        {
            link: "/sandbox",
            label: "Sandbox",
        },
    ];

    return (
        <nav className="navbar m-3 p-0 border-bottom">
                <div className="d-flex border-0">
                    {routes.map((route) => {
                        return (
                            <NavLink
                                key={route.link}
                                to={route.link}
                                className="nav-link border" //rounded-top
                            >
                                {route.label}
                            </NavLink>
                        );
                    })}
                </div>
        </nav>
    );
};

export default Navbar;