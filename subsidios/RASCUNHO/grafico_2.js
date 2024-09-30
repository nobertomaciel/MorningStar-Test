import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

function Grafico({idProduct}) {
    const [isVisible, setIsVisible] = useState(false);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

        useEffect(() => {
            const apiUrl = "http://localhost:5000/getmoviment";
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
            
            if(isVisible){

            let sendData = {
                id: idProduct
            };            
            async function getData() {
                const result = await fetch(apiUrl, {
                method: "POST",
                body: JSON.stringify(sendData),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
                });
                const getResult = await result.json();
                console.log(getResult);
            }
            getData();
            

            const data = {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
                datasets: [
                    {
                        label: 'Entradas',
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: 'Saídas',
                        backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                        borderColor: documentStyle.getPropertyValue('--pink-500'),
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            };
            const options = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
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
        }, []);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="card">
            <button onClick={handleClick} style={{background: isVisible ? 'red' : 'green'}}>{idProduct} {isVisible ? 'hide' : 'show'}
            </button>
            {isVisible && (
                    <Chart style={{position:'absolute', left:'300px', top:'200px', background: 'white'}} type="bar" data={chartData} options={chartOptions}/>
            )}
        </div>
    )
}
export default Grafico;
