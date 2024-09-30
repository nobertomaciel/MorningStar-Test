import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

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
            <button onClick={handleClick} style={{background: isVisible ? 'red' : 'green'}}>
                {idProduct} {isVisible ? 'hide' : 'show'}
            </button>
            {isVisible && (
                <Chart width='700px' height='300px' style={{position:'absolute', left:'150px', top:'100px', background: '#fff'}} type="bar" data={chartData} options={chartOptions}/>
            )}
        </div>
    );
}

export default Grafico;
