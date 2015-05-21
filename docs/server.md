#Server

###To re-deploy MPMAP on the AWS server
1. SSH into the server
2. Move to the project directory
```
cd /var/www/mpmap-sails
```
3. Pull the repository: 
```
git pull origin master
```
4. Restart the application as root:
```
sudo su
forever restartall
```