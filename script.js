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
  
      // chercher client prio
      const indexPrioritaire = this.clients.findIndex(client => client.prioritaire);
      if (indexPrioritaire !== -1) {
        clientServi = this.clients.splice(indexPrioritaire, 1)[0];
      } else {
        // servir le premier
        clientServi = this.clients.shift();
      }
  
      alert(`${clientServi.nom} (Service: ${clientServi.serviceDemandé}) a été servi.`);
      this.mettreAJourAffichage();
      return clientServi;
    }
  
    supprimerClient(nom) {
      const index = this.clients.findIndex(client => client.nom === nom);
      if (index !== -1) {
        const clientSupprimé = this.clients.splice(index, 1)[0];
        alert(`Le client ${nom} a été supprimé de la file.`);
        this.afficherHistorique(clientSupprimé);
        this.mettreAJourAffichage();
      } else {
        alert(`Client ${nom} introuvable dans la file.`);
      }
    }
  
    trierParService(categorie) {
      this.clients = this.clients.filter(client => client.serviceDemandé === categorie);
      this.mettreAJourAffichage();
    }
  
    afficherHistorique(client) {
      const historiqueContainer = document.getElementById('historique-container');
      const log = document.createElement('p');
      log.textContent = `${client.nom} - ${client.serviceDemandé} a été servi.`;
      historiqueContainer.appendChild(log);
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
  const filePostale = new FilePostale();
  
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
  
    const nouveauClient = new Client(nom, serviceDemandé, tempsEstimé, prioritaire);
    filePostale.ajouterClient(nouveauClient);
  
    e.target.reset();
  });
  
  // bouton 
  document.getElementById('servir-client-btn').addEventListener('click', () => {
    const clientServi = filePostale.servirClient();
    if (clientServi) {
      filePostale.afficherHistorique(clientServi);
    }
  });
  
  document.getElementById('supprimer-client-btn').addEventListener('click', () => {
    const nom = prompt("Entrez le nom du client à supprimer :").trim();
    if (nom) {
      filePostale.supprimerClient(nom);
    }
  });
  
  document.getElementById('trier-service-btn').addEventListener('click', () => {
    const categorie = prompt("Entrez la catégorie de service pour trier :").trim();
    if (categorie) {
      filePostale.trierParService(categorie);
    }
  });
  