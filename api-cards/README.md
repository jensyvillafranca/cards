## Configuración del archivo `.env`

El proyecto utiliza un archivo `.env` para manejar las credenciales y configuraciones necesarias. Este archivo debe ubicarse en la raíz del proyecto y contiene las siguientes variables:

### Variables requeridas:

| Variable              | Descripción                         | Ejemplo         |
|-----------------------|-------------------------------------|-----------------|
| `DB_HOST`            | Dirección del servidor de la BD     | `localhost`     |
| `DB_USER`            | Usuario de la base de datos         | `root`          |
| `DB_PASSWORD`        | Contraseña del usuario              | `root`          |
| `DB_NAME`            | Nombre de la base de datos          | `bdcards`       |
| `DB_CONNECTION_LIMIT`| Límite máximo de conexiones en pool | `10`            |