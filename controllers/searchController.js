const rp = require('request-promise');
const ch = require('cheerio');

exports.search = (req, res) => {

    if (req.body.siren == null || req.body.siren == "" ) {

        if (req.body.nom == null  || req.body.nom == "" ) {
            res.status(400).send("Veuiller entrer le nom de l'entreprise !");
        }
        if (req.body.adresse == null  || req.body.adresse == "" ) {
            res.status(400).send("Veuiller entrer l'adresse de l'entreprise !");
        }
        else {
            //web scrapping on pagesjaunes.fr
            const url = 'https://www.pagesjaunes.fr/annuaire/chercherlespros?quoiqui='+req.body.nom+'+&ou='+req.body.adresse;
            rp(url)
            .then(function(html){
                const $ = ch.load(html);
                const num = $('.num').text();
                if (num) {
                    if (num.length <= 16) {
                    res.status(200).send(num);
                    }
                    else { 
                        res.status(202).send("Plusieurs numéros trouvés, resultat non fiable ! Essayer avec le numéro de siren.");
                    }
                }
                else {
                    res.status(202).send('Aucun numéro trouvé, essayer avec le numéro de siren.')
                }
            })
            .catch(function(err){
                res.status(400).send("La requete n'a pas passée !");
            });
        }
    }
    else {
        //web scrapping on gb.kompass.com
        const url = 'https://gb.kompass.com/searchCompanies?text='+req.body.siren+'&searchType=COMPANYNAME';
        rp(url)
        .then(function(html){
            const $ = ch.load(html);
            if ($('.freePhone a').html()) {
                if(($('.titleSpan').text()).includes(req.body.nom) == true) {
                    res.status(200).send($('.freePhone a').html());
                }
                else { res.status(200).send("Le numéro suivant a été retrouvé mais il semble ne pas correspondre au nom de l'entreprise !\n" + $('.titleSpan').text() + ' : ' + $('.freePhone a').html());}
            }
            else {
                res.status(202).send("Acucun numéro trouvé !")
            }
        })
        .catch(function(err){
            res.status(400).send("La requete n'a pas passée !");
        });
    }
}
