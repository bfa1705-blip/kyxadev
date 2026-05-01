export async function sendDiscordWebhook(type: 'login' | 'register', data: {
  username: string;
  email: string;
  timestamp: string;
  ip?: string;
}) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.log('Discord webhook URL not configured');
    return;
  }

  const embed = type === 'login' ? {
    title: '🔐 New Login',
    color: 3447003, // Blue
    fields: [
      {
        name: 'Username',
        value: data.username,
        inline: true
      },
      {
        name: 'Email',
        value: data.email,
        inline: true
      },
      {
        name: 'IP Address',
        value: data.ip || 'Unknown',
        inline: true
      },
      {
        name: 'Timestamp',
        value: data.timestamp,
        inline: false
      }
    ],
    footer: {
      text: 'Ronix-Labs Security Logs'
    },
    timestamp: new Date().toISOString()
  } : {
    title: '✨ New Registration',
    color: 5763719, // Green
    fields: [
      {
        name: 'Username',
        value: data.username,
        inline: true
      },
      {
        name: 'Email',
        value: data.email,
        inline: true
      },
      {
        name: 'IP Address',
        value: data.ip || 'Unknown',
        inline: true
      },
      {
        name: 'Timestamp',
        value: data.timestamp,
        inline: false
      }
    ],
    footer: {
      text: 'Ronix-Labs Security Logs'
    },
    timestamp: new Date().toISOString()
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed]
      })
    });
  } catch (error) {
    console.error('Failed to send Discord webhook:', error);
  }
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return 'Unknown';
}
