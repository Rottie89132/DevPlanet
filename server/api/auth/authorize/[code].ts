const config = useRuntimeConfig()

function TokenAuth(Token: any) {
    const params = new URLSearchParams();
    params.append('client_id', config.clientid);
    params.append('client_secret', config.clientsecret);
    params.append('grant_type', 'authorization_code');
    params.append('code', Token);
    params.append('redirect_uri', `http://localhost:3000/servers/authorize`);
    params.append('scope', 'identify');
    return params
}

export default defineEventHandler(async (event) => {
    const { code } = getRouterParams(event);

    const SessionId: any = getCookie(event, "token")
    const user: Record<string, any> | null = await useStorage("Sessions").getItem(SessionId)

    if(!user) return { statusCode: 401 }

    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'post', body: TokenAuth(code), headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' }
    }).then(response => response.json())
    
    const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: { authorization: `${response.token_type} ${response.access_token}` }
    }).then(response => response.json());

    const Server: Record<string, any> | null = await Servers.find();

    guildsResponse.forEach(async (guild: any, index: any) => {
        const server = Server.find((server: any) => server.GuildID === guild.id);
        if (server) {
            ClientServers.create({
                UserID: user.ID,
                GuildId: guild.id,
                GuildName: guild.name
            });
        }
    });

    return { statusCode: 200 };
});
