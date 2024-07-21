import { CiLogout } from "react-icons/ci";
import useLogout from "../../hooks/useLogout";

function LogoutBtn () {

    const {logout} = useLogout();

    return (
        <div>
            <button type="submit" onClick={logout} className="absolute text-green-800 flex items-center pe-3">
                    <CiLogout className="w-8 relative top-10 left-10 h-8"/>
            </button>
        </div>
    )
}

export default LogoutBtn;