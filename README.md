Pour tester l'api il faudra clone le repository en local et lancer le serveur en utilisant 'nodemon'
Il faudra utiliser postman pour envoyer les parametres (nom, adresse ou siren) a l'url 'localhost:3000/search'.
En mettant le nom de l'entreprise et son adresse, l'api effectue un web scarping sur le site pagesjaunes.fr afin de tenter de recuperer le numéro de lentreprise si elle y figure.
Dans le cas écheat il faudra opter pour le numéro de siren. Cette fois si le scrapping sera fait sur le site Kompass.com. 
L'api se base sur l'existance de l'entreprise sur ces deux sites afin de fournir un resultat.
