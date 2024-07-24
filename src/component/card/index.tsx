
import { api } from "../../api/api";

interface CardProps {
    parkingId: number | null;
    setShowModal: (show: boolean) => void;
    onReservationSuccess: ()=> void;
}

export default function Card({parkingId, setShowModal, onReservationSuccess}: CardProps){ 
    
    const handleClose = () => {
        setShowModal(false);
    }

    const handleReserve = async() => {
        console.log();
        try{
            const response = await api.put(`http://localhost:3000/reservar`, {id_estacionamiento: parkingId});
            console.log(response);
            onReservationSuccess();
        }catch(error){
            console.log(error);
        
        }
    }

    return (
        <div onClick={() => handleClose()} className="modal">
            <div className="modal-content">
                <h2 className="title-modal">Estacionamiento {parkingId} </h2>
                <button onClick={handleReserve}>Reservar</button>
            </div>
        </div>
    );
}