FROM oraclelinux:7-slim as db_setup

ARG MYSQL_SERVER_PACKAGE=mysql-community-server-minimal-5.7.30
ARG MYSQL_SHELL_PACKAGE=mysql-shell-8.0.20

# Install server
RUN yum install -y https://repo.mysql.com/mysql-community-minimal-release-el7.rpm \
      https://repo.mysql.com/mysql-community-release-el7.rpm \
  && yum-config-manager --enable mysql57-server-minimal \
  && yum install -y \
      $MYSQL_SERVER_PACKAGE \
      $MYSQL_SHELL_PACKAGE \
      libpwquality \
  && yum clean all \
  && mkdir /docker-entrypoint-initdb.d

# VOLUME /var/lib/mysql


ENV MYSQL_ROOT_PASSWORD "pluhfc8u4e"
ENV MYSQL_DATABASE "bquate_test_musica"
ENV MYSQL_USER "api_user"
ENV MYSQL_PASSWORD "user_api"
COPY ./db_stuff/bd_musica.sql /docker-entrypoint-initdb.d/bd_musica.sql
ENV NVM_DIR "/root/.nvm"
ENV NODE_VERSION "12.18.2"
RUN yum install -y build-essential libssl-dev tar
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
RUN npm install nodemon -g
RUN npm install forever -g
COPY ./db_stuff/healthcheck.sh /healthcheck.sh
RUN mkdir /usr/app


COPY ./db_stuff/scripts /usr/scripts

WORKDIR /usr/app
COPY ./app/package.json /usr/app/package.json
RUN npm i

COPY ./app /usr/app
COPY ./db_stuff/docker-entrypoint.sh /entrypoint.sh
HEALTHCHECK CMD /healthcheck.sh
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 80 3000
CMD ["mysqld"]
# EXPOSE 3306 33060
