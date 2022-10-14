# NOTA IMPORTANTE
- No es necesario ejecutar el script de base de datos local, ya que lo tengo alojado en un servidor con IP Pública. En caso deseen ejecutar el script podrán hacerlo(carpeta: Database Scripts - Optional) y sólo tienen que configurar los datos en el archivo  .env
# PASOS PARA EJECUTAR LOS SERVICIOS REST API en un entorno local
- Tener instalado NODE versión v16
- Al abrir el proyecto backend debemos abrir en cualquier IDE Visual Code y usar la carpeta Backend.Node.Football
- Ejecutar el comando: npm install
- Instalar nodemon npm install -g nodemon
- Luego ejecutamos el comando: nodemon index
- La ruta por defecto es: http://localhost:3000/
- Abrir el postman y ejecutar las llamadas.

# Endpoint GET Importar Liga
- http://localhost:3000/importLeague/CLI 
- Si realiza correctamente la importación mostrará: Status:200 | Message: "OK"
- Si es un código inválido mostrará: Status:404 | Message: "No existe el código de Competition"
- Si necesitamos resetear o eliminar todos los registros de todas las tablas locales podemos invocar por GET: http://localhost:3000/importLeague/reset/all
# GET Obtener jugadores: 
- http://localhost:3000/players/CL
- http://localhost:3000/players/CL/milano filtra por team o nombre de jugador
- http://localhost:3000/players/CL/Correa filtra nombre de jugador
# GET Obtener team: 
- http://localhost:3000/teams/paris obtener sólo información del team
- http://localhost:3000/teams/paris/players obtener información del team, players y/o coaches

# GET PLAYERS BY TEAM
- http://localhost:3000/players/teams/346/players se le pasa el id del team
