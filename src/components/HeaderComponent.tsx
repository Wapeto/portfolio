import React from "react";
import {Link} from "react-router-dom";

const HeaderComponent: React.FC = () => (
    <header>
        <form name="lang" method="get">
            <select name="lang" id="lang">
                <option value="en">EN</option>
                <option value="fr">FR</option>
            </select>
        </form>
        <Link to={"contact/"}> Contact </Link>
    </header>
);

export default HeaderComponent;