/*
	Автор скрипта: Gad575

	Запустить бота:
	node "C:/Users/Ярослав/Desktop/Discord_bot/bot.js"
	Отключить бота:
	Ctrl + C
*/
const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const client = new Discord.Client();
const config = require('./config.json');

function play(connection, message){
	var server = servers[message.guild.id];
	server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: 'audioonly'}));
	server.queue.shift();
	server.dispatcher.on("end", function() {
		if (server.queue[0]) play(connection, message);
		else connection.disconnect();
	});
}

var servers = {};

function pluck(array){
	return array.map(
		function(item) {
			return item['name'];
		}
	)
}
function hasRole(members, role){
	if(pluck(members.roles).includes(role)){
		return true;
	}else{
		return false;
	}
}
function isAdmin(message){
	if(hasRole(message.member, "Выживший")){
		return true;
	}else{
		return false;
	}
}
function isModerator(message){
	if(hasRole(message.member, "Лучший друг гада")){
		return true;
	}else{
		return false;
	}
}
function isPremium(message){
	if(hasRole(message.member, "Премиум участник клана")){
		return true;
	}else{
		return false;
	}
}
function banParams(message, userForBan){
	intervalID = setInterval(autoUnbanUser, 3600000);
	messageParam = message;
	userForUnban = userForBan;
}
function warnUser(message){
	var member = message.mentions.members.first();
	if(member.roles.some(r=>["Премиум участник клана"].includes(r.name)) ) {
		message.delete();
		message.channel.sendMessage(member + ', предупреждение.');
	}else
	if(member.roles.some(r=>["Лучший участник клана"].includes(r.name)) ) {
		message.delete();
		message.channel.sendMessage(member + ', предупреждение.');
	}else
	if(member.roles.some(r=>["Почетный участник клана"].includes(r.name)) ) {
		message.delete();
		message.channel.sendMessage(member + ', предупреждение.');
	}else
	if(member.roles.some(r=>["Участник клана"].includes(r.name)) ) {
		message.delete();
		message.channel.sendMessage(member + ', предупреждение.');
	}else
	if(member.roles.some(r=>["Новичок"].includes(r.name)) ) {
		message.delete();
		message.channel.sendMessage(member + ', предупреждение.');
	}else{
		message.channel.sendMessage('Невозможно предупредить пользователя.');
	}
}
function banUser(message){
	var member = message.mentions.members.first();
	if(member.roles.some(r=>["Премиум участник клана"].includes(r.name)) ) {
		var oldOne = message.guild.roles.find("name", "Премиум участник клана");
		member.removeRole(oldOne).catch(console.error);
		var newOne = message.guild.roles.find("name", "Заблокированный");
		member.addRole(newOne).catch(console.error);
		message.delete();
		message.channel.sendMessage(member + ' был забанен.');
	}else
	if(member.roles.some(r=>["Лучший участник клана"].includes(r.name)) ) {
		var oldOne = message.guild.roles.find("name", "Лучший участник клана");
		member.removeRole(oldOne).catch(console.error);
		var newOne = message.guild.roles.find("name", "Заблокированный");
		member.addRole(newOne).catch(console.error);
		message.delete();
		message.channel.sendMessage(member + ' был забанен.');
	}else
	if(member.roles.some(r=>["Почетный участник клана"].includes(r.name)) ) {
		var oldTwo = message.guild.roles.find("name", "Почетный участник клана");
		member.removeRole(oldTwo).catch(console.error);
		var newTwo = message.guild.roles.find("name", "Заблокированный");
		member.addRole(newTwo).catch(console.error);
		message.delete();
		message.channel.sendMessage(member + ' был забанен.');
	}else
	if(member.roles.some(r=>["Участник клана"].includes(r.name)) ) {
		var oldThr = message.guild.roles.find("name", "Участник клана");
		member.removeRole(oldThr).catch(console.error);
		var newThr = message.guild.roles.find("name", "Заблокированный");
		member.addRole(newThr).catch(console.error);
		message.delete();
		message.channel.sendMessage(member + ' был забанен.');
	}else
	if(member.roles.some(r=>["Новичок"].includes(r.name)) ) {
		var oldFor = message.guild.roles.find("name", "Новичок");
		member.removeRole(oldFor).catch(console.error);
		var newFor = message.guild.roles.find("name", "Заблокированный");
		member.addRole(newFor).catch(console.error);
		message.delete();
		message.channel.sendMessage(member + ' был забанен.');
	}else{
		message.channel.sendMessage('Невозможно забанить пользователя.');
	}
}
function unbanUser(message){
	var member = message.mentions.members.first();
	if(member.roles.some(r=>["Заблокированный"].includes(r.name)) ) {
		var oldRole = message.guild.roles.find("name", "Заблокированный");
		member.removeRole(oldRole).catch(console.error);
		var newRole = message.guild.roles.find("name", "Новичок");
		member.addRole(newRole).catch(console.error);
		message.delete();
		message.channel.sendMessage(member + ' был разбанен.');
	}else{
		message.channel.sendMessage('Невозможно разбанить пользователя.');
	}
}
function autoBanUser(message, userForBan){
	if(userForBan.roles.some(r=>["Премиум участник клана", "Лучший участник клана", "Почетный участник клана", "Участник клана", "Новичок"].includes(r.name)) ) {
		message.channel.sendMessage('[АВТОБАН]\n' + userForBan + ' был забанен. Причина: нарушение Раздела 1 Главы 1 Пункта 1 Правил клана.');
		var oldOne = message.guild.roles.find("name", "Премиум участник клана");
		var oldTwo = message.guild.roles.find("name", "Лучший участник клана");
		var oldThr = message.guild.roles.find("name", "Почетный участник клана");
		var oldFor = message.guild.roles.find("name", "Участник клана");
		var oldFiv = message.guild.roles.find("name", "Новичок");
		userForBan.removeRole(oldOne).catch(console.error);
		userForBan.removeRole(oldTwo).catch(console.error);
		userForBan.removeRole(oldThr).catch(console.error);
		userForBan.removeRole(oldFor).catch(console.error);
		userForBan.removeRole(oldFiv).catch(console.error);
		var newRole = message.guild.roles.find("name", "Заблокированный");
		userForBan.addRole(newRole).catch(console.error);
		console.log('Сработала система автобана');
		banParams(message, userForBan);
	}
}
function autoUnbanUser(){
	var oldRole = messageParam.guild.roles.find("name", "Заблокированный");
	userForUnban.removeRole(oldRole).catch(console.error);
	var newRole = messageParam.guild.roles.find("name", "Новичок");
	userForUnban.addRole(newRole).catch(console.error);
	clearInterval(intervalID);
	messageParam.channel.sendMessage('[АВТОБАН]\n' + userForUnban + ' был раззабанен. Истек срок бана пользователя.')
	console.log('Сработала система авторазбана');
}
function infoUser(message){
	var member = message.mentions.members.first();
	if(member.roles.some(r=>["Выживший"].includes(r.name)) ) {
		var fails = 'Пользователь является Главой клана и имеет иммунитет к Правилам клана.'
	}else
	if(member.roles.some(r=>["Лучший друг гада"].includes(r.name)) ) {
		var fails = 'Пользователь является лучшим другом Главы клана и имеет иммунитет к Правилам клана.'
	}else
	if(member.id == '316280687902588929') {
		var fails = '1';
	}else
	if(member.id == '308255871840944138') {
		var fails = '1';
	}else{
		var fails = '0';
	}

	if(member.roles.some(r=>["Выживший"].includes(r.name)) ) {
		var role = 'Выживший';
	}else
	if(member.roles.some(r=>["Лучший друг гада"].includes(r.name)) ) {
		var role = 'Лучший друг гада';
	}else
	if(member.roles.some(r=>["Премиум участник клана"].includes(r.name)) ) {
		var role = 'Премиум участник клана';
	}else
	if(member.roles.some(r=>["Лучший участник клана"].includes(r.name)) ) {
		var role = 'Лучший участник клана';
	}else
	if(member.roles.some(r=>["Почетный участник клана"].includes(r.name)) ) {
		var role = 'Почетный участник клана';
	}else
	if(member.roles.some(r=>["Участник клана"].includes(r.name)) ) {
		var role = 'Участник клана';
	}else
	if(member.roles.some(r=>["Новичок"].includes(r.name)) ) {
		var role = 'Новичок';
	}else
	if(member.roles.some(r=>["Заблокированный"].includes(r.name)) ) {
		var role = 'Заблокированный';
	}

	message.delete();
	message.channel.sendMessage('Информация о пользователе ' + member + ' :\nИмя пользователя: ' + member.user.username + '\nID пользователя: ' + member.id + '\nКоличество нарушений Правил клана: ' + fails + '\nРоль пользователя: ' + role);
}

