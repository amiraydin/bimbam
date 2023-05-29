import React, { useEffect, useState } from 'react';
import tonImg from '../image/tondeuse40.png';
// import txtFile from '../files/order.txt';

export default function Tondeuse() {
    const [xcoor, setXcoor] = useState(null);
    const [ycoor, setYcoor] = useState(null);
    const [tondeuse, setTondeuse] = useState([]);
    const [surFace, setSurFace] = useState({ x: 0, y: 0 });
    function readFile(f) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const contenu = e.target.result;
            // the content has been read successfuly
            console.log('txtFile ', contenu);
            alert(contenu);
            analyseFile(contenu);
        }
        reader.readAsText(f);
    }
    useEffect(() => {
        console.log('surFace', surFace);
    }, [surFace]);
    function analyseFile(content) {
        if (!content) {
            alert("Le contenu du fichier est vide ou non défini.");
            return;
        }
        const ligns = content.split('\n');
        // lire les coordonnées du SurFace 
        const coordonDePremierLign = ligns[0].trim().split(' ');
        // console.log('coordonnées de premier ligns' + coordonDePremierLign);
        const coordoneX = parseInt(coordonDePremierLign[0]);
        const coordoneY = parseInt(coordonDePremierLign[1]);
        console.log('coorX', coordoneX);
        console.log('coorY', coordoneY);
        // updateSurFace(coordoneX, coordoneY);
        setSurFace(prev => ({ ...prev, x: coordoneX, y: coordoneY }));
        // terre(coordoneX, coordoneY);
        setXcoor(coordoneX);
        setYcoor(coordoneY);

        // Lire les informations des tondeuses
        const tondeuseData = [];
        let currentTondeuse = {
            x: '',
            y: '',
            orientation: '',
            instruction: []
        };
        for (let i = 1; i < ligns.length; i++) {
            const lign = ligns[i].trim();
            if (i % 2 !== 0) {
                const positionTond = lign.split(' ');
                const x = parseInt(positionTond[0]);
                const y = parseInt(positionTond[1]);
                const orientation = positionTond[2];
                currentTondeuse = { x: x, y: y, orientation: orientation };
            } else {
                const instruction = lign.split('');
                currentTondeuse.instruction = instruction;
                tondeuseData.push({ ...currentTondeuse });
                // console.log(instruction);
            }
            // console.log(`${i}`, lign);
        }
        // console.log('tond', tondeuseData);
        // console.log('surFace', surFace);
        for (let i = 0; i < tondeuseData.length; i++) {
            var tondeuse = tondeuseData[i]; // Récupérez la tondeuse à chaque itération
            // console.log('tondeuse', tondeuse);
            let mowerInstruction = tondeuse.instruction;
            // console.log('instru', mowerInstruction);
            let updateTond = [];
            for (let j = 0; j < mowerInstruction.length; j++) {
                switch (mowerInstruction[j]) {
                    case 'R':
                        updateTond = rotateRight(tondeuse);
                        // console.log('update orient right', updateTond);
                        tondeuse = updateTond;
                        break;
                    case 'L':
                        updateTond = rotateLeft(tondeuse);
                        // console.log('update orient left', updateTond);
                        tondeuse = updateTond;
                        break;
                    case 'F':
                        updateTond = moveForward(tondeuse, coordoneX, coordoneY);
                        // console.log('update orient forward', updateTond);
                        tondeuse = updateTond;
                        break;
                    default:
                        break;
                }
            }
            tondeuseData[i] = updateTond;
            // console.log("tondeuse update", updateTond);
        }
        console.log("tondeuse data", tondeuseData);
        setTondeuse(tondeuseData);

        // function updateSurFace(x, y) {
        //     setSurFace(prev => ({ ...prev, x: x, y: y }));
        //     console.log('surFace', surFace);
        // }

        function moveForward(tondeuse, xcoor, ycoor) {
            const { x, y, orientation } = tondeuse;
            let newX = x;
            let newY = y;
            switch (orientation) {
                case 'N':
                    newY = y + 1;
                    break;
                case 'E':
                    newX = x + 1;
                    break;
                case 'S':
                    newY = y - 1;
                    break;
                case 'W':
                    newX = x - 1;
                    break;
                default:
                    break;
            }
            if (newX <= xcoor && newY <= ycoor) {
                return ({ ...tondeuse, x: newX, y: newY });
            } else {
                return ({ ...tondeuse });
            }
        }
        function rotateLeft(tondeuse) {
            const { orientation } = tondeuse;
            let newOrient = '';
            switch (orientation) {
                case 'N':
                    newOrient = 'W'
                    break;
                case 'E':
                    newOrient = 'N'
                    break;
                case 'S':
                    newOrient = 'E'
                    break;
                case 'W':
                    newOrient = 'S'
                    break;
                default:
                    break;
            }
            return ({ ...tondeuse, orientation: newOrient });
        }
        function rotateRight(tondeuse) {
            const { orientation } = tondeuse;
            let newOrient = '';
            switch (orientation) {
                case 'N':
                    newOrient = 'E'
                    break;
                case 'E':
                    newOrient = 'S'
                    break;
                case 'S':
                    newOrient = 'W'
                    break;
                case 'W':
                    newOrient = 'N'
                    break;
                default:
                    break;
            }
            return ({ ...tondeuse, orientation: newOrient });
        }
    }
    // console.log("tond", tondeuse);
    // function executer(tondeuse) {
    //     const { instruction } = tondeuse;
    //     let updateTond = tondeuse;
    //     for (let i = 0; i < instruction.length; i++) {
    //         const instru = instruction[i];
    //         switch (instru) {
    //             case 'R':
    //                 updateTond = rotateRight(updateTond);
    //                 break;
    //             case 'L':
    //                 updateTond = rotateLeft(updateTond);
    //                 break;
    //             case 'F':
    //                 updateTond = moveForward(updateTond);
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    //     return updateTond;
    // }
    // function sequentiellement() {
    //     let miseAjour = [...tondeuse];
    //     for (let i = 0; i < tondeuse.length; i++) {
    //         miseAjour[i] = executer(miseAjour[i]);
    //     }
    // }
    //     sequentiellement();
    // useEffect(() => {
    //     sequentiellement();
    // }, [])

    function terre(x, y) {
        let z = x * y;
        const divs = [];
        for (let i = 0; i < z; i++) {
            divs.push(<div key={i} style={{ width: "40px", height: "40px" }} className='bg-success border border-warning m-1' />);
        }
        return divs;
    }
    return (
        <>
            {/* <div className='m-auto'>
                <div className='m-auto text-center'>
                    <h3>Coordonnées de la tondeuse</h3>
                    <p>x: {x}</p>
                    <p>y: {y}</p>
                </div>
                <div>
                </div>
                <div style={{ width: `${x * 50}px`, height: `${y * 20}px`, display: 'flex', flexWrap: 'wrap', margin: 'auto', position: 'relative' }}>
                    <img src={tonImg} alt="tondeuse" style={{ position: 'absolute' }} />
                    {terre(x, y)}
                </div>
            </div> */}
            <div className='m-3'>
                <h1>Coordonnées des tondeuses</h1>
                <input type="file" onChange={(event) => readFile(event.target.files[0])} />
                {tondeuse.map((tond, index) => (
                    <div key={index}>
                        <h2>tondeuse {index + 1}</h2>
                        <p>x: {tond.x}</p>
                        <p>y: {tond.y}</p>
                        <p>Orientation: {tond.orientation}</p>
                        <div style={{ width: `${surFace.x * 50}px`, height: `${surFace.y * 20}px`, display: 'flex', flexWrap: 'wrap', margin: 'auto', position: 'relative' }}>
                            <img src={tonImg} alt="tondeuse" style={{ position: 'absolute' }} />
                            {terre(tond.x, tond.y)}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
