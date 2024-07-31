import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-slate-700 text-white py-4 ">
            <div className="container mx-auto text-center">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer

{/* <VirtualHost *:80>
    ServerName likemetest.piks.co.in
	
    DocumentRoot /var/www/binder
	
    <Directory /var/www/binder>
        AllowOverride All
        Require all granted
    </Directory>
	<Directory /var/www/binder/admin/img/>
       Options Indexes FollowSymLinks
        AllowOverride All
       Require all granted
    </Directory>
	
RewriteEngine on
RewriteCond %{SERVER_NAME} =likemetest.piks.co.in
RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost> */}




{/* <IfModule mod_ssl.c>
<VirtualHost *:443>
    ServerName likemetest.piks.co.in
    DocumentRoot /var/www/binder
	
	   
    <Directory /var/www/binder>
        AllowOverride All
        Require all granted
    </Directory>
	<Directory /var/www/binder/admin/img/>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
RewriteEngine on
# Some rewrite rules in this file were disabled on your HTTPS site,
# because they have the potential to create redirection loops.

# RewriteCond %{SERVER_NAME} =likemetest.piks.co.in

# RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]

SSLCertificateFile /etc/letsencrypt/live/likemetest.piks.co.in/fullchain.pem
SSLCertificateKeyFile /etc/letsencrypt/live/likemetest.piks.co.in/privkey.pem
Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
</IfModule> */}
