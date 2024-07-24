import { useEffect, useState } from "react";
import { api } from "../../api/api";
import Card from "../card";
interface ParkingSlot {
    id_estacionamiento: number;
    disponible: boolean;
}

export default function Reservation() {
    const [parkingSlot, setParkingSlot] = useState<ParkingSlot[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedParking, setSelectedParking] = useState<number | null>(null);

    useEffect(() => {
        getParking();
    }, []);

    const getParking = async () => { 
        const resp = await api.get(`${import.meta.env.VITE_API_URL}estacionamiento`);
        console.log(resp.data);
        setParkingSlot(resp.data);
    };

    const parkingRows = [];
    for (let i = 0; i < parkingSlot.length; i += 5){
        parkingRows.push(parkingSlot.slice(i, i + 5));
    }

    const handleClick = (id: number) => {
        setSelectedParking(id);
        setShowModal(true);
    }

    const reloadParkingSlots = () => {
        getParking();
    }

    const availableParkingSlots = parkingSlot.filter(slot => slot.disponible);
    const unavailableParkingSlots = parkingSlot.filter(slot => !slot.disponible);

    return (
        <>
            <h2 style={{textAlign: 'center'}}>Estacionamientos</h2>
            <div style={{textAlign: 'center', marginBottom: '20px'}}>
                <span style={{marginRight: '15px'}}>Disponibles: {availableParkingSlots.length}</span>
                <span>No Disponibles: {unavailableParkingSlots.length}</span>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column', 
                flexWrap: 'wrap', 
                maxWidth: '500px',
                margin: '0 auto',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}>     
                {parkingRows.map((row, rowIndex) => (
                    <div key={rowIndex} style={{display: 'flex', flexDirection: 'row'}}>
                        {row.map((parking) => (
                            <div 
                                key={parking.id_estacionamiento} 
                                onClick={() => parking.disponible && handleClick(parking.id_estacionamiento)}
                                style={{
                                    cursor: parking.disponible ? 'pointer' : 'not-allowed',
                                    background: parking.disponible ? '#90EE90' : '#FF6347',
                                    margin: '10px',
                                    width: '80px',
                                    height: '80px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid black',
                                    borderRadius: '20px'
                                }}
                            >
                                <h2>{parking.id_estacionamiento}</h2>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {showModal && <Card parkingId={selectedParking} setShowModal={setShowModal} onReservationSuccess={reloadParkingSlots}/>}
        </>
    )
}
