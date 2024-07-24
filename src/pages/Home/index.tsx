import Reservation from "../../component/reservation";

export default function Home(){
    return (
        <>
            <header className="container-header">
                <h1>My Safe Car <span>by</span></h1>
            </header>
            <Reservation/>
        </>
    );
}
