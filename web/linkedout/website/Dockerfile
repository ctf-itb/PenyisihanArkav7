FROM php:7.2-apache
#Install git
RUN apt-get update \
    && apt-get install -y git zip
RUN docker-php-ext-install pdo pdo_mysql mysqli
RUN a2enmod rewrite
#Install Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=. --filename=composer \
    && mv composer /usr/local/bin/
COPY html/ /var/www/html/
RUN cd /var/www/html && composer install
EXPOSE 80
