import axios from "axios";

export default  function getDonnees() {
    // Création d'une promesse qui va contenir l'appel
    const promise = axios.get('http://192.168.1.105:8000/api/membres')
    // Avec la méthode "then", on extrait les données
    const donnees = promise.then((reponse) => reponse.data)
    //  On retourne les données
    return (JSON.stringify(donnees))
}