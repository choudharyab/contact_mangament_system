var Contact = require('../models/contact');
var _ = require('underscore');
const jwt = require('jsonwebtoken');
var keys = require('../init/keys');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


/******************Create Contact Function*****************************/
module.exports.Create=function(req,res)
{
     Contact.forge({ Email: req.body.Email})
            .fetch()
            .then(function(contact){
                if(contact){         
                    res.json({
                        type: false,
                        error: 'It looks like you have already registered using this Email address'
                        });
                }else{
                    const encryptedpassword = cryptr.encrypt(req.body.Password);
                    Contact.forge({
                        Email:req.body.Email,
                        Password:encryptedpassword,
                        FirstName:req.body.FirstName,
                        LastName:req.body.LastName
                    })
                    .save()
                    .then(function(addedUser){
                        let token = jwt.sign({Email: req.body.Email}, 'foo', {expiresIn: 1440 });
                        res.json({
                            type:true,
                            data:addedUser,
                            token:token
                        });
                    })
            
                }
    })
    .catch(function(err){
        console.log(err.stack);
        res.status(400).json({error: err.message});
    });
}

/******************Verify Token Function*****************************/
module.exports.verifyToken = function(req, res, next){
    var Token;
    Token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(typeof Token !== 'undefined'){
        jwt.verify(Token,keys.jwt.userSecretKey, function(err, decoded){
            if(err || !decoded){
                res.status(401).json({ error: 'Unauthorized'});
            }else{
                 next();
            }
        });
    }else {
        res.status(403).json({ error: 'Forbidden'});
    }
};

/***************GET ALL Contact List******************************/
module.exports.getAllContact = function(req, res){
    Contact.forge()
        .orderBy('id', 'ASC')
        .fetchAll()
        .then(function(users){
            res.json({
                type: true,
                data: users
            });
        }).catch(function(err){
            console.log(err.stack);
            res.status(400).json({error: err.message});
        });
};

/***************Edit Contact ******************************/

module.exports.editContact=function(req,res)
{
    Contact.forge({id:req.params.contact_id})
           .fetch()
           .then(function(contact){
               if(contact)
               {
                const encryptedpassword = cryptr.encrypt(req.body.Password);
                contact.save({
                    Email:req.body.Email,
                    Password:encryptedpassword,
                    FirstName:req.body.FirstName,
                    LastName:req.body.LastName
                })
                .then(function(updatedcontact){
                    res.json({
                        type: true,
                        data: updatedcontact
                    });
                });
                }else{
                    res.json({
                        type: false,
                        error: 'contact having id ' + req.params.id +' does not exist'
                        });
                }
           })
           .catch(function(err){
                console.log(err.stack);
                res.status(400).json({error: err.message});
        });
};

/***************Delete Contact ******************************/
module.exports.deleteContact=function(req,res)
{
    Contact.forge({id:req.params.contact_id})
           .fetch()
           .then(function(contact){
             if(contact){
                contact.destroy();
                res.json({
                    type: true,
                    data: "Contact Deleted Successfully"
                    });
            }else{
                res.json({
                    type: false,
                    error: 'Contact having id ' + req.params.contact_id +' does not exist'
                    });
            }
           
           })
           .catch(function(err){
                console.log(err.stack);
                res.status(400).json({error: err.message});
        })
};