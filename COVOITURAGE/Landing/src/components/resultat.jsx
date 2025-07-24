import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResultatPage = () => {
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Récupérer les paramètres de l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const resultsParam = urlParams.get('results');

        // Vérifier s'il y a des résultats
        if (resultsParam) {
            const resultsData = JSON.parse(decodeURIComponent(resultsParam));
            setResults(resultsData);
        } else if (urlParams.get('error')) {
            setErrorMessage('Une erreur s\'est produite lors de la recherche.');
        } else if (urlParams.get('empty')) {
            setErrorMessage('Aucun résultat trouvé.');
        }
    }, []);

    return (
        <div>
            <h2>Résultats de la recherche :</h2>
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                <div>
                    {results.map((result, index) => (
                        <div key={index}>
                            {/* Afficher les détails du résultat */}
                            <p>Origine : {result.origine}</p>
                            <p>Destination : {result.destination}</p>
                            {/* Ajoutez d'autres détails ici */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResultatPage;
