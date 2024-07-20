import Sidebar from "../../components/Home_comp/Sidebar"
import MessageContainer from "../../components/Home_comp/MessageContainer"

function Home() {
    return (
        <div className="blog-title h-screen flex items-center justify-center ">
            <div className="login-box sm:h-[450px] md:h-[700px] flex overflow-hidden bg-white">
                <Sidebar />
                <MessageContainer />
            </div>
        </div>
    )
}

export default Home;