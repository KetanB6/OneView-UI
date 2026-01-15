import { useEffect, useState } from 'react';
import axios from "axios";

export const Navbar = () => {
    const [loading, setLoading] = useState(true);

    const healthCheck = async () => {
        try {
            const resp = await axios.get("https://oneview-g8eh.onrender.com/health");
            if (resp.data === "active") {
                setLoading(false);
            }
        } catch (err) {
            console.error("Health check failed:", err);
            // Optional: keep loading true or set an error state here
        }
    };

    // Use useEffect to run this once on mount, rather than calling it in the body
    useEffect(() => {
        healthCheck();
    }, []);

    return (
        <div className='navbar'>
            <div className='head'>OneView</div>
            <div className={`status_badge ${loading ? 'loading' : 'active'}`}>
                {loading ? "Server Connecting..." : "Server Active"}
            </div>
        </div>
    )
}

export default Navbar;