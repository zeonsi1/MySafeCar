
function Reservation() {
    // Paso 1: Definir el estado inicial del estacionamiento como un arreglo bidimensional 5x5
    // Cada espacio de estacionamiento inicialmente está disponible (false)
    const initialParking = Array(5).fill(null).map(() => Array(5).fill(false));

    return (
        <div>
            {initialParking.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {row.map((space, colIndex) => {
                        // Calcula el número para cada cuadrado
                        const number = rowIndex * 5 + colIndex + 1;
                        return (
                            <div
                                key={colIndex}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    border: '1px solid black',
                                    backgroundColor: space ? 'red' : 'green',
                                    margin: '2px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '20px'
                                }}
                            >
                                {/* Muestra el número dentro del cuadrado */}
                                <p style={{ margin: 0 }}>{number}</p>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default Reservation;