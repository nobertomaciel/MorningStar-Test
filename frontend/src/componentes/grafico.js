import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import ChartBtn from '../img/chart.svg';

function Grafico({idProduct}) {
    const apiUrl = "http://localhost:5000/getmoviment";
    const [isVisible, setIsVisible] = useState(false);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const [datasetsReturned, setdatasetsReturned] = useState(
        [
                {
                    label: 'Entradas',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: Array(12).fill(0)
                },
                {
                    label: 'Saídas',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: Array(12).fill(0)
                }
            ]
    );

    useEffect(() => {
        if (isVisible) {
            async function getData() {
                const result = await fetch(apiUrl + "/" + idProduct,  {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                });
                const getResult = await result.json();
                
                const saidas = Array(12).fill(0);
                const entradas = Array(12).fill(0);
                getResult.forEach(e => {
                    console.log("tipo"+e.type)
                    console.log("mês"+e.month)
                    console.log("quantidade"+e.quantity)
                    e.type == 1 ? entradas[e.month] = e.quantity : saidas[e.month] = e.quantity;
                });

                console.log(getResult);

                setdatasetsReturned(
                    [   
                        {
                            label: "Entradas",
                            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                            borderColor: documentStyle.getPropertyValue('--blue-500'),
                            data: entradas
                        },
                        {
                            label: 'Saídas',
                            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                            borderColor: documentStyle.getPropertyValue('--pink-500'),
                            data: saidas
                        }
                    ]
                );
            }
            getData();

            const data = {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: datasetsReturned
            };
            const options = {
                maintainAspectRatio: false,
                aspectRatio: 1,
                plugins: {
                    legend: {
                        labels: {
                            fontColor: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };

            setChartData(data);
            setChartOptions(options);
        }
    }, [isVisible, idProduct]);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="card">
        {/* <div className="card" style={{width: '100%', height: '100%'}}> */}
            {/* <button className='chartButton' onClick={handleClick} style={{background: isVisible ? 'red' : 'green'}}> */}
            <button onClick={handleClick} style={{backgroundColor: 'rgba(0,0,0,0)', backgroundImage: `url(${ChartBtn})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', margin: 'auto', height: '20px', width: '20px', border: 'none'}}>
                
            </button>
            {isVisible && (
                <div className='modalChart2'>
                {/* <div style={{position: 'absolute', margin: 0, left: 0, top: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.3)'}}> */}
                <div className='modalChart3'>
                    {/* <div style={{position: 'relative', padding:'20px', borderRadius: '5px', width: '70%', height: '70%', background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> */}
                        <svg onClick={handleClick} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="closeIcon p-icon p-dialog-header-close-icon" aria-hidden="true" data-pc-section="closebuttonicon"><path d="M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z" fill="currentColor"></path></svg>
                        <Chart className='chartCanvas' type="bar" data={chartData} options={chartOptions}/>
                        {/* <Chart width='90%' height='90%' style={{position:'absolute', background: '#fff'}} type="bar" data={chartData} options={chartOptions}/> */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Grafico;
