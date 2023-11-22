#!/bin/bash

# Gebruikersnaam van de huidige ingelogde gebruiker
CURRENT_USER=$(whoami)

# Install authbind
sudo apt install authbind -y

# Create port 80 file and change permissions
sudo touch /etc/authbind/byport/80
sudo chown $CURRENT_USER /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80

# Add alias in .bashrc for the gebruiker
echo "alias pm2='authbind --deep pm2'" >> /home/$CURRENT_USER/.bashrc

# Reset pm2
sudo -u $CURRENT_USER pm2 stop all
sudo -u $CURRENT_USER pm2 kill
sudo -u $CURRENT_USER rm -rf /home/$CURRENT_USER/.pm2
sudo -u $CURRENT_USER pm2 start

# Add and configure startup service (Command generated from command 'pm2 startup')
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u $CURRENT_USER --hp /home/$CURRENT_USER


# Replace lines in service file
sudo sed -i "s|ExecStart=/usr/lib/node_modules/pm2/bin/pm2 resurrect|ExecStart=/usr/bin/authbind --deep /usr/lib/node_modules/pm2/bin/pm2 resurrect|g" /etc/systemd/system/pm2-$CURRENT_USER.service
sudo sed -i "s|ExecReload=/usr/lib/node_modules/pm2/bin/pm2 reload all|ExecReload=/usr/bin/authbind --deep /usr/lib/node_modules/pm2/bin/pm2 reload all|g" /etc/systemd/system/pm2-$CURRENT_USER.service
sudo sed -i "s|ExecStop=/usr/lib/node_modules/pm2/bin/pm2 kill|ExecStop=/usr/bin/authbind --deep /usr/lib/node_modules/pm2/bin/pm2 kill|g" /etc/systemd/system/pm2-$CURRENT_USER.service

# Reload systemd to apply changes
sudo systemctl daemon-reload
