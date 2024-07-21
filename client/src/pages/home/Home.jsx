import Sidebar from "../../components/Home_comp/Sidebar"
import MessageContainer from "../../components/Home_comp/MessageContainer"
import LogoutBtn from "../../components/Home_comp/LogoutBtn"

function Home() {
    return (
        <div>
            <LogoutBtn />
            <div className="blog-title h-screen flex items-center justify-center ">
                <div className="login-box sm:h-[450px] md:h-[700px] w-auto flex overflow-hidden bg-white">
                    <Sidebar />
                    <MessageContainer />
                </div>
            </div>
        </div>
    )
}

export default Home;