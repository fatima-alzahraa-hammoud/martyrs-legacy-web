import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <aside>
            <nav>
                <ul>
                    <li><Link to="/martyrs">الشهداء</Link></li>
                    <li><Link to="/wills">الوصايا</Link></li>
                    <li><Link to="/stories">القصص</Link></li>
                    <li><Link to="/interviews">المقابلات</Link></li>
                    <li><Link to="/media">الوسائط</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;