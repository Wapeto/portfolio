import React from "react";

const HeaderComponent: React.FC = () => (
    <header>
        <form name="lang" method="get">
            <select name="lang" id="lang">
                <option value="en">EN</option>
                <option value="fr">FR</option>
            </select>
        </form>
        <a href={"#"}>Contact me</a>
    </header>
);

export default HeaderComponent;