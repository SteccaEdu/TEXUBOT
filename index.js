
//console.log(process.env.DISCORDJS_BOT_TOKEN);
// Variaveis
const discord = require ('discord.js');
const PREFIXO = "!";
const bot = new discord.Client({
    partials: ['MESSAGE', 'REACTION','CHANNEL','GUILD_MEMBER']
});
//Bot entra no servidor
bot.login('NzkwOTk0MjA5MDYxNDcwMjE5.X-Isww.gSy5m-1xYAh8dN7F1wtcIL3aPZA');

bot.on('ready', () => {
    console.log('Bot iniciado.');
});



//Listener Mensagens
    bot.on ('message', (message) =>{
    if(message.author.bot) return;
    try{
    const canalLog = bot.channels.cache.get('793547296842448906');
    canalLog.send(`[${message.author.tag}]: ${message.content} ${message.channel} - ${message.createdAt}`);
    //Teste
    if(message.content === 'Olá') {
        message.channel.send('Hello There');
    }

    
    //Ler comandos
    if(message.content.startsWith(PREFIXO)){
        const [CMD_NAME,...args] = message.content.trim().substring(PREFIXO.length).split(" ");//Separador de String
        //!Ajuda
        if(CMD_NAME === 'ajuda'){
            message.channel.send('!marcarReuniao "nome da reuniao" "@membros" "horario" - Marcar uma reuniao com os membros ecolhidos no horario definido');
            message.channel.send('!reuniao - consulta as reunioes em que voce foi convocado');
            message.channel.send('!aviso - manda um aviso no canal de avisos se você possuir permissões.');
            message.channel.send('!salvar_"sigladojogo" --- Salva um printscreen de qualquer jogo no canal correto, utilizar "lol,cs,tft ou cr"-- exemplo: !salvar_cs ');
            message.channel.send('!opgg "player 1 player 2 ..." - faz uma busca no opgg pelo nome dos jogadores (apenas lol) obs: usar espaço para separar os nicks');
        }
        //!aviso
        if(CMD_NAME === 'aviso'){
            if(message.author.dmChannel)return message.channel.send('Voce precisa fazer isso em um dos canais do servidor!');
            if(!message.member.hasPermission(["MANAGE_MESSAGES","SEND_MESSAGES"])) return message.channel.send("Você não tem permissão para fazer isso");
            const mensagem = (args.join(" "));//Manda a mensagem digitada pelo usuario
            const avisos = bot.channels.cache.get('640720376917131293');
            avisos.send(mensagem);
        }
        
        //!salvar img campeonato lol
        if(CMD_NAME === 'salvar_lol'){
            if(!message.member.hasPermission(["MANAGE_MESSAGES","SEND_MESSAGES"])) return message.channel.send("Você não tem permissão para fazer isso");
            if(message.author.dmChannel)return message.channel.send('Voce precisa fazer isso em um dos canais do servidor!');
                const canalLOL = bot.channels.cache.get('640718803176521729');
                if(message.attachments.size>0){
                    var anexo = (message.attachments.first().url);
                    canalLOL.send(args.join(" "));
                    canalLOL.send(anexo);
                    canalLOL.send(`${message.createdAt}`);
                    }

                    else{
                        message.channel.send("Algo deu errado ou você não tem permissão para fazer isso");
                    }
        }

        //!salvar img campeonato cs
        if(CMD_NAME === 'salvar_cs'){
            if(message.author.dmChannel)return message.channel.send('Voce precisa fazer isso em um dos canais do servidor!');
            if(!message.member.hasPermission(["MANAGE_MESSAGES","SEND_MESSAGES"])) return message.channel.send("Você não tem permissão para fazer isso");
                const canalLOL = bot.channels.cache.get('640719130466713611');
                if(message.attachments.size>0){
                    var anexo = (message.attachments.first().url);
                    canalLOL.send(args.join(" "));
                    canalLOL.send(anexo);
                    canalLOL.send(`${message.createdAt}`);
                    }

                    else{
                        message.channel.send("Algo deu errado ou você não tem permissão para fazer isso");
                    }
        }

        //!salvar img campeonato tft
        if(CMD_NAME === 'salvar_tft'){
            if(message.author.dmChannel)return message.channel.send('Voce precisa fazer isso em um dos canais do servidor!');
            if(!message.member.hasPermission(["MANAGE_MESSAGES","SEND_MESSAGES"])) return message.channel.send("Você não tem permissão para fazer isso");
                const canalLOL = bot.channels.cache.get('754464444070756383');
                if(message.attachments.size>0){
                    var anexo = (message.attachments.first().url);
                    canalLOL.send(args.join(" "));
                    canalLOL.send(anexo);
                    canalLOL.send(`${message.createdAt}`);
                    }

                    else{
                        message.channel.send("Algo deu errado, verifique a formatação do comando ou talvez você não tenha permissão para fazer isso");
                    }
        }

        //!salvar img campeonato Clash Royale
        if(CMD_NAME === 'salvar_cr'){
            if(message.author.dmChannel)return message.channel.send('Voce precisa fazer isso em um dos canais do servidor!');
            if(!message.member.hasPermission(["MANAGE_MESSAGES","SEND_MESSAGES"])) return message.channel.send("Você não tem permissão para fazer isso");
                const canalLOL = bot.channels.cache.get('791367832503713802');
                if(message.attachments.size>0){
                    var anexo = (message.attachments.first().url);
                    canalLOL.send(args.join(" "));
                    canalLOL.send(anexo);
                    canalLOL.send(`${message.createdAt}`);
                    }

                    else{
                        message.channel.send("Algo deu errado ou você não tem permissão para fazer isso");
                    }
        }
        
        //!Consulta Dados players Lol
        if(CMD_NAME === 'opgg'){
            var stringbusca = 'https://br.op.gg/multi/query=';
            const constante = '%2C';
            
            let i = 0;
            while(i<args.length){
            var nome = args[i];
            stringbusca = stringbusca.concat(constante);
            stringbusca = stringbusca.concat(nome);
            i++;
            }//Concatenador de String
            message.channel.send(stringbusca);
        }
           
        }
        }catch(erro){
            message.channel.send('Algo deu errado, verifique a formatação do comando ou suas permissões.');
    }
});

