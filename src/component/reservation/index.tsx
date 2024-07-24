import { useEffect, useState } from "react";
import { api } from "../../api/api";

interface ParkingSlot {
    id_estacionamiento: number;
}

export default function Reservation() {
    const [parkingSlot, setParkingSlot] = useState<ParkingSlot[]>([]);

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

    return (
        
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
                <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row' }}>
                    {row.map((parking) => (
                        <div key={parking.id_estacionamiento} style={{background:'green', margin: '10px', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid black',  borderRadius: '20px'}}>
                            <h2>{parking.id_estacionamiento}</h2>
                        </div>
                    ))}
                </div>
            ))}
        </div>

    )
}