function hiUser(message){
	message.delete();
	var member = message.mentions.members.first();
	message.channel.sendMessage(member + ', привет!');
}

client.on("ready", (message) => {
	client.user.setGame('Помощь: GADhelp');
	client.user.setStatus('online');
	console.log('Бот запущен');
});

client.on("guildMemberAdd", (member) => {
	console.log(member.user.username + ' зашел на сервер.');
});
client.on("guildMemberRemove", (member) => {
	console.log(member.user.username + ' покинул сервер.');
});

client.on('message', (message) => {
	if(message.author === client.user) return;

	var badWords = ["пизд", "бля", "муд", "пид", "еб", "сук", "мать", "пох", "хуй"];
	if(badWords.some(word => message.content.includes(word))) {
		var userForBan = message.member;
		autoBanUser(message, userForBan);
	}

	if(message.content == config.prefix + 'help') {
		const embed = new Discord.RichEmbed()
		.setImage('http://gad-server.ucoz.org/img/SiteImg.jpg');
		
		var botInformation = 'Информация о боте:\nИмя бота: ' + config.botInfo.name + '\nВерсия бота: ' + config.botInfo.version + '\nРазработчик бота: ' + config.botInfo.developer + '\n';
		var versionInformation = 'Информация об обновлении ' + config.botInfo.version + ':\n' + config.botInfo.update + '\n';
		var commandOne = 'GADhi - поздороваться с ботом.\nGADuserhi <ИмяПользователя> - поздороваться с игроком от имени бота (только для Главы, Лучших друзей главы и Премиум участников клана).';
		var commandTwo = 'GADrules - Правила клана и Пользовательское соглашение клана.';
		var commandThree = 'GADwarn <ИмяПользователя> - предупредить участника сервера о нарушении Правил клана (только для Главы и Лучших друзей главы).';
		var commandFour = 'GADban <ИмяПользователя> - забанить участника сервера (только для Главы и Лучших друзей главы).';
		var commandFive = 'GADunban <ИмяПользователя> - разбанить участника сервера (только для Главы и Лучших друзей главы).';
		var commandSix = 'GADpermanentban <ИмяПользователя> - забанить навсегда участника сервера (только для Главы).';
		var commandSeven = 'GADinfouser <ИмяПользователя> - вывести информацию о пользователе.';
		var commandEight = 'GADmusic <СсылкаНаВидеоЮтуб> - проиграть музыку (только для Главы).';
		var commandNine = 'GADsite - вывести информацию о сайте клана.';
		var commandTen = 'GADyoutube - вывести информацию о ютуб-канале клана.';
		var premium = 'GADpremium - проверить покупку роли "Премиум участник клана"';
		message.member.send(botInformation + versionInformation + '\nКоманды:\n' + commandOne + '\n' + commandTwo + '\n' + commandThree + '\n' + commandFour + '\n' + commandFive + '\n' + commandSix + '\n' + commandSeven + '\n' + commandEight + '\n' + commandNine + '\n' + commandTen + '\n\n' + premium);
		message.member.send({embed});
		message.reply('Список команд отправлен в личные сообщения.');
		message.channel.sendMessage({embed});
		console.log('Применена команда помощи.');
	}

	if(message.content == config.prefix + 'hi') {
		message.delete();
		message.reply('Привет!');
		console.log('Применена команда приветствия.');
	}

	if(message.content == config.prefix + 'update') {
		message.delete();
		message.channel.sendMessage('Обновление бота до версии ' + config.botInfo.version + ':\n' + config.botInfo.update);
		console.log('Применена команда информации об обновлении.');
	}

	if(message.content.startsWith(config.prefix + 'userhi')) {
		if(isPremium(message)) {
			hiUser(message);
		}else
		if(isModerator(message)) {
			hiUser(message);
		}else
		if(isAdmin(message)) {
			hiUser(message);
		}else{
			message.channel.sendMessage('Действие доступно только Главе клана, Лучшим друзьям главы и Премиум участникам клана.');
		}
		console.log('Применена команда приветствия от имени бота.');
	}

	if(message.content == config.prefix + 'premium') {
		if(isPremium(message)) {
			message.reply('Ты и так Премиум участник клана.');
		}else
		if(isModerator(message)) {
			message.reply('Ты и так Лучший друг гада.');
		}else
		if(isAdmin(message)) {
			message.reply('Ты и так Глава.');
		}else{
			message.channel.sendMessage('Gad575 оповещен о запросе.');
			console.log('Поступил запрос на проверку покупки роли "Премиум участник клана"');
		}
	}

	if(message.content == config.prefix + 'site') {
		var member = message.mentions.members.first();
		message.channel.sendMessage('Сайт клана: https://gad-server.ucoz.org/');
		console.log('Применена команда вывода информации о сайте клана.');
	}
	if(message.content == config.prefix + 'youtube') {
		var member = message.mentions.members.first();
		message.channel.sendMessage('Ютуб-канал клана: https://www.youtube.com/channel/UCiCZKoQjCnHGn1-h8vhmzzA/');
		console.log('Применена команда вывода информации о ютуб-канале клана.');
	}
	
	if(message.content.startsWith(config.prefix + 'music')) {
		if(isAdmin(message)) {
			servers[message.guild.id] = {
				queue: ['https://www.youtube.com/watch?v=H9-f524gcnE']
			}
			var server = servers[message.guild.id];
			var args = message.content.substring(config.prefix.length).split();
			server.queue.push(args[1]);
			message.member.voiceChannel.join().then(function(connection) {
				play(connection, message);
			});
		}else{
			message.channel.sendMessage('Действие доступно только Главе клана.');
		}
		console.log('Применена команда музыки.');
	}

	if(message.content == config.prefix + 'rules') {
		message.delete();
		message.channel.sendMessage('Правила клана указаны в закрепленных сообщениях канала.');
		console.log('Применена команда информации о Правилах клана.');
	}

	if(message.content.startsWith(config.prefix + 'infouser')) {
		infoUser(message);
		console.log('Применена команда получения информации о пользователе.');
	}

	if(message.content.startsWith(config.prefix + 'warn')) {
		if(isModerator(message)) {
			warnUser(message);
		}else
		if(isAdmin(message)) {
			warnUser(message);
		}else{
			message.channel.sendMessage('Действие доступно только Главе клана и Лучшим друзьям главы.');
		}
		console.log('Применена команда предупреждения.');
	}
	if(message.content.startsWith(config.prefix + 'ban')) {
		if(isModerator(message)) {
			banUser(message);
		}else
		if(isAdmin(message)) {
			banUser(message);
		}else{
			message.channel.sendMessage('Действие доступно только Главе клана и Лучшим друзьям главы.');
		}
		console.log('Применена команда бана.');
	}
	if(message.content.startsWith(config.prefix + 'unban')) {
		if(isModerator(message)) {
			unbanUser(message);
		}else
		if(isAdmin(message)) {
			unbanUser(message);
		}else{
			message.channel.sendMessage('Действие доступно только Главе клана и Лучшим друзьям главы.');
		}
		console.log('Применена команда разбана.');
	}

	if(message.content.startsWith(config.prefix + 'permanentban')) {
		if(isAdmin(message)){
			var member = message.mentions.members.first();
			member.ban();
			message.delete();
			message.channel.sendMessage(member + ' был забанен перманентно.')
		}else{
			message.channel.sendMessage('Действие доступно только Главе клана.');
		}
		console.log('Применена команда вечного бана.');
	}
});

client.login(config.token);