//Cargos Times
bot.on ('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    const canalLog = bot.channels.cache.get('791450247112949830');
    if(reaction.message.id === '791360507986706472')
    switch (name){
        
        case '🔫':
            member.roles.add('640712460369788961');
            
            canalLog.send(`[${member.user}]: ganhou o cargo de cs:go `);
            break;
        case '🧙‍♂️':
            member.roles.add('640712374617243649');
            
            canalLog.send(`[${member.user}]: ganhou o cargo de League of Legends`);
            break;
        case '♟️':
            member.roles.add('753366549405892728');
            
            canalLog.send(`[${member.user}]: ganhou o cargo de Team Fight Tactics`);
            break;
        case '⚽':
            member.roles.add('640713247745507338');
            
            canalLog.send(`[${member.user}]: ganhou o cargo de FIFA`);
             break ;
        case '👑':
            member.roles.add('791368325607325707');
            
            canalLog.send(`[${member.user}]: ganhou o cargo de Clash Royale`);
            break ;  
    }
})
//Remover Cargos Times
bot.on ('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    const canalLog = bot.channels.cache.get('791450247112949830');
    if(reaction.message.id === '791360507986706472')
    switch (name){

        case '🔫':
            member.roles.remove('640712460369788961');
           
            canalLog.send(`[${member.user}]: saiu do cargo de CS:GO`);
            break;
        case '🧙‍♂️':
            member.roles.remove('640712374617243649');
          
            canalLog.send(`[${member.user}]: saiu do cargo de League of Legends`);
            break;
        case '♟️':
            member.roles.remove('753366549405892728');
          
            canalLog.send(`[${member.user}]: saiu do cargo de Team Fight Tactics`);
            break;
        case '⚽':
            member.roles.remove('640713247745507338');
           
            canalLog.send(`[${member.user}]: saiu do cargo de FIFA`);
             break ;
        case '👑':
            member.roles.remove('791368325607325707');
            
            canalLog.send(`[${member.user}]: saiu do cargo de Clash Roayale`);
            break ;  
    }
})

//Cargos Institucional
bot.on ('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    const canalLog = bot.channels.cache.get('791450247112949830');
    if(reaction.message.id === '791362019180675123')
    switch (name){
        case '🎨':
            member.roles.add('739844831609749577');
            canalLog.send(`[${member.user}]: Recebeu o cargo da Diretoria de Criação`);
            break;
        case '📸':
            member.roles.add('739844994155937892');
            canalLog.send(`[${member.user}]: Recebeu o cargo da Diretoria de eventos`);
            break;
        case '💸':
            member.roles.add('739845145389695117');
            canalLog.send(`[${member.user}]: Recebeu o cargo da Diretoria de patrocínios`);
            break;
        case '💬':
            member.roles.add('739845071137931356');
            canalLog.send(`[${member.user}]: Recebeu o cargo da Diretoria de GP`);
             break ;
        case '🗣️':
            member.roles.add('675121004556714028');
            canalLog.send(`[${member.user}]: Recebeu o cargo da Diretoria de Comunicação`);
            break ;  
    }
})
//Remover Cargos Institucional
bot.on ('messageReactionRemove', (reaction, user) => {
   
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    const canalLog = bot.channels.cache.get('791450247112949830');
    if(reaction.message.id === '791362019180675123')
    switch (name){
        case '🎨':
            member.roles.remove('739844831609749577');
            canalLog.send(`[${member.user}]: Saiu da Diretoria de Criação`);
            break;
        case '📸':
            member.roles.remove('739844994155937892');
            canalLog.send(`[${member.user}]: Saiu da Diretoria de Eventos`);
            break;
        case '💸':
            member.roles.remove('739845145389695117');
            canalLog.send(`[${member.user}]: Saiu da Diretoria de Patrocinios`);
            break;
        case '💬':
            member.roles.remove('739845071137931356');
            canalLog.send(`[${member.user}]: Saiu da Diretoria de GP`);
             break ;
        case '🗣️':
            member.roles.remove('675121004556714028');
            canalLog.send(`[${member.user}]: Saiu da Diretoria de Comunicação`);
            break ;  
    }
})




