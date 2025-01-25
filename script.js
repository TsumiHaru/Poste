// Classe Client
class Client {
    constructor(nom, serviceDemandé, tempsEstimé, prioritaire = false) {
      this.nom = nom;
      this.serviceDemandé = serviceDemandé;
      this.tempsEstimé = tempsEstimé;
      this.prioritaire = prioritaire;
    }
  }
  
// Classe FilePostale
  class FilePostale {
    constructor() {
      this.clients = [];
    }
  
    ajouterClient(client) {
      this.clients.push(client);
      this.mettreAJourAffichage();
    }
    servirClient() {
      if (this.clients.length === 0) {
        alert("Aucun client en attente.");
        return null;
      }
  
      let clientServi;
  
      // Chercher client prio dans la file
      const indexPrioritaire = this.clients.findIndex(client => client.prioritaire);
      if (indexPrioritaire !== -1) {
        clientServi = this.clients.splice(indexPrioritaire, 1)[0]; // retire le client prio 
      } else {
        clientServi = this.clients.shift(); // retire le premier client si pas de prio
      }
  
      alert(`${clientServi.nom} (Service: ${clientServi.serviceDemandé}) a été servi.`);
      this.mettreAJourAffichage();
      return clientServi;
    }
  
    // amelioration possible -> liste cliquable 
    supprimerClient(nom) {
      const index = this.clients.findIndex(client => client.nom === nom); // trouve l'infex
      if (index !== -1) {
        const clientSupprimé = this.clients.splice(index, 1)[0]; // retire de la file
        alert(`Le client ${nom} a été supprimé de la file.`);
        this.afficherHistorique(clientSupprimé);
        this.mettreAJourAffichage();
      } else {
        alert(`Client ${nom} introuvable dans la file.`);
      }
    }
  
    // amelioration possible -> liste cliquable 
    trierParService(categorie) {
      this.clients = this.clients.filter(client => client.serviceDemandé === categorie); 
      this.mettreAJourAffichage();
    }
  
    afficherHistorique(client) {
      const historiqueContainer = document.getElementById('historique-container');
      const log = document.createElement('p'); // creer para
      log.textContent = `${client.nom} - ${client.serviceDemandé} a été servi.`; // contenu para
      historiqueContainer.appendChild(log); // ajout
    }
  
    mettreAJourAffichage() {
      const fileContainer = document.getElementById('file-container');
      fileContainer.innerHTML = '';
  
      if (this.clients.length === 0) {
        fileContainer.innerHTML = '<p>Aucun client dans la file.</p>';
        return;
      }
  
      const ul = document.createElement('ul');
      this.clients.forEach(client => {
        const li = document.createElement('li');
        li.textContent = `${client.nom} - ${client.serviceDemandé} - Priorité: ${client.prioritaire ? 'Oui' : 'Non'}`;
        ul.appendChild(li);
      });
      fileContainer.appendChild(ul);
    }
  }
  
  // demarrage du code
  const filePostale = new FilePostale(); // instance 
  
  document.getElementById('ajouter-client-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const nom = document.getElementById('nom').value.trim();
    const serviceDemandé = document.getElementById('service').value;
    const tempsEstimé = parseInt(document.getElementById('temps-estimé').value, 10);
    const prioritaire = document.getElementById('prioritaire').checked;
  
    if (!nom || !serviceDemandé || isNaN(tempsEstimé)) {
      alert("Veuillez remplir tous les champs requis.");
      return;
    }
  
    const nouveauClient = new Client(nom, serviceDemandé, tempsEstimé, prioritaire); // nouveau client
    filePostale.ajouterClient(nouveauClient); // ajout
  
    e.target.reset();
  });
  
  // bouton 

    // servir client (le premier automatiquement)
  document.getElementById('servir-client-btn').addEventListener('click', () => {
    const clientServi = filePostale.servirClient();
    if (clientServi) {
      filePostale.afficherHistorique(clientServi);
    }
  });
    //supprimer client (par nom)
  document.getElementById('supprimer-client-btn').addEventListener('click', () => {
    const nom = prompt("Entrez le nom du client à supprimer :").trim();
    if (nom) {
      filePostale.supprimerClient(nom);
    }
  });
    //trier par service (par catégorie)
  document.getElementById('trier-service-btn').addEventListener('click', () => {
    const categorie = prompt("Entrez la catégorie de service pour trier :").trim();
    if (categorie) {
      filePostale.trierParService(categorie);
    }
  });
  