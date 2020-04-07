## Inicio

Instalar postgresql
```
$ sudo apt-get install postgresql-10 postgresql-contrib
 ```

Crear usuario y base de datos
```
sudo -u postgres createuser evc-user -P   #ingrese 12345678 como password   OK
sudo -u postgres createdb -O evc-user evc-db  # port 5432  OK
```
Connectarse como el usuario de base de datos creado
```
sudo su - postgres
psql -h localhost -d evc-db -U evc-user -W
```

Crear tabla de prueba
``` sql
create table prueba ( id integer,descripcion char(256) );
```

Conexion con sequelize

$ npm install --save sequelize
$ npm install --save pg pg-hstore # Postgres
