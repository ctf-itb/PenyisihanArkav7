const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

const flag = "Have you read it yet? Arkav7{th4nkz_d753bca330e52ec2abbb76306cf8456d}";

var key = ['Harry Potter and The Goblet of Fire','To Kill a Mockingbird','Don Quixote','The Hobbit','The Da Vinci Code','The Little Prince'];
var key_id = Math.floor(Math.random()*10000) % 6;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.channel.type == 'dm'){
        if (msg.content.toLowerCase() === key[key_id].toLowerCase()) {
            msg.author
                .send(flag)
                .then(console.log)
                .catch(console.error);
            key_id = Math.floor(Math.random()*10000) % 6;
        } else {
            msg.author
                .send('Guess what im reading right now?')
                .then(console.log)
                .catch(console.error);
            key_id = Math.floor(Math.random()*10000) % 6;
        }
    } 
});

client.login('SECRET_KEY